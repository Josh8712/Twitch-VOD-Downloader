class YoutubeLiveDecoder extends CloudDecoder {
    init_decoder(){return}
    setup_decoder(){return}

    parse_hls(raw_hls) {
        var ts_list = []
        var lines = raw_hls.split("\n")
        var date_time = null
        var duration = null
        var segment_type = null
        for (var idx = 0; idx < lines.length; idx++) {
            var i = lines[idx]
            if (i.startsWith("#EXT-X-PROGRAM-DATE-TIME"))
                date_time = i
            else if (i.startsWith("#EXTINF"))
                duration = i
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
                                ts_list.push({
                                    'date_time': date_time,
                                    'duration': duration,
                                    'url': i
                                })
                            }
                        }
                    }
                }
                date_time = null
                duration = null
            }
        }
        return ts_list
    }

    write_ts(response, duration) {
        var segment = new Uint8Array(response);
        this.writableStream.write(segment, duration)
        this.total_bytes_count += segment.length
        this.has_pushed = true;
    }

    _flush() {
        return new Promise((resolve, reject) => {
            if(this.writableStream.hasData())
                return resolve(this.writableStream.flush())
            return resolve()
        })
    }
    _closeFile() {
        return new Promise((resolve, reject) => {
            return resolve(this.writableStream)
        })
    }
}