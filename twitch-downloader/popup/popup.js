var downloaderPage = "downloader/downloader.html"

function open_tab() {
    chrome.runtime.sendMessage({type: 'open'}, function() {
        window.close()
    });
}

function finish_check() {
    var openBTN = document.getElementsByTagName('button')[0]
    document.getElementsByClassName('loader')[0].style.display = "none"
    openBTN.disabled = 0
    setTimeout(check, 1000);
}

function check() {
    var statusTxt = document.getElementById('status')

    var tabs = chrome.extension.getViews({type: chrome.extension.ViewType.TAB})
    var found = false
    tabs.forEach(tab => {
        if(tab.location.href.includes(downloaderPage)) {
            found = true
            statusTxt.innerText = tabs[0].getStatusText()
        }
    });
    if(found)
        finish_check()
    else {
        chrome.storage.local.get(['isRunning', 'type'])
        .then(storage=>{
            if(storage.isRunning) {
                if(storage.type && storage.type == 'local') 
                    statusTxt.innerHTML = '背景檢查中 <br> (無法自動執行下載作業)'
                else
                    statusTxt.innerHTML = '背景檢查中 <br> (直播開始時自動執行下載作業)'
            } else
                statusTxt.innerText = '尚未執行'
            finish_check()
        })
    }
}

function init() {
    var openBTN = document.getElementsByTagName('button')[0]
    document.getElementsByClassName('loader')[0].style.display = "block"
    
    openBTN.disabled = 1    
    openBTN.addEventListener("click", open_tab)

    check()
}

document.addEventListener("DOMContentLoaded", init)