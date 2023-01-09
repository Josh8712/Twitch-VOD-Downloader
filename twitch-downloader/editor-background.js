chrome.webRequest.onBeforeRequest.addListener(function(details) {
    if(details.tabId < 0)
        return
    chrome.tabs.sendMessage(details.tabId, {
        url: details?.url
    })
}, {urls: ["https://usher.ttvnw.net/api/channel/hls/*"]}, [])

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    chrome.tabs.sendMessage(details.tabId, {
        clearURL: 1
    })
}, {urls: ["https://usher.ttvnw.net/vod/*"]}, [])

chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
    if(details.requestHeaders) {
        details.requestHeaders.forEach(h => {
            if(h.name == "Client-Integrity") {
                chrome.tabs.sendMessage(details.tabId, {
                    header: details.requestHeaders
                })
            }
        })
    }
}, {urls: ["https://gql.twitch.tv/gql"]}, ["requestHeaders"])

