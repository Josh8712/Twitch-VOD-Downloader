class YoutubeStorage extends CloudStorage {
    constructor() {
        super();
        // cred
        this.client_id = "111793709140-1l5ms0nh204r8rd5lvb3pp4sl1eq6206.apps.googleusercontent.com"
        this.client_secret = "4mQ8FST_7u0Aa5dkCIY2oS4Z"
        this.redirect_uri = "http://127.0.0.1:13604"
        this.code = null

        this.token = null
        this.expire = null
        this.refresh_token = null
        this.authCallbackPair = null
        
        // playlist
        this.playListName = "vods"
        this.lastCreatePlayList = 0
    }
    // authentication
    auth() {
        if(this.btn) {
            this.btn.hide()
        }
        
        var authWindow = window.open(`https://accounts.google.com/o/oauth2/auth?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&scope=https://www.googleapis.com/auth/youtube&response_type=code`)
        return new Promise((resolve, reject) => {
            this.authCallbackPair = [resolve, reject]
            return this.verifyAuthYoutube(authWindow);
        })
    }
    // token
    refreshToken() {
        var refresh_token = this.refresh_token
        this.code = null
        this.token = null
        this.expire = null
        return fetch("https://accounts.google.com/o/oauth2/token", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                },
                body: 'refresh_token='+refresh_token+
                    '&client_id='+this.client_id+
                    '&client_secret='+this.client_secret+
                    '&redirect_uri='+this.redirect_uri+
                    '&grant_type=refresh_token',
                redirect: 'manual',
        }).then(response=>{
            return response.json()
        }).then(body => {
            if(body.access_token && body.expires_in) {
                this.token = body.access_token
                this.expire = new Date(new Date().getTime() + body.expires_in * 1000)
                return this.token
            } else {
                this.refresh_token = null
                return this.getAuthToken()
            }
        })
    }

    exchangeToken() {
        var code = this.code
        this.code = null
        return fetch("https://accounts.google.com/o/oauth2/token", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                },
                body: 'code='+code+
                    '&client_id='+this.client_id+
                    '&client_secret='+this.client_secret+
                    '&redirect_uri='+this.redirect_uri+
                    '&grant_type=authorization_code',
                redirect: 'manual',
        }).then(response=>{
            return response.json()
        }).then(body => {
            if(body.access_token && body.expires_in && body.refresh_token) {
                this.token = body.access_token
                this.expire = new Date(new Date().getTime() + body.expires_in * 1000)
                this.refresh_token = body.refresh_token
                return this.token
            } else if(body.error)
                throw new Error(body.error)
            return this.getAuthToken()
        })
    }

    getAuthToken() {
        return new Promise((resolve, reject) => {
            if(this.token && this.expire > new Date())
                resolve(this.token)
            else if(this.refresh_token)
                resolve(this.refreshToken())
            else if(this.code)
                resolve(this.exchangeToken())
            else
                resolve(this.auth())
        })
    }
    // auth
    handle_auth_response(url) {
        var callback = this.authCallbackPair
        this.authCallbackPair = null
        if(callback) {
            try {
                url = url.split('?')[1]
                var parms = url.split('&')
                var error = false
                var code = false
                parms.forEach(parm=>{
                    var token = parm.split('=')
                    var name = token[0]
                    var val = token[1]
                    if(name == "error")
                        error = true
                    else if(name == "code")
                        code = val
                })
                if(error || code == null) {
                    if(this.btn) 
                        this.btn.show()
                    callback[1](new Error("認證失敗"))
                } else  {
                    this.code = code
                    callback[0](this.getAuthToken())
                }
            } catch(e) {
                callback[1](e)
            }
        }
    }

    verifyAuthYoutube(authWindow) {
        var _this = this
        chrome.tabs.query({url: "https://accounts.google.com/*111793709140*"}, function (tabs) {
            var closed = tabs.length == 0;
            if(_this.authCallbackPair == null) {
                chrome.tabs.query({url: "http://127.0.0.1:13604/*"}, function (tabs) {
                    tabs.forEach(function(tab) {
                        chrome.tabs.remove(tab.id)
                    })
                })
                return
            }
            if(closed) {
                if(_this.btn)
                    _this.btn.show()
                return _this.authCallbackPair[1](new Error("使用者取消認證"))
            }
            setTimeout(function(){ _this.verifyAuthYoutube(authWindow) }, 1000);
        })
    }

    // api
    getPath() {
        return this.getAuthToken()
        .then(token=>{
            return fetch(`https://youtube.googleapis.com/youtube/v3/channels?key=${this.client_id}&mine=true&part=snippet,status`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                        'Authorization': 'Bearer ' + token
                    },
            }).then(response=>{
                return response.json()
            }).then(body => {
                var title = body?.items?.[0]?.snippet?.title
                var status = body?.items?.[0]?.status?.longUploadsStatus
                if(this.btn) {
                    this.btn.show()
                    this.btn = null
                }
                if(title && status == "allowed")
                    return title
                else if(title)
                    throw new Error("頻道沒有上傳長片權限")
                throw new Error("沒有找到創建的頻道")
            })
        })
    }

    requestPermission() {
        return this.createPlayList()
        .then(()=>{
            return "granted"
        })
    }

    // playlist
    findPlayList(token, pageToken=null) {
        var url = "https://www.googleapis.com/youtube/v3/playlists?mine=true&maxResults=50&part=snippet&part=id"
        if(pageToken)
            url += "&pageToken" + pageToken
        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response=>{
            return response.json()
        }).then(body=>{
            if(body?.error)
                throw new Error(body.error?.message)
            else if (body?.items == null)
                throw new Error("Cannot get playlist")
            var id = null
            body.items.forEach(playlist=>{
                if(playlist.snippet.title == this.playListName)
                    id = playlist.id
            })
            if (id == null && body?.nextPageToken) {
                return this.findPlayList(token, pageToken=body.nextPageToken)
            } else 
                return id
        })
    }

    createPlayList() {
        var _this = this
        var token = null
        return this.getAuthToken()
        .then(_token=>{
            token = _token
            return this.findPlayList(token)
        }).then(playlistID=>{
            if(playlistID)
                return playlistID
            if(new Date() - this.lastCreatePlayList < 5 * 1000)
                return new Promise((resolve, reject)=>{
                    setTimeout(function() {
                        resolve(_this.findPlayList(token))
                    }, 1000)
                })
            this.lastCreatePlayList = new Date()
            var body = {
                "snippet":{
                    "title": "vods"
                },
                "status": {
                    "privacyStatus": "private"
                }
            }
            return fetch("https://www.googleapis.com/youtube/v3/playlists?part=contentDetails&part=id&part=player&part=snippet&part=status", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(body)
            }).then(response=>{
                return response.json()
            }).then(body=>{
                if(body?.error)
                    throw new Error(body.error?.message)
                else if (body.id == null)
                    throw new Error("Cannot create playlist")
                return body.id
            })
        })
    }
    
    // list videos
    entries() {
        return this
    }

    findPlayListItems(token, id, items, pageToken=null) {
        var url = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=snippet&part=id&part=contentDetails&playlistId=" + id
        if(pageToken)
            url += "&pageToken" + pageToken
        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response=>{
            return response.json()
        }).then(body=>{
            if(body?.error)
                throw new Error(body.error?.message)
            else if (body?.items == null)
                throw new Error("Cannot get playlistItems")
            body.items.forEach(item=>{
                if (item.contentDetails.videoPublishedAt)
                    items.push({
                        title: item.snippet.title,
                        videoID: item.contentDetails.videoId
                    })
            })
            if(body.nextPageToken) {
                return this.findPlayListItems(token, id, items, body.nextPageToken) 
            } else
                return items
        })
    }
    
    force_entries() {
        var itemList = []
        return this.createPlayList()
        .then(playlistID=>{
            return this.getAuthToken()
            .then(token=>{
                return this.findPlayListItems(token, playlistID, itemList)
            })
        }).then(items=>{
            this.videos = items
            return items
        })
    }

    next() {
        if(this.videos == null)
            return this.force_entries()
            .then(()=>{
                return this.next()
            })
        else {
            return new Promise((resolve, reject) => {
                if(this.idx >= this.videos.length) {
                    this.idx = 0
                    resolve({
                        done: true
                    })
                }
                else {
                    var idx = this.idx
                    this.idx += 1
                    resolve({
                        done: false,
                        value: [
                            this.videos[idx].title,
                            {
                                'kind': 'youtube',
                                'id': this.videos[idx].videoID
                            }
                        ]
                    })
                }
            })
        }
    }
    
    // writable
    createVideo(filename) {
        this.reset()
        return this.getAuthToken()
        .then(token=>{
            var body = {
                "snippet": {
                  "title": filename
                },
                "status": {
                  "privacyStatus": "private",
                  "selfDeclaredMadeForKids": false
                }
              }
            return fetch("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=status&part=snippet", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(body)
            }).then(response=>{
                if(response.status == 200) {
                    for(let entry of response.headers.entries()) {
                        if(entry[0] == 'location') {
                            return new GoogleWritable(entry[1])
                        }
                    }
                } else {
                    return response.json()
                    .then(body => {
                        var msg = "無法建立影片"
                        if(body?.error?.message) 
                            msg = body?.error?.message
                        throw new Error(msg)
                    })
                }
            })
        })
    }

    deleteVideo(file_handler) {
        return this.getAuthToken()
        .then(token => {
            return fetch("https://www.googleapis.com/youtube/v3/videos?id=" + file_handler.videoID, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
            }).then(response=>{
                if(response.status != 204)
                    push_error("無法移除影片")
            })
        })
    }

    finishVideo(file_handler) {
        return this.getAuthToken()
        .then(token => {
            return this.createPlayList()
            .then(playlistID => {
                var body = {
                    "snippet": {
                        "playlistId": playlistID,
                        "resourceId": {
                            "kind": "youtube#video",
                            "videoId": file_handler.videoID
                        },
                    }
                }
                return fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(body)
                }).then(response=>{
                    if(response.status != 200)
                        push_error("無法新增至播放清單")
                })
            })
        })
    }
}