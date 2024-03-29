class GoogleStorage extends CloudStorage {
    constructor() {
        super();
        this.apiKey = 'AIzaSyCVxiIDgDogJO5xS9L3XK2zRYNOWxPd9Lc'
        this.folderID = null
    }
    getAuthToken() {
        return chrome.identity.getAuthToken({
                interactive: true
            })
            .then(token => {
                return token.token
            })
    }

    getPath() {
        var _this = this
        return new Promise((resolve, reject) => {
                gapi.load('client', function () {
                    gapi.client.init({
                        'apiKey': _this.apiKey,
                        discoveryDocs: ['/downloader/rest']
                    }).then(() => {
                        resolve()
                    })
                })
            })
            .then(() => {
                return this.getAuthToken()
            })
            .then(token => {
                gapi.client.setToken({
                    'access_token': token
                })
                return new Promise((resolve, reject) => {
                    new FolderWalker(
                        {
                            storage: _this,
                            onChosen: function(title, folderID) {
                                if(this.btn) {
                                    this.btn.show()
                                    this.btn = null
                                }
                                _this.folderID = folderID
                                if(title && folderID)
                                    resolve(title)
                                else
                                    reject(new Error("無法取得資料夾"))
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

    getFoldersForPath(folderId) {
        return gapi.client.drive.files.list({
            q: "'" + folderId + "' in parents and mimeType = 'application/vnd.google-apps.folder' and ('me' in writers or 'me' in owners)  and trashed = false",
            fields: 'files(id,name)' 
        }).then(e=>{
            return e.result.files
        })
    }

    // list videos
    entries() {
        return this
    }

    findPlayListItems(token, items, pageToken=null) {
        var url = "https://www.googleapis.com/drive/v3/files?fields=files(webViewLink,name)&q='" + this.folderID + "'  in parents"
        if(pageToken)
            url += "&pageToken=" + pageToken
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
            else if (body?.files == null)
                throw new Error("Cannot get playlistItems")
            body.files.forEach(item=>{
                items.push({
                    title: item.name,
                    link: item.webViewLink
                })
            })
            if(body.nextPageToken) {
                return this.findPlayListItems(token, items, body.nextPageToken) 
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
                                'kind': 'gdrive',
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
                "name": filename,
                "originalFilename": filename + ".mp4",
                "parents": [this.folderID]
              }
            return fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable", {
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
                        if(entry[0] == 'location')
                            return new GoogleWritable(entry[1])
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
            return fetch("https://www.googleapis.com/drive/v3/files/" + file_handler.videoID, {
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