var downloaderPage = "downloader/downloader.html"
chrome.runtime.onInstalled.addListener(async () => {
    console.log('Extension is Installed');
    chrome.alarms.create("check", {periodInMinutes: 1})
    openPage()
});

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    chrome.tabs.query({}, function (tabs) {
        for (let index = 0; index < tabs.length; index++) {
            const tab = tabs[index];
            if(tab.url.startsWith("chrome-extension://" + chrome.runtime.id) && tab.url.includes(downloaderPage)) {
                chrome.tabs.sendMessage(tab.id, 
                {
                    type: 'authCallback',
                    url: details?.url
                }).catch(()=>{})
            }
        }
    })
}, {urls: ["http://127.0.0.1:13604/*", "https://clalmipngagbenbolclhinppjkincghn.chromiumapp.org/*"]}, [])

function checkLive() {
    chrome.storage.local.get(['channel_name', 'dest', 'auth_token', 'type'])
    .then(result => {
        var channel = null
        var token = result['auth_token']
        var type = result['type']
        if(result['channel_name'] && result['channel_name'].trim().length > 0) {
            channel = result['channel_name'].trim()
        }
        var header = {
            'Content-Type': 'application/json',
            'Client-ID': "kimne78kx3ncx6brgo4mv6wki5h1ko",
            "Device-ID": "LfXCb11xg7skMqB0twsuVf9xeZEmrybj"
        }
        if(token) {
            header["Authorization"] = "OAuth " + token
        }
        return fetch("https://gql.twitch.tv/gql", {
            method: 'POST',
            headers: header,
            body: `{"operationName":"PlaybackAccessToken_Template","query":"query PlaybackAccessToken_Template($login: String!, $isLive: Boolean!, $vodID: ID!, $isVod: Boolean!, $playerType: String!) {  streamPlaybackAccessToken(channelName: $login, params: {platform: \\"web\\", playerBackend: \\"mediaplayer\\", playerType: $playerType}) @include(if: $isLive) {    value    signature    __typename  }  videoPlaybackAccessToken(id: $vodID, params: {platform: \\"web\\", playerBackend: \\"mediaplayer\\", playerType: $playerType}) @include(if: $isVod) {    value    signature    __typename  }}","variables":{"isLive":true,"login":"${channel}","isVod":false,"vodID":"","playerType":"site"}}`,
        }).then(response=>{
            if (response.status == 401) {
                if(token) {
                    return chrome.storage.local.remove('auth_token')
                    .then(()=>{
                        return checkLive()
                    })
                }
                else
                    return
            }
            if(response.status == 200) {
                return response.json()
                .then(body=>{
                    var streamPlaybackAccessToken = body?.["data"]?.["streamPlaybackAccessToken"]
                    if(streamPlaybackAccessToken) {
                        return {
                            sig: streamPlaybackAccessToken["signature"],
                            token: streamPlaybackAccessToken["value"]
                        }
                    }
                    return null
                })
            }
        }).then(pair=>{
            if(pair != null) {
                var token = pair.token
                var sig = pair.sig
                var url = `https://usher.ttvnw.net/api/channel/hls/${channel}.m3u8?acmb=e30%3D&allow_source=true&fast_bread=true&player_backend=mediaplayer&reassignments_supported=true&cdm=wv&supported_codecs=avc1&`
                url += `token=${token}&sig=${sig}`
                fetch(url)
                .then(response=>{
                    if (response.status == 200) {
                        if (type == 'local') {
                            chrome.notifications.clear("streamStart", function() {
                                reopen = {
                                    title: "點此重新打開視窗",
                                }
                                cancel = {
                                    title: "點此取消背景檢查",
                                }
                                chrome.notifications.create("streamStart", {
                                    type: chrome.notifications.TemplateType.BASIC,
                                    iconUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/8aae7c4e-05f5-4d4f-b49a-dc28f6099fbb-profile_image-70x70.png",
                                    title: "VOD Downloader " + channel + " 直播開始了",
                                    message: "無法於背景開始本地下載作業",
                                    buttons: [reopen, cancel],
                                    isClickable: true
                                });
                            })
                        } else 
                            openRunningPage()
                    } 
                })
            }
        }).catch(()=>{})
    })
}

chrome.alarms.onAlarm.addListener(function(alarm){
    if(alarm.name == "check") {
        chrome.storage.local.get("isRunning")
        .then(result=>{
            if(result?.isRunning) {
                return detectRunningPageExists()
                .then(exists=>{
                    if (!exists) {
                        checkLive()
                    }
                }).catch(()=>{})
            }
        })
    }
});

chrome.alarms.create("check", {periodInMinutes: 1})

var handler = 0
function detectPageExists(sleep=1000) {
    handler += 1
    const checker = handler
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            if (checker != handler)
                reject()
            chrome.tabs.query({}, function (tabs) {
                for (let index = 0; index < tabs.length; index++) {
                    const tab = tabs[index];
                    if(tab.url.startsWith("chrome-extension://" + chrome.runtime.id) && tab.url.includes(downloaderPage))
                        resolve(tab)
                }
                resolve(null)
            })
        }, sleep);
    })
}

