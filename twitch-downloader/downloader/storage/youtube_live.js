class YoutubeLiveStorage extends YoutubeStorage {
    // writable
    createStream(filename) {
        return this.getAuthToken()
            .then(token => {
                var body = {
                    "snippet": {
                        "title": filename
                    },
                    "cdn": {
                        "ingestionType": "hls",
                        "resolution": "variable",
                        "frameRate": "variable"
                    },
                    "contentDetails": {
                        "isReusable": false
                    }
                }
                return fetch("https://www.googleapis.com/youtube/v3/liveStreams?part=snippet,cdn,id,contentDetails", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(body)
                }).then(response => {
                    if (response.status == 200) {
                        return response.json()
                    } else {
                        return response.json()
                            .then(body => {
                                var msg = "無法建立影片"
                                if (body?.error?.message)
                                    msg = body?.error?.message
                                throw new Error(msg)
                            })
                    }
                }).then(data => {
                    return {
                        id: data['id'],
                        url: data['cdn']['ingestionInfo']['ingestionAddress']
                    }
                })
            })
    }
    createVideo(filename) {
        this.reset()
        return this.createStream(filename)
            .then(stream => {
                return this.getAuthToken()
                    .then(token => {
                        var body = {
                            "snippet": {
                                "title": filename,
                                "scheduledStartTime": new Date().toISOString()
                            },
                            "status": {
                                "privacyStatus": "private",
                                "selfDeclaredMadeForKids": false
                            },
                            "contentDetails": {
                                "enableAutoStart": true,
                                "enableAutoStop": true
                            }
                        }
                        return fetch("https://www.googleapis.com/youtube/v3/liveBroadcasts?part=snippet,status,id,contentDetails", {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + token
                            },
                            body: JSON.stringify(body)
                        }).then(response => {
                            if (response.status == 200) {
                                return response.json()
                            } else {
                                return response.json()
                                    .then(body => {
                                        var msg = "無法建立影片"
                                        if (body?.error?.message)
                                            msg = body?.error?.message
                                        throw new Error(msg)
                                    })
                            }
                        }).then(data => {
                            return fetch("https://www.googleapis.com/youtube/v3/liveBroadcasts/bind?id=" + data['id'] + "&streamId=" + stream['id'], {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + token
                                }
                            }).then(response => {
                                if (response.status == 200) {
                                    push_message("直播連結: https://www.youtube.com/watch?v=" + data['id'])
                                    return new YoutubeLiveWritable(data['id'], stream['url'])
                                } else {
                                    return response.json()
                                        .then(body => {
                                            var msg = "無法建立影片"
                                            if (body?.error?.message)
                                                msg = body?.error?.message
                                            throw new Error(msg)
                                        })
                                }
                            })
                        })
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
                }).then(response => {
                    if (response.status != 204)
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
                    }).then(response => {
                        if (response.status != 200)
                            push_error("無法新增至播放清單")
                    })
                })
        })
    }
}