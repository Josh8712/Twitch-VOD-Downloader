var auther = null
var dest = null

var channel_name = null
var interval = null
var auth_token = null

var downloader = null

function handleStart() {
    var running = false
    var views = chrome.extension.getViews()
    views.forEach(view=>{
        if(view.isRunning && view.isRunning())
            running = true
    })
    if(!running) {
        chrome.windows.create({url: window.location.pathname})
    }
}

chrome.runtime.onMessage.addListener((message, sender, reply) => {
    if(sender?.id == chrome.runtime.id)
        if(message?.type == 'authCallback') {
            if(auther)
                auther.handle_auth_response(message?.url)
        } else if(message?.type == 'start') {
            reply()
            handleStart()
        } else if(message?.type == 'checkStarted') {
            reply({
                running: isRunning()
            })
        }
})

document.addEventListener("DOMContentLoaded", function(){
    // status
    const form = document.forms[0]; 
    form.addEventListener('submit', handleFormSubmit);
    document.getElementById('interrupt').addEventListener('click', interrupt);
    // misc
    document.getElementById("notes").addEventListener("click", showNotes);
    document.querySelector('.modal button[class=close]').addEventListener('click', closeModal);
    document.getElementById("edit_clip").addEventListener("click", edit_clip);
    
    // storage
    // storage - local
    document.getElementById("dest").addEventListener("click", chooseDest);
    document.getElementById("dest_text").addEventListener("click", chooseDest);
    document.getElementById("dest_text").addEventListener("keydown", preventKey);    
    // storage - cloud
    document.getElementById("youtube").addEventListener("click", authYoutube);
    document.getElementById("youtube_live").addEventListener("click", authYoutubeLive);
    document.getElementById("google").addEventListener("click", authGoogle);
    document.getElementById("onedrive").addEventListener("click", authOnedrive);
    document.getElementById("logout").addEventListener("click", logoutGoogle);
    
    // twitch token
    document.getElementById("get_twitch_oauth").onclick = function(event){event.preventDefault(); findTwitchOauth(true)}

    // restore
    restoreSetting()
    .then(()=>{
        var tabs = chrome.extension.getViews({type: chrome.extension.ViewType.TAB})
        var found = false
        tabs.forEach(tab => {
            if(tab.location.href.includes(window.location.pathname)) {
                if(tab.isRunning && tab.isRunning())
                    found = true
            }
        });
        if(found) {
            return
        }
        
        chrome.storage.local.get('isRunning')
        .then(data=>{
            if(data?.isRunning)
                if(dest && dest.type != 'local') {
                    showAlert("已自動開始錄製")
                    document.querySelector('button[type=submit]').click()
                }
        })
    })
    // first boot
    if(document.cookie==''){
        showNotes()
    }
});

// boot
function restoreSetting() {
    parms = ['channel_name', 'auth_token', 'quality', 'interval', 'output_type', 'output_length']
    return chrome.storage.local.get(parms)
    .then(result => {
        if(result['channel_name'] && result['channel_name'].trim().length > 0) {
            document.getElementById('channel').value = result['channel_name'].trim()
        }
        if(result['auth_token'] != null) {
            document.getElementById('OAuth').value = result['auth_token'].trim()
        }
        parms.forEach(parm=>{
            if(document.getElementById(parm) && result[parm] != null) {
                document.getElementById(parm).value = result[parm]
            }
        })
        
        return get('dest')
        .then(e=>{
            if(e){
                var instance = null
                if(e.type == "youtube") {
                    instance = new YoutubeStorage();
                } else if(e.type == "youtube_live") {
                    instance = new YoutubeLiveStorage();
                }
                else if(e.type == "gdrive") {
                    instance = new GoogleStorage();
                }
                if( instance ) {
                    Object.assign(instance, e.handler)
                    e.handler = instance
                }
                putFullDest(e)
            }
            return findTwitchOauth()
        })
    })
}

