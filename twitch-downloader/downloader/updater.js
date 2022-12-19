var version = 'v0.0.1'
var changeLogURL = "https://raw.githubusercontent.com/Josh8712/Twitch-VOD-Downloader/master/changelog"
function chech_update() {
    fetch(changeLogURL + "?time=" + new Date().getTime())
    .then(response=>{
        if(response.status == 200)
            return response.text()
        throw new Error()
    }).then(body=>{
        var change = parseChange(body)
        if(change) {
            show_update(change)
        }
    }).catch(()=>{

    }).finally(()=>{
        setTimeout(chech_update, 1 * 24 * 60 * 60 * 1000)
    })
}

function parseChange(body) {
    var lines = body.split('\n')
    if(lines.length > 0 && lines[0].trim() == version)
        return
    var change = []
    for(var i = 0; i < lines.length; i++)
        if(lines[i].length == 0) {
            if(i + 2 >= lines.length)
                break
            if(lines[i + 1] == version)
                break
            i += 2
            continue
        } else {
            change.push(lines[i])
        }
    if(change.length > 0)
        return change.join('<br>')
    return null
}

function show_update(change) {
    document.getElementById("update").style.display=""
    document.querySelector("#update p").innerHTML = change
}

document.addEventListener("DOMContentLoaded", function(){
    chech_update()
    document.querySelector('#update button[class=close]').addEventListener('click', function(){
        document.querySelector("#update button").click()
    });
    document.querySelector("#update button").onclick = function(e) {
        e.target.style.animation = "auto"
        var container = document.querySelector("#update div")
        if(container.style.display == "")
            container.style.display = "none"
        else
            container.style.display = ""
    }
});