function sendCheckRunningToPage(pages, idx=0) {
    return new Promise((resolve, reject)=>{
        if(idx>=pages.length){
            return resolve(false)
        }
        var tab = pages[idx]
        if (tab.url.startsWith("chrome-extension://" + chrome.runtime.id) && tab.url.includes(downloaderPage)) {
            var clearID = setTimeout(function(){
                if(resolve)
                    resolve(sendCheckRunningToPage(pages, idx + 1))
                resolve = null
            }, 1000)
            chrome.tabs.sendMessage(tab.id, {
                type: "checkStarted"
            })
            .then((response)=>{
                if(response && response.running && resolve) {
                    resolve(true)
                    resolve = null
                    clearTimeout(clearID)
                }
            }).catch(()=>{})
        } else
            resolve(sendCheckRunningToPage(pages, idx + 1))
    })
}

function detectRunningPageExists() {
    handler += 1
    const checker = handler
    return new Promise((resolve, reject) => {
        if (checker != handler)
            resolve(true)
        chrome.tabs.query({}, function (tabs) {
            resolve(sendCheckRunningToPage(tabs, idx=0))
        })
    })
}

function sendRunningToPage(pages, idx=0) {
    if(idx>=pages.length){
        chrome.windows.create({url: downloaderPage})
        return
    }
    var tab = pages[idx]
    if (tab.url.startsWith("chrome-extension://" + chrome.runtime.id) && tab.url.includes(downloaderPage)) {
        var clearID = setTimeout(function(){
            sendRunningToPage(pages, idx + 1)
        }, 1000)
        chrome.tabs.sendMessage(tab.id, {
            type: "start"
        })
        .then(()=>{
            clearTimeout(clearID)
        }).catch(()=>{})
    } else
        sendRunningToPage(pages, idx + 1)
}

function openRunningPage() {
    chrome.tabs.query({}, function (tabs) {
        sendRunningToPage(tabs, 0)
    })
}

function openPage(sleep=1, reply=null) {
    detectPageExists(sleep)
    .then(tab=>{
        if(tab) {
            chrome.tabs.update(tab.id, {active: true})
            chrome.windows.update(tab.windowId, {focused: true})
        } else {
            chrome.windows.create({url: downloaderPage})
        }
        if(reply)
            reply()
    }).catch(()=>{})
}

chrome.notifications.onClicked.addListener(function(e) {
    openPage()
})

chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex) {
    if(notificationId.startsWith("WarnClosed")) {
        if(buttonIndex == 0)
            openPage()
        else 
            chrome.storage.local.remove('isRunning')
    }
    else if(notificationId.startsWith("CancelInterrupt"))
        chrome.storage.local.remove('isRunning')
    else if(notificationId.startsWith("streamStart")) {
        if(buttonIndex == 0)
            openPage()
        else 
            chrome.storage.local.remove('isRunning')
    }
});

chrome.runtime.onMessage.addListener((message, sender, reply) => {
    if ( message?.type == 'status' ) {
        return chrome.extension.getViews()
        .then(tabs=>{
            var status = tabs.length
            reply({ result: {
                success: true,
                data: status
            } })
        })
    } else if ( message?.type == 'closing' ) {
        return setTimeout(()=>{
            detectRunningPageExists()
            .then(exists=>{
                if (!exists) {
                    chrome.storage.local.get('type')
                    .then(type=>{
                        type = type?.type
                        if(type == null)
                            return
                        chrome.storage.local.set({'isRunning': 1})
                        if ( type == 'local' ) {
                            chrome.notifications.clear("WarnClosed", function() {
                                reopen = {
                                    title: "點此重新打開視窗",
                                }
                                cancel = {
                                    title: "點此取消背景檢查",
                                }
                                chrome.notifications.create("WarnClosed", {
                                    type: chrome.notifications.TemplateType.BASIC,
                                    iconUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/8aae7c4e-05f5-4d4f-b49a-dc28f6099fbb-profile_image-70x70.png",
                                    title: "VOD Downloader 已停止下載作業",
                                    message: "本地儲存需要頁面保持開啟，才能自動執行下載作業，僅能於背景檢查直播開始通知",
                                    buttons: [reopen, cancel],
                                    isClickable: true
                                });
                            })
                        } else {
                            chrome.notifications.clear("CancelInterrupt", function() {
                                cancel = {
                                    title: "點此取消背景檢查",
                                }
                                chrome.notifications.create("CancelInterrupt", {
                                    type: chrome.notifications.TemplateType.BASIC,
                                    iconUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/8aae7c4e-05f5-4d4f-b49a-dc28f6099fbb-profile_image-70x70.png",
                                    title: "VOD Downloader 在背景執行檢查",
                                    message: "當直播開始時會自動執行錄影上傳",
                                    buttons: [cancel],
                                    isClickable: true
                                });
                            })
                        }
                    })
                }
            }).catch(()=>{})
        }, 1000)
    } else if ( message?.type == 'open' ) {
        openPage(1, reply)
    } else if ( message?.type == 'restore' ) {
        return
        chrome.storage.local.get('isRunning')
        .then(result=>{
            if(result?.isRunning) {
                chrome.storage.local.remove('isRunning') 
                chrome.notifications.clear('stopped', function() {
                    chrome.notifications.create("stopped", {
                        type: chrome.notifications.TemplateType.BASIC,
                        iconUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/8aae7c4e-05f5-4d4f-b49a-dc28f6099fbb-profile_image-70x70.png",
                        title: "VOD Downloader 已停止背景檢查",
                        message: "已偵測到下載頁面開啟",
                        isClickable: true
                    });
                })
            }
        })
        
    }
    reply({ result: {
        success: false,
    } })
});
importScripts('editor-background.js');