// start
function handleFormSubmit(event) {
    if(event)
        event.preventDefault();
    var btn = document.querySelector('button[type=submit]')
    var oritext = btn.innerText
    btn.childNodes[btn.childNodes.length - 1].data = ""
    var loader = document.querySelector('#check_loader')
    btn.disabled = true
    loader.style.display = ""
    dest.handler.requestPermission({mode: "readwrite"})
    .then(result=>{
        if (result != 'granted') 
            throw new Error("無法獲取存取權限")
        channel_name = document.getElementById('channel').value.trim()
        interval = document.getElementById('interval').value
        quality = document.getElementById('quality').value
        output_type = document.getElementById('output_type').value
        output_length = document.getElementById('output_length').value
        var oauth = document.getElementById('OAuth').value.trim()
        if (oauth.length > 0)
            auth_token = oauth
        document.getElementById("container").style.display="none"
        document.getElementById("info").style.display=""
        document.getElementById("folder_name").innerText = document.getElementById("dest_text").value
        start()
    })
    .catch(err => {
        showAlert(err)
        document.getElementById("container").style.display=""
        document.getElementById("info").style.display="none"
        window.onbeforeunload = null
    }).finally(()=>{
        btn.disabled = false
        loader.style.display = "none"
        btn.childNodes[btn.childNodes.length - 1].data = oritext
    })
}

function start() {
    chrome.storage.local.set({'isRunning': 1})
    window.onbeforeunload = function() {
        chrome.runtime.sendMessage({type: 'closing'});
        return true
    }
    chrome.storage.local.set({ 'channel_name': channel_name,
                               'auth_token': auth_token,
                               'type': dest.type,
                               'quality': quality,
                               'interval': interval,
                               'output_type': output_type,
                               'output_length': output_length })
    if(dest && dest.cleanup)
        dest.cleanup()
    if (dest.handler.btn)
        delete dest.handler.btn
    set('dest', dest)
    document.querySelector('.banner h1').innerText = channel_name + " VOD Downloader"
    downloader = new Downloader(auth_token, channel_name, quality, dest, interval, output_type, output_length)
    downloader.check_live(sleep=false)
}

// stop
function interrupt() {
    chrome.storage.local.remove('isRunning')
    var btn = document.getElementById('interrupt')
    btn.childNodes[btn.childNodes.length - 1].data = ""
    var loader = document.querySelector('#stop_loader')
    btn.disabled = true
    loader.style.display = ""
    if(downloader) {
        downloader.setInterrupt()
    } else {
        window.onbeforeunload = null
        window.location.reload()
    }
}

// storage
// storage - local
function chooseDest() {
    window.showDirectoryPicker({mode: "readwrite"})
    .then(folder_handler=>{
        putDest(folder_handler, 'local', folder_handler.name)
    }).catch(e=>{
        showAlert(e)
    })
}
function hideStorage() {
    this.parentElement.style.display = "none"
    document.getElementById("auth_loader").style.display = ""
}

function showStorage() {
    this.parentElement.style.display = ""
    document.getElementById("auth_loader").style.display = "none"
}

// storage - cloud
function authCloud(id, identifier, desc, storage) {
    var btn = document.getElementById(id)
    btn.show = showStorage
    btn.hide = hideStorage

    auther = new storage()
    auther.setBtn(btn)
    auther.getPath()
    .then(name=>{
        btn.show()
        putDest(auther, identifier, desc + " - " + name)
    }).catch((e)=>{
        btn.show()
        showAlert(e)
    }).finally(()=>{
        auther = null
    })
}

