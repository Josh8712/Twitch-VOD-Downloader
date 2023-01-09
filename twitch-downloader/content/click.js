class Downloader {
    constructor(hlsLink) {
        this.hlsLink = hlsLink
        this.editors = []
        this.segment_history = []
        this.pendingWindow = 0
        this.segment_history_idx = 0
        this.alive = true
        this.current_time = null
    }

    isDone() {
        for (var ei = 0; ei < this.editors.length; ei++) {
            var editor = this.editors[ei]
            if (editor.closed) {
                this.editors.splice(ei, 1)
                ei--;
            }
        }
        if (this.editors.length == 0 && this.pendingWindow == 0)
            this.alive = false
        return !this.alive
    }

    stop() {
        this.alive = false
        clearInterval(this.jobber)
    }

    download() {
        if (this.isDone())
            return
        fetch(this.hlsLink)
            .then(r => {
                return r.text()
            }).then(async body => {
                var date_time = null
                var duration = null
                var lines = body.split('\n')
                for (let i = 0; i < lines.length; i++) {
                    var line = lines[i]
                    if (line.length == 0)
                        continue
                    if (line.startsWith("#EXT-X-PROGRAM-DATE-TIME"))
                        date_time = line
                    else if (line.startsWith("#EXTINF"))
                        duration = line
                    else if (!line.startsWith("#")) {
                        date_time = date_time.slice(date_time.indexOf(':') + 1)
                        date_time = Date.parse(date_time)
                        if (this.current_time != null && date_time <= this.current_time)
                            continue
                        this.current_time = date_time

                        duration = duration.slice(duration.indexOf(':') + 1)
                        duration = duration.slice(0, duration.indexOf(','))
                        duration = parseFloat(duration)
                        await fetch(line)
                            .then(r => {
                                return r.blob()
                            }).then(b => {
                                return b.arrayBuffer()
                            }).then(segment => {
                                var segment = {
                                    data: segment,
                                    id: this.segment_history_idx,
                                    duration: duration
                                }
                                this.segment_history_idx += 1
                                this.segment_history.push(segment)
                                this.editors.forEach(win => {
                                    win.postMessage(segment, '*')
                                })
                            })
                    }
                }
                var _this = this
                setTimeout(function () {
                    _this.download()
                }, 1000)
            })
            .catch((e) => {
                this.alive = false
            })
    }

    addWindow(win) {
        var _this = this
        this.pendingWindow += 1
        var id = new Date().getTime()
        var retry = 0
        var check_int = setInterval(function () {
            try {
                win.postMessage({ message: 'hello', id: id }, '*')
                retry += 1
                if (retry > 10) {
                    clearInterval(check_int)
                    _this.pendingWindow -= 1
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
                        win.postMessage(segment, '*')
                    })
                    _this.editors.push(win)
                    _this.pendingWindow -= 1
                }
            } catch {

            }
        }
        window.addEventListener('message', checker)
    }
}
function patchSocket() {
    window.gql_headers = null
    window.addEventListener('message', function (e) {
        if (e.origin !== window.location.origin)
            return;
        let data = e.data;
        if(data?.gql_headers)
            window.gql_headers = data.gql_headers
    });
    class newSocket extends WebSocket {
        constructor(...arg) {
            super(...arg)
            if (arg[0].startsWith("wss://pubsub-edge.twitch.tv"))
                this.addEventListener("message", event => {
                    // console.log(`[message] Data received from server: ${event.data}`);
                    if (gql_headers == null)
                        return
                    var msg = JSON.parse(event.data)
                    if (msg.type == "MESSAGE") {
                        var data = msg?.data?.message
                        if (data == null)
                            return
                        data = JSON.parse(data)
                        if (data.type == "claim-available") {
                            data = data?.data?.claim
                            if (data == null)
                                return
                            var req = [{
                                "operationName": "ClaimCommunityPoints", "variables": {
                                    "input": {
                                        "channelID": data.channel_id, "claimID": data.id
                                    }
                                }, "extensions": { "persistedQuery": { "version": 1, "sha256Hash": "46aaeebe02c99afdf4fc97c7c0cba964124bf6b0af229395f1f6d1feed05b3d0" } }
                            }]
                            var parsed_headers = {}
                            gql_headers.forEach(h => {
                                parsed_headers[h.name] = h.value
                            })
                            fetch("https://gql.twitch.tv/gql", {
                                body: JSON.stringify(req),
                                headers: parsed_headers,
                                method: 'POST'
                            })
                        }
                    }
                })
            return this
        }
    }
    WebSocket = newSocket
}
document.documentElement.setAttribute('onreset', `(${patchSocket.toString()})();`);
document.documentElement.dispatchEvent(new CustomEvent('reset'));
document.documentElement.removeAttribute('onreset');

