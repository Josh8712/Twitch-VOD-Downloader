class OneDriveStorage extends CloudStorage {
    constructor() {
        super();
        // cred
        this.client_id = "f70e7335-0cc2-4f7a-82c1-c97da9e3ccc6"
        this.client_secret = "X4xiw0mPEq8Pomo8P8DKSVA"
        this.redirect_uri = 'https://clalmipngagbenbolclhinppjkincghn.chromiumapp.org/oauth2'
        this.apiRoot = 'https://graph.microsoft.com/v1.0/me/drive/'
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
        var authWindow = window.open(`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&scope=files.readwrite.all offline_access&response_type=code&prompt=select_account`)
        return new Promise((resolve, reject) => {
            this.authCallbackPair = [resolve, reject]
            return this.verifyAuth(authWindow);
        })
    }
    // token
    refreshToken() {
        var refresh_token = this.refresh_token
        this.code = null
        this.token = null
        this.expire = null
        return fetch("https://login.microsoftonline.com/common/oauth2/v2.0/token", {
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
        return fetch("https://login.microsoftonline.com/common/oauth2/v2.0/token", {
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

    verifyAuth(authWindow) {
        var _this = this
        if(this.authCallbackPair == null) {
            if (!authWindow.closed) 
                authWindow.close()
            return
        }
        if(authWindow.closed) {
            if(this.btn)
                this.btn.show()
            return this.authCallbackPair[1](new Error("使用者取消認證"))
        }
        setTimeout(function(){ _this.verifyAuth(authWindow) }, 500);
    }

    // api
    getFoldersForPath(path) {
        return this.getAuthToken()
        .then(token => {
            return fetch(this.apiRoot + path + "children?select=name,id,file,folder", {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(response=>{
                return response.json()
            }).then(body=>{
                if(body.value) {
                    var list = []
                    body.value.forEach(item=>{
                        if(item.folder)
                            list.push({
                                title: item.name,
                                id: item.id
                            })
                    })
                    return list
                }
                throw new Error("無法存取資料夾")
            })
        })
    }

    getPath() {
        var _this = this
        return this.getAuthToken()
        .then(() => {
            return new Promise((resolve, reject) => {
                new FolderWalker(
                    {
                        storage: this,
                        onChosen: function(title, folderID) {
                            _this.folderID = folderID
                            resolve(title)
                        },
                        onCancel: function (e) {
                            reject(e)
                        }
                    }
                ).update();
            })
        })
    }

    getPathID() {
        return new Promise((resolve, reject) => {
            if(this.folderID)
                return resolve(this.folderID)
            resolve(this.getPath()
            .then(()=>{
                return this.getPathID()
            })
            )
        })
    }

    requestPermission() {
        return this.getPathID()
        .then(()=>{
            return "granted"
        })
    }

    // list videos
    entries() {
        return this
    }
    findPlayListItems(token, items, nextPageToken=null) {
        var url = "https://graph.microsoft.com/v1.0/me/drive/items/" + this.folderID + "/children?select=name,id,file,folder,webUrl"
        if(nextPageToken)
            url = nextPageToken
        return fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response=>{
            return response.json()
        }).then(body=>{
            if(body?.error)
                throw new Error(body.error?.message)
            else if (body?.value == null)
                throw new Error("Cannot get playlistItems")
            body.value.forEach(item=>{
                if(item.file)
                    items.push({
                        title: item.name,
                        link: item.webUrl
                    })
            })
            if(body['@odata.nextLink']) {
                return this.findPlayListItems(token, items, body['@odata.nextLink']) 
            } else
                return items
        })
    }
    force_entries() {
        var itemList = []
        return this.getAuthToken()
        .then(token=>{
            return this.findPlayListItems(token, itemList)
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
                                'kind': 'onedrive',
                                'link': this.videos[idx].link
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
                "@microsoft.graph.conflictBehavior": "rename",
                "name": filename + ".mp4"
              }
            return fetch("https://graph.microsoft.com/v1.0/me/drive/items/" + this.folderID + ":/" + filename + ":/createUploadSession", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(body)
            }).then(response=>{
                if(response.status == 200) {
                    return response.json()
                    .then((body)=>{
                        if(body.uploadUrl)
                            this.videoUploadURL = body.uploadUrl
                        else
                            throw new Error("未取得上傳端點")
                    })
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

    deleteVideo(videoID) {
        return this.getAuthToken()
        .then(token => {
            return fetch("https://graph.microsoft.com/v1.0/me/me/drive/items/" + videoID, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
            }).then(response=>{
                if(response.status >= 300)
                    push_error("無法移除影片")
            })
        })
    }   
}