// storage - drive
function authGoogle() {
    authCloud("google", 'gdrive', "Google drive", GoogleStorage)
}
function logoutGoogle() {
    return chrome.identity.getAuthToken({
        interactive: false
    }).then(token => {
        return fetch("https://accounts.google.com/o/oauth2/revoke?token=" + token.token)
        .then(() => {
            return chrome.identity.removeCachedAuthToken({token: token.token})
        })
    }).then(() => {
        showAlert("已登出")
    }).catch((e) => {
        showAlert(e)
    })
}
// storage - onedrive
function authOnedrive() {
    authCloud("onedrive", 'onedrive', "OneDrive", OneDriveStorage)
}
// storage - youtube
function authYoutube() {
    authCloud("youtube", 'youtube', "Youtube Channel", YoutubeStorage)
}

function authYoutubeLive() {
    authCloud("youtube_live", 'youtube_live', "Youtube Channel (Broadcast)", YoutubeLiveStorage)
}

// message
function set_status(message) {
    return showAnim(message, document.getElementById('status'))
}
function get_status() {
    return document.getElementById('status').innerText
}

function showAnim(text, dom) {
    dom.innerText = text
    dom.style.animation=""
    setTimeout(function(){dom.style.animation="fadeIn 2s"}, 1)
}

function parseErrorMessage(message) {
    console.log(new Date())
    console.log(message)
    for (let i  = 0; i < 2; i++)
        if (typeof(message) != 'string') {
            message = message?.message
        }
    if(message == null)
        message = "發生不明錯誤"
    return message
}

function push_error(err) {
    err = parseErrorMessage(err)
    var p = push_message(err)
    p.style.color = "red"
}

function push_message(message) {
    var p = document.createElement('p')
    var date = new Date()
    p.innerText = date.toLocaleString() + " : " + message
    var parent = document.getElementById("message")
    parent.appendChild(p)
    if (parent.childElementCount > 100) {
        parent.firstChild.remove()
    }
    return p
}

// storage
function putFullDest(full_dest) {
    dest = full_dest
    document.querySelector('#dest').focus()
    document.querySelector('#dest_text').value = dest.name
}

function putDest(folder_handler, type, name) {
    return putFullDest({
        type: type,
        name: name,
        handler: folder_handler
    })
}


// twitch
function findTwitchOauthStores(stores, idx) {
    if(idx >= stores.length)
        return null
    var store = stores[idx]
    return chrome.cookies.get({
        name: "auth-token",
        url: 'https://www.twitch.tv',
        storeId: store.id
    }).then(token=>{
        if(token)
            return token.value
        else 
            return findTwitchOauthStores(stores, idx + 1)
    })
}

function getTwitchOauth() {
    return chrome.cookies.getAllCookieStores()
    .then(stores=>{
        return findTwitchOauthStores(stores, 0)
    })
}

function findTwitchOauth(interact=false) {
    var input = document.getElementById("OAuth")
    if(input.value == '' || interact) {
        return getTwitchOauth()
        .then(token=>{
            if(token)
                input.value = token
            else if(interact)
                showAlert("查無登入資料")
        })
    }
}

// message modal
function showAlert(message) {
    message = parseErrorMessage(message)
    var p = document.createElement('p')
    p.innerText = message
    showModal(p)
}

function showModal(content) {
    var modal = document.querySelector('.modal')
    modal.classList.add('active')
    modal.appendChild(content)
    
    var close = document.createElement('button')
    close.classList.add('accept')
    close.innerText = "我知道了"
    close.onclick = closeModal
    modal.appendChild(close)
    document.body.style.overflow='hidden'
}


function closeModal() {
    var modal = document.querySelector('.modal')
    document.querySelector('.modal').classList.remove('active')
    while(modal.childElementCount > 1)
        modal.children[1].remove()
    document.body.style.overflow=''
}

// misc
function preventKey(event) {
    if(event.key.length === 1)
        event.preventDefault();
}

function isRunning() {
    return downloader != null
}

function getStatusText() {
    if (downloader == null)
        return '等待設定'
    else 
        return downloader.getStatusText()
}

function edit_clip() {
    if(downloader?.decoder)
        downloader.decoder.setup_edit_clip()
    else
        showAlert("查無錄製中的直播")
}