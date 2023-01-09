var longToByteArray = function (value) {
    // we want to represent the input as a 8-bytes array
    var byteArray = [0, 0, 0, 0, 0, 0, 0, 0];

    for (var index = 0; index < byteArray.length; index++) {
        var byte = value & 0xff;
        byteArray[byteArray.length - index - 1] = byte;
        value = (value - byte) / 256;
    }

    return byteArray;
};

var secondsToString = function (second) {
    var date = new Date(0);
    date.setSeconds(second);
    return date.toISOString().substring(11, 19)
}

class Decoder {
    constructor(pendingWritable, folder_handler, output_type, max_download_length = -1) {
        this.pendingWritable = pendingWritable
        this.folder_handler = folder_handler;
        this.file_handler = null
        this.writableStream = null

        this.hls_url = null
        this.output_type = output_type

        this.current_time = null
        this.total_duration = 0
        this.finished = false

        this.transmuxer = null;
        this.flush_promise_resolve = null;

        this.has_pushed = false
        this.total_bytes_count = 0
        this.init_bytes = new Uint8Array()
        this.discontinue = false

        this.interrupted = null
        this.max_download_length = max_download_length

        // edit
        this.editors = []
        this.segment_history = []
        this.segment_history_idx = 0
    }

    run(hls_url) {
        this.hls_url = hls_url
        return this.create_file()
            .then(() => {
                return this.start_download()
            })
    }

    reset() {
        this.file_handler = null
        this.writableStream = null

        this.total_duration = 0
        this.transmuxer = null;
        this.flush_promise_resolve = null;
        this.has_pushed = false
        this.total_bytes_count = 0
        this.init_bytes = new Uint8Array()
        this.discontinue = false
        this.editors = []
        this.segment_history = []
        this.segment_history_idx = 0
    }

    // decoder
    init_decoder() {
        var _this = this
        if (this.output_type == 'mp4') {
            this.transmuxer = new Transmuxer({
                remux: true
            });
        } else {
            this.transmuxer = new RawDecoder()
        }
        this.init_history()
    }

    init_history() {
        this.historyBytes = {
            video: {
                stts: {
                    bytes: []
                },
                stss: {
                    bytes: []
                },
                ctts: {
                    bytes: []
                },
                stsc: {
                    bytes: []
                },
                stsz: {
                    bytes: []
                },
                co64: {
                    bytes: []
                },
                elst: {
                    bytes: []
                },
            },
            audio: {
                stts: {
                    bytes: []
                },
                stsc: {
                    bytes: []
                },
                stsz: {
                    bytes: []
                },
                co64: {
                    bytes: []
                },
                elst: {
                    bytes: []
                },
            },
            total_duration: 0,
            count: 16,
            mdatHead: 0
        }
    }

    setup_decoder() {
        var _this = this
        var remuxedSegments = [];
        var remuxedBytesLength = 0;
        var remuxedInitSegment = null;
        var start = false

        this.transmuxer.on('data', function (segment) {
            remuxedSegments.push(segment);
            remuxedBytesLength += segment.data.byteLength;
            remuxedInitSegment = segment.initSegment;
        });

        this.transmuxer.on('done', function () {
            var flush_promise_resolve = _this.flush_promise_resolve
            _this.flush_promise_resolve = null
            if (remuxedBytesLength == 0 || remuxedInitSegment == null) {
                if (flush_promise_resolve != null)
                    flush_promise_resolve()
                return
            }
            var bytes = new Uint8Array(remuxedBytesLength)

            var init_bytes = new Uint8Array(remuxedInitSegment.byteLength)
            init_bytes.set(remuxedInitSegment, 0);
            for (var j = 0, i = 0; j < remuxedSegments.length; j++) {
                bytes.set(remuxedSegments[j].data, i);
                i += remuxedSegments[j].byteLength;
            }
            remuxedSegments = [];
            remuxedBytesLength = 0;
            remuxedInitSegment = null;
            if (flush_promise_resolve != null)
                flush_promise_resolve(_this.saveFile(init_bytes, bytes))
        });
    }
    // create file
    get_filename(idx = 0) {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth();
        var date = now.getDate();
        var hr = now.getHours();
        var min = now.getMinutes();
        var sec = now.getSeconds()

        var filename = year
        filename += "-" + ('0' + (month + 1)).slice(-2);
        filename += "-" + ('0' + date).slice(-2);

        filename += "_" + ('0' + hr).slice(-2);
        filename += "-" + ('0' + min).slice(-2);
        filename += "-" + ('0' + sec).slice(-2);
        if (idx > 0)
            filename += "-" + idx;
        filename += "." + this.output_type
        return filename
    }

    _create_file(idx = 0) {
        var filename = this.get_filename(idx)
        return this.folder_handler.getFileHandle(filename)
            .then(() => {
                return _create_file(idx + 1)
            })
            .catch((e) => {
                if (e.name == "NotFoundError") {
                    return this.folder_handler.getFileHandle(filename, {
                        create: true
                    })
                        .then((file_handler) => {
                            this.file_handler = file_handler
                        })
                }
                throw e
            })
    }

    create_file() {
        this.reset()
        return this._create_file()
            .then(() => {
                push_message("建立新影片")
                return this.recreate_writable()
            }).then(() => {
                this.init_decoder()
                this.setup_decoder()
            })
    }

    recreate_writable() {
        if (this.writableStream) {
            return this.writableStream.close().then(() => {
                this.writableStream = null
                return this.recreate_writable()
            });
        } else
            return this.file_handler.createWritable({
                keepExistingData: true
            })
                .then((writableStream) => {
                    this.writableStream = writableStream
                })
    }
    // download
    download_loop(resolve) {
        var _this = this
        this.refresh_hls()
            .then(raw_hls => {
                return this.parse_hls(raw_hls)
            }).then(ts_list => {
                return this.process_ts(ts_list, 0)
            }).then(() => {
                return this.flush()
            }).then(() => {
                if (this.finished || this.interrupted) {
                    resolve()
                } else
                    setTimeout(function () {
                        _this.download_loop(resolve)
                    }, 3000)
            }).catch(e => {
                push_error(e || "下載發生錯誤")
                resolve();
            })
    }
    start_download() {
        return new Promise((resolve, reject) => {
            this.download_loop(resolve)
        }).then(() => {
            return this.closeFile();
        })
    }
    // step get hls
    parse_hls(raw_hls) {
        var ts_list = []
        var lines = raw_hls.split("\n")
        var date_time = null
        var duration = null
        var segment_type = null
        var has_discontinue = false
        for (var idx = 0; idx < lines.length; idx++) {
            var i = lines[idx]
            if (i.startsWith("#EXT-X-PROGRAM-DATE-TIME"))
                date_time = i
            else if (i.startsWith("#EXTINF"))
                duration = i
            else if (i.startsWith("#EXT-X-DISCONTINUITY"))
                has_discontinue = true
            else if (i.startsWith("#EXT-X-ENDLIST")) {
                push_message("直播已結束")
                this.finished = true
                break
            } else if (!i.startsWith("#")) {
                if (date_time && duration) {
                    var pos = date_time.indexOf(':')
                    if (pos > 0) {
                        date_time = date_time.slice(pos + 1)
                        date_time = Date.parse(date_time)
                        pos = duration.indexOf(':')
                        if (pos > 0) {
                            duration = duration.slice(pos + 1)
                            pos = duration.indexOf(',')
                            if (pos > 0) {
                                duration = duration.slice(0, pos)
                                segment_type = duration.slice(0, pos + 1)
                            }
                            duration = parseFloat(duration)
                            if (this.current_time == null || date_time > this.current_time) {
                                if (has_discontinue && (this.has_pushed || ts_list.length > 0)) {
                                    this.discontinue = true
                                    if (segment_type != 'live')
                                        push_message("偵測到廣告")
                                    break
                                }
                                ts_list.push({
                                    'date_time': date_time,
                                    'duration': duration,
                                    'url': i
                                })
                            }
                        }
                    }
                }
                has_discontinue = false
                date_time = null
                duration = null
            }
        }
        return ts_list
    }
    refresh_hls(retry = 0) {
        var _this = this
        var url = this.hls_url
        return new Promise((resolve, reject) => {
            if (retry >= 3)
                throw new Error("無法取得影片列表")
            var req = new XMLHttpRequest()
            req.open("GET", url)
            req.onreadystatechange = function () {
                try {
                    if (req.readyState == 4) {
                        if (req.status == 200) {
                            resolve(req.responseText)
                        } else {
                            setTimeout(function () {
                                resolve(_this.refresh_hls(retry + 1))
                            }, 1000)
                        }
                    }
                } catch {
                    setTimeout(function () {
                        resolve(_this.refresh_hls(retry + 1))
                    }, 1000)
                }
            }
            req.send()
        });
    }
    // step ts
    send_ts_editor(segment, duration) {
        this.segment_history.push({data: segment, id: this.segment_history_idx, duration: duration})
        while (this.segment_history.length > 50)
            this.segment_history.shift()
        for (var ei = 0; ei < this.editors.length; ei++) {
            var editor = this.editors[ei]
            if (editor.closed) {
                this.editors.splice(ei, 1)
                ei--;
            }
            else {
                editor.postMessage(this.segment_history[this.segment_history.length - 1], '*')
            }
        }
        this.segment_history_idx += 1
    }
    write_ts(response) {
        var segment = new Uint8Array(response);
        if (window.debugFolder) {
            debugFolder.nameidx += 1
            debugFolder.getFileHandle(debugFolder.nameidx + ".ts", {
                create: true
            })
                .then(h => {
                    return h.createWritable()
                }).then(r => {
                    return r.write(response)
                        .then(() => {
                            r.close()
                        })
                })
        }
        this.transmuxer.push(segment);
        this.has_pushed = true;
    }
    process_ts(ts_list, idx, retry = 0) {
        var _this = this
        if (idx >= ts_list.length)
            return
        var ts = ts_list[idx]
        var date_time = ts['date_time']
        var duration = ts['duration']
        var url = ts['url']
        if (this.current_time != null && this.current_time >= date_time) {
            return this.process_ts(ts_list, idx + 1)
        }
        if (retry >= 2) {
            if (this.current_time != null) {
                this.current_time = date_time
                this.total_duration += duration
            }
            push_error("無法下載片段 (略過)")
            return this.process_ts(ts_list, idx + 1)
        }
        return new Promise((resolve, reject) => {
            var req = new XMLHttpRequest()
            req.open("GET", url)
            req.responseType = "arraybuffer";
            req.onreadystatechange = function () {
                try {
                    if (req.readyState == 4) {
                        if (req.status == 200) {
                            _this.write_ts(req.response)
                            _this.send_ts_editor(req.response, duration)
                            _this.current_time = date_time
                            _this.total_duration += duration
                            resolve(_this.process_ts(ts_list, idx + 1))
                        } else {
                            setTimeout(function () {
                                resolve(_this.process_ts(ts_list, idx, retry + 1))
                            }, 1000)
                        }
                    }
                } catch (e) {
                    reject(e)
                }
            }
            req.send()
        })
    }
    // step flush
    flush() {
        if (!this.has_pushed)
            return
        return new Promise((resolve, reject) => {
            var date = new Date(0);
            date.setSeconds(this.total_duration);
            set_status("已處理 " + date.toISOString().substring(11, 19) + " 秒")

            this.flush_promise_resolve = resolve
            this.transmuxer.flush(this.historyBytes)
            if (this.flush_promise_resolve) {
                this.flush_promise_resolve = null
                resolve()
            }
        })
            .then(() => {
                if (this.max_download_length > 0 &&
                    this.total_duration > this.max_download_length) {
                    this.discontinue = true
                }
            }).then(() => {
                if (this.discontinue) {
                    this.discontinue = false
                    return this.closeFile().then(() => {
                        return this.create_file()
                    })
                }
            })
    }
    // step save
    saveFile(init_bytes, bytes) {
        return this.writableStream.write({
            type: "write",
            data: new Uint8Array([0x00, 0x00, 0x00, 0x01, 0x6d, 0x64, 0x61, 0x74].concat(longToByteArray(this.total_bytes_count + 8 + 8 + bytes.length))),
            position: 0
        }).then(() => {
            return this.writableStream.write({
                type: "write",
                data: bytes,
                position: 8 + 8 + this.total_bytes_count
            })
        }).then(() => {
            this.total_bytes_count += bytes.length
            this.init_bytes = init_bytes
        })
    }
    // step close
    _closeFile() {
        var file_handler = this.file_handler
        return this.writableStream.close()
            .then(() => {
                return file_handler
            })
    }

    getCurrentFilename() {
        return this.file_handler.name
    }

    closeFile() {
        var date = new Date(0);
        var filename = this.getCurrentFilename()
        date.setSeconds(this.total_duration);
        push_message(`輸出檔案 - ${filename} (${date.toISOString().substring(11, 19)})`)
        set_status("檔案輸出中，請稍後，請勿離開此頁面")
        return this.writableStream.write({
            type: "write",
            data: this.init_bytes,
            position: this.total_bytes_count + 16 - this.historyBytes.mdatHead
        }).then(() => {
            var total_bytes_count = this.total_bytes_count
            var file_handler = this.file_handler
            this.pendingWritable.push(file_handler)
            this._closeFile()
                .then((file_handler) => {
                    if (total_bytes_count == 0) {
                        push_error("移除空影片 - " + filename)
                        return this.deleteFile(file_handler)
                    } else
                        return this.finishVideo(file_handler)
                }).then(() => {
                    push_message("輸出完成 - " + filename)
                }).catch(e => {
                    push_error(filename + " - " + e)
                }).finally(() => {
                    file_handler.output_finished = true
                });
            return
        })
    }
    // step finish
    deleteFile(file_handler) {
        if (file_handler && this.folder_handler) {
            return this.folder_handler.removeEntry(file_handler.name)
        }
    }

    finishVideo() {
        return
    }

    setInterrupt() {
        this.interrupted = true
        set_status("中斷錄影中")
    }

    // edit clip
    setup_edit_clip() {
        try {
            var _this = this
            // var w = window.open('../editor/editor.html')
            var w = window.open('https://josh8712.github.io/Twitch-VOD-Downloader/twitch-downloader/editor/editor.html')
            
            w.idx = 0
            var id = new Date().getTime()
            var retry = 0
            var check_int = setInterval(function () {
                try {
                    w.postMessage({ message: 'hello', id: id }, '*')
                    retry += 1
                    if (retry > 10) {
                        clearInterval(check_int)
                        window.removeEventListener('message', checker)
                    }
                } catch {

                }
            }, 1000)
            function checker(e) {
                try {
                    if (e?.data?.message == id) {
                        clearInterval(check_int)
                        window.removeEventListener('message', checker)
                        _this.segment_history.forEach(segment => {
                            w.postMessage(segment, '*')
                        })
                        _this.editors.push(w)
                    }
                } catch {

                }
            }
            window.addEventListener('message', checker)
        } catch {

        }
    }
}