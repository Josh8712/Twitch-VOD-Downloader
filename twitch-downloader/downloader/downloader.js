class Downloader {
    constructor(auth_token, channel_name, quality, folder_handler, interval, output_type, output_length) {
        this.auth_token = auth_token
        this.invalid_token = null
        this.channel_name = channel_name;
        this.quality = quality
        this.folder_handler = folder_handler;
        this.interval = interval * 1000
        this.output_type = output_type
        this.output_length = output_length

        // twitch token
        this.sig = null
        this.token = null
        this.is_new_token = true

        this.decoder = null
        this.interrupt = false
        this.pendingWritable = []
    }

    check_live(sleep = true, success = false) {
        var _this = this
        var status_prefix = ''
        if (this.check_pending_write() > 0) {
            status_prefix = get_status() + "\n"
        }
        if (sleep) {
            if (success)
                set_status(status_prefix + "上次檢查時間: " + new Date().toLocaleString())
            else
                set_status(status_prefix + "發生錯誤，等待下次檢查中")

            return setTimeout(function () {
                _this.check_live(sleep = false)
            }, this.interval)
        }
        if (this.interrupt)
            return
        set_status(status_prefix + "檢查中")
        console.clear()
        document.getElementById('start_time').innerText = "--"

        document.getElementById('files').innerText = "--"
        document.getElementById('files').style.animation = ""
        this.fill_files()
            .then(() => {
                return this.get_token()
            }).then(() => {
                var url = `https://usher.ttvnw.net/api/channel/hls/${this.channel_name}.m3u8?acmb=e30%3D&allow_source=true&fast_bread=true&player_backend=mediaplayer&reassignments_supported=true&cdm=wv&supported_codecs=avc1&`
                url += `token=${this.token}&sig=${this.sig}`
                var req = new XMLHttpRequest()
                req.open("GET", url)
                req.onreadystatechange = function () {
                    if (req.readyState == 4) {
                        try {
                            if (req.status != 403)
                                _this.is_new_token = false

                            if (req.status == 200) {
                                var hls_url = _this.get_hls_url(req.responseText)
                                if (hls_url != null) {
                                    return _this.start_download(hls_url)
                                } else {
                                    push_error("無法解析直播來源")
                                }
                            } else {
                                if (req.status == 404) {
                                    return _this.check_live(sleep = true, success = true)
                                } else {
                                    if (req.status == 403) {
                                        if (_this.is_new_token)
                                            push_error("權限驗證失敗")
                                        _this.is_new_token = true
                                        _this.clear_token()
                                    } else {
                                        if (req.status != 404)
                                            push_error("無法取得直播狀態 - " + req.status)
                                    }
                                }
                            }
                        } catch (e) {
                            push_error(e)
                            _this.decoder = null
                        }
                        _this.check_live()
                    }
                }
                req.send()
            }).catch((e) => {
                push_error(e)
                this.check_live()
            })
    }
    // token
    parse_token(text) {
        try {
            var response = JSON.parse(text)
            var streamPlaybackAccessToken = response["data"]["streamPlaybackAccessToken"]
            this.sig = streamPlaybackAccessToken["signature"];
            this.token = streamPlaybackAccessToken["value"];
            return true
        } catch (e) {
            push_error(e)
        }
        return false
    }

    refresh_oauth() {
        return getTwitchOauth()
            .then(token => {
                if (this.auth_token)
                    return
                if (token) {
                    if (this.invalid_token && this.invalid_token == token)
                        return
                    push_message("Found new auth token")
                    chrome.storage.local.set({
                        'auth_token': token
                    })
                    this.auth_token = token
                }
            })
    }

    refresh_token(retry = 0) {
        var _this = this
        var Client_ID = "kimne78kx3ncx6brgo4mv6wki5h1ko"
        var Device_ID = "LfXCb11xg7skMqB0twsuVf9xeZEmrybj"
        var url = "https://gql.twitch.tv/gql"
        return this.refresh_oauth()
            .then(() => {
                if (this.interrupt)
                    throw new Error("Interrupted")
                if (retry >= 3)
                    throw new Error("無法取得金鑰")
                return new Promise((resolve, reject) => {
                    var req = new XMLHttpRequest()
                    req.open("POST", url)
                    req.setRequestHeader("Content-type", "application/json")
                    req.setRequestHeader("Client-ID", Client_ID)
                    req.setRequestHeader("Device-ID", Device_ID)
                    if (this.auth_token) {
                        req.setRequestHeader("Authorization", "OAuth " + this.auth_token)
                    }
                    req.onreadystatechange = function () {
                        if (req.readyState == 4) {
                            try {
                                if (req.status == 200 && _this.parse_token(req.responseText))
                                    resolve()
                                else {
                                    if (req.status == 401) {
                                        push_error("Invalid auth token (removed)")
                                        chrome.storage.local.remove('auth_token')
                                        _this.invalid_token = _this.auth_token
                                        _this.auth_token = null
                                        return _this.refresh_oauth()
                                            .then(() => {
                                                setTimeout(function () {
                                                    resolve(_this.refresh_token(retry + 1))
                                                }, 1000)
                                            })
                                    }
                                    setTimeout(function () {
                                        resolve(_this.refresh_token(retry + 1))
                                    }, 1000)
                                }
                            } catch (e) {
                                setTimeout(function () {
                                    resolve(_this.refresh_token(retry + 1))
                                }, 1000)
                            }
                        }
                    }
                    // send channel name
                    req.send(`{"operationName":"PlaybackAccessToken_Template","query":"query PlaybackAccessToken_Template($login: String!, $isLive: Boolean!, $vodID: ID!, $isVod: Boolean!, $playerType: String!) {  streamPlaybackAccessToken(channelName: $login, params: {platform: \\"web\\", playerBackend: \\"mediaplayer\\", playerType: $playerType}) @include(if: $isLive) {    value    signature    __typename  }  videoPlaybackAccessToken(id: $vodID, params: {platform: \\"web\\", playerBackend: \\"mediaplayer\\", playerType: $playerType}) @include(if: $isVod) {    value    signature    __typename  }}","variables":{"isLive":true,"login":"${this.channel_name}","isVod":false,"vodID":"","playerType":"site"}}`)
                })
            });
    }

    clear_token() {
        this.sig = null
        this.token = null
    }

    get_token() {
        return new Promise((resolve, reject) => {
            if (this.sig && this.token) {
                resolve()
            } else {
                resolve(this.refresh_token())
            }
        })
    }

    // parse
    get_hls_url(text) {
        var skip = this.quality
        var target = null
        try {
            var lines = text.split('\n')
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                if (line.startsWith("#"))
                    continue
                target = line
                if (skip <= 0)
                    return line
                skip -= 1
            }
        } catch (e) {
            push_error(e)
        }
        return target
    }

    // start
    start_download(hls_url) {
        var holder_type = this.folder_handler.type
        if (holder_type == 'local')
            this.decoder = new Decoder(this.pendingWritable, this.folder_handler.handler, this.output_type, this.output_length)
        else if (holder_type == 'youtube') {
            if (this.output_length == -1)
                this.output_length = 36000
            this.decoder = new CloudDecoder(this.pendingWritable, this.folder_handler.handler, this.output_type, Math.min(this.output_length, 36000))
        } else
            this.decoder = new CloudDecoder(this.pendingWritable, this.folder_handler.handler, this.output_type, this.output_length)

        set_status("準備下載中")
        showAnim(new Date().toLocaleString(), document.getElementById('start_time'))

        push_message("開始下載")
        this.decoder.run(hls_url)
            .catch(e => {
                push_error(e)
            }).finally(() => {
                this.decoder = null
                if (this.interrupt)
                    this.reload()
                else
                    this.check_live(true, true)
            })
    }

    // misc
    fill_files() {
        var file_holder = document.getElementById('files')
        file_holder.innerHTML = ""
        var entries = this.folder_handler.handler.entries()

        function do_file() {
            return entries.next()
                .then(result => {
                    if (result.done) {
                        if (file_holder.innerHTML == "") {
                            file_holder.innerText = "--"
                            showAnim(file_holder.innerText, file_holder)
                        }
                    } else {
                        switch (result.value[1].kind) {
                            case 'youtube':
                            case 'gdrive':
                            case 'onedrive':
                                var a = document.createElement('a')
                                if (result.value[1].id)
                                    a.href = "https://www.youtube.com/watch?v=" + result.value[1].id
                                else if (result.value[1].link)
                                    a.href = result.value[1].link
                                a.innerText = result.value[0]
                                a.target = "_blank"
                                file_holder.append(a)
                                return do_file()
                            case 'file':
                                return result.value[1].getFile()
                                    .then(file => {
                                        var a = document.createElement('a')
                                        a.href = URL.createObjectURL(file)
                                        a.innerText = result.value[0]
                                        a.target = "_blank"
                                        file_holder.append(a)
                                        return do_file()
                                    })
                            default:
                                return do_file()
                        }
                    }
                }).catch(e => {
                    push_error(e)
                })
        }
        return do_file()
    }

    getStatusText() {
        return "執行中"
    }

    setInterrupt() {
        this.interrupt = true
        if (this.decoder) {
            this.decoder.setInterrupt()
        } else {
            this.reload()
        }
    }

    check_pending_write() {
        while (this.pendingWritable.length > 0)
            if (this.pendingWritable[0].output_finished)
                this.pendingWritable.shift()
        else
            break
        var count = 0
        this.pendingWritable.forEach(w => {
            if (w.output_finished == null)
                count += 1
        });
        set_status(count + " 個檔案輸出中，請稍後，請勿離開此頁面")
        return count
    }

    reload() {
        var _this = this
        var count = this.check_pending_write()
        if (count == 0) {
            window.onbeforeunload = null
            window.location.reload()
        }
        else
            setTimeout(function(){
                _this.reload()
            }, 3000)
    }
}