document.addEventListener("DOMContentLoaded", function () {
    var hlsLink = null
    var hls_checker = null
    var downloader = null
    function startEditor() {
        if (hlsLink == null)
            return
        var win = window.open('https://josh8712.github.io/Twitch-VOD-Downloader/twitch-downloader/editor/editor.html')
        // var win = window.open('https://josh8712.github.io/Twitch-VOD-Downloader/twitch-downloader/editor/editor.html')
        if (downloader == null || downloader.isDone()) {
            downloader = new Downloader(hlsLink)
        }
        downloader.addWindow(win)
        downloader.download()
    }
    chrome.runtime.onMessage.addListener((message, sender, reply) => {
        addBtn()
        if (message?.clearURL) {
            hls_checker = null
            hlsLink = null
        }
        else if (message?.url) {
            if (hls_checker == message?.url)
                return
            hls_checker = message?.url
            fetch(message?.url)
                .then(r => {
                    if (r.status != 200)
                        throw new Error()
                    return r.text()
                }).then(body => {
                    var lines = body.split('\n')
                    for (let i = 0; i < lines.length; i++) {
                        if (!lines[i].startsWith("#")) {
                            hlsLink = lines[i]
                            return
                        }
                    }
                }).catch(() => {
                })
            if (downloader) {
                downloader.stop()
                downloader = null
            }
        } else if (message?.header) {
            window.postMessage({
                gql_headers: message?.header
            })
            return
        }
        var editors = document.querySelectorAll(".downloader-editor")
        editors.forEach(editorBTN => {
            if (hls_checker == null)
                editorBTN.setAttribute('style', 'display:none !important');
            else
                editorBTN.style.display = ""
        })
        if (hlsLink == null && downloader != null) {
            downloader.stop()
            downloader = null
        }
    });

    function handleCaptureHolder(control_holder) {
        if (control_holder.querySelector("#downloader-capture") != null)
            return
        var parent = control_holder.parentElement
        var video = null
        while (parent) {
            if (parent.childNodes[0].nodeName == 'VIDEO') {
                video = parent.childNodes[0]
                break
            }
            parent = parent.parentElement
        }
        if (video == null)
            return
        var target = control_holder.querySelector(':scope > div:has(> button)')
        if (target == null)
            return
        var copy = target.cloneNode(true)
        copy.id = "downloader-capture"
        var button = copy.querySelector('button')
        if (button == null)
            return
        button.ariaLabel = '截圖'
        var svg = copy.querySelector('svg')
        if (svg == null)
            return
        svg.setAttribute("viewBox", "0 0 16 16");
        var paths = svg.querySelectorAll('path')
        for (let index = 1; index < paths.length; index++) {
            const element = paths[index];
            element.remove()
        }
        var path = svg.querySelector('path')
        if (path == null)
            return
        path.setAttribute("d", "M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z")
        control_holder.insertBefore(copy, control_holder.children[0]);
        button.onclick = function () {
            var filename = document.querySelector('.live-time')?.innerText
            if (filename == null) {
                filename = new Date().toTimeString().split(' ')[0]
            }
            filename += '.png'
            var canvas = document.createElement('canvas')
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            var context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            var data = canvas.toDataURL('image/png')

            var a = document.createElement('a');
            a.href = data;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove()
        }
    }

    function handleEditHolder(control_holder) {
        if (control_holder.querySelector(".downloader-editor") != null)
            return
        var target = control_holder.querySelector(':scope > div:has(> button)')
        if (target == null)
            return
        var copy = target.cloneNode(true)
        copy.classList.add('downloader-editor')
        var button = copy.querySelector('button')
        if (button == null)
            return
        button.ariaLabel = '剪輯'
        var svg = copy.querySelector('svg')
        if (svg == null)
            return
        svg.setAttribute("viewBox", "0 0 16 16");
        var paths = svg.querySelectorAll('path')
        for (let index = 1; index < paths.length; index++) {
            const element = paths[index];
            element.remove()
        }
        var path = svg.querySelector('path')
        if (path == null)
            return
        path.setAttribute("d", "M3.5 3.5c-.614-.884-.074-1.962.858-2.5L8 7.226 11.642 1c.932.538 1.472 1.616.858 2.5L8.81 8.61l1.556 2.661a2.5 2.5 0 1 1-.794.637L8 9.73l-1.572 2.177a2.5 2.5 0 1 1-.794-.637L7.19 8.61 3.5 3.5zm2.5 10a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zm7 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z")
        control_holder.insertBefore(copy, control_holder.children[0]);
        button.onclick = function () {
            if (hlsLink == null)
                return copy.setAttribute('style', 'display:none !important');
            startEditor(hlsLink)
        }
        if (hlsLink == null)
            copy.setAttribute('style', 'display:none !important');
    }

    function addBtn() {
        var control_holders = document.querySelectorAll('.player-controls__right-control-group')
        control_holders.forEach(c => {
            handleCaptureHolder(c)
            handleEditHolder(c)
        })
    }
})