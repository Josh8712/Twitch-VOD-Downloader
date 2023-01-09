var ts_list = []
var curWidth = 100
var curMargin = 0

sourceBuffer = null
mediaSource = null

function get_total_sec() {
    var sec = 0
    ts_list.forEach(item => {
        sec += item.duration
    });
    return Math.ceil(sec)
}

function round_second(target) {
    var sec = 0
    for (let index = 0; index < ts_list.length; index++) {
        const element = ts_list[index];
        if( sec + element.duration > target )
            return Math.round(sec)
        sec += element.duration
    }
    return Math.round(sec)
}

function findIndex(sec) {
    var idx = 0
    var cur = 0
    while(idx < ts_list.length) {
        if(ts_list[idx].duration + cur > sec)
            break
        cur += ts_list[idx].duration
        idx += 1
    }
    return idx
}

function to_iso(sec){
    var from = new Date(0);
    from.setSeconds(Math.floor(sec));
    return from.toISOString().substring(11, 19)
}

function update_timeline() {
    elem = document.querySelector('.clips-editor-slider-popover')
   
    var total_sec = get_total_sec()
    var from_sec = round_second( curMargin / 100 * total_sec) 
    var to_sec = round_second( (curMargin + curWidth) / 100 * total_sec) 
    
    elem.innerHTML = `
        <p>${to_iso(from_sec)} - ${to_iso(to_sec)} / ${to_iso(total_sec)}</p>
    `
    document.getElementById('seekbar_text').innerText = to_iso(video.currentTime) + ' / ' + to_iso(total_sec)
    seekbar.max = total_sec
    seekbar.value = Math.floor(video.currentTime)
}

function setup_video() {
    var receiving = true
    var curidx = -1
    video = document.querySelector('video')
    seekbar = document.querySelector('.seekbar')
    mediaSource = new MediaSource()
    mediaSource.addEventListener('sourceopen', sourceOpen);
    function sourceOpen() {
        try {
            var mime = 'video/mp4; codecs="avc1.64002A,mp4a.40.2"'
            sourceBuffer = mediaSource.addSourceBuffer(mime);
            sourceBuffer.onupdateend = function () {
                try {
                    update_timeline()
                    push()
                } catch (e) {
    
                }
            }
        } catch (e) {
        }
    }
    function isVideoInBuffer() {
        var max_time = 0
        var inRange = false
        for (i = 0; i < sourceBuffer.buffered.length; i++) {
            if (sourceBuffer.buffered.end(i) > max_time)
                max_time = sourceBuffer.buffered.end(i)
            if (sourceBuffer.buffered.start(i) < video.currentTime
                && sourceBuffer.buffered.end(i) > video.currentTime) {
                    inRange = true
            }
        }
        return {
            max_time: max_time,
            inRange: inRange
        }
    }
    
    video.src = URL.createObjectURL(mediaSource)
    video.onseeking = function (e) {
        if(mediaSource == null || sourceBuffer == null)
            return
        try {
            var isIn = isVideoInBuffer()
            var max_time = isIn.max_time
            curidx = findIndex(video.currentTime)
            if (max_time > video.currentTime + 120)
                sourceBuffer.remove(video.currentTime + 120, max_time)
            if (video.currentTime - 120 > 0)
                sourceBuffer.remove(0, video.currentTime - 120)
        } catch (e) {

        }
    }
    video.ontimeupdate = function (e) {
        if(mediaSource == null || sourceBuffer == null)
            return
        try {
            var total_sec = get_total_sec()        
            var from_sec = round_second( curMargin / 100 * total_sec)
            var to_sec = round_second( (curMargin + curWidth) / 100 * total_sec)
    
            if (video.currentTime > to_sec || video.currentTime < from_sec) {
                if(Math.abs(video.currentTime - from_sec) > 0.2)
                    video.currentTime = from_sec
            }
            var isIn = isVideoInBuffer()
            if(!isIn.inRange)
                curidx = findIndex(video.currentTime)
            document.getElementById('seekbar_text').innerText = to_iso(video.currentTime) + ' / ' + to_iso(total_sec)
            seekbar.max = total_sec
            seekbar.value = Math.floor(video.currentTime)
        } catch (e) {

        }
    }

    seekbar.oninput = function (e) {
        video.currentTime = e.target.value
    }
    
    function push() {
        if (sourceBuffer.updating)
            return
        var max_time = 0
        for (i = 0; i < sourceBuffer.buffered.length; i++) {
            if (sourceBuffer.buffered.end(i) > max_time)
                max_time = sourceBuffer.buffered.end(i)
            if (sourceBuffer.buffered.start(i) < video.currentTime
                && sourceBuffer.buffered.end(i) > video.currentTime) {
                if (video.currentTime + 10 < sourceBuffer.buffered.end(i))
                    return 
            }
        }

        var idx = 0
        while (idx < ts_list.length) {
            let item = ts_list[idx]
            if (item.id > curidx) {
                if (!sourceBuffer.updating) {
                    if (idx == 1) {
                        transmuxer.off('data');
                        transmuxer.on('data', (segment) => {
                            sourceBuffer.appendBuffer(new Uint8Array(segment.data));
                        })
                    }
                    transmuxer.push(item.data);
                    transmuxer.flush();
                    curidx = item.id
                    return
                }
            }
            idx += 1
        }
        if (sourceBuffer.updating)
            return
        if (!receiving && mediaSource.readyState == 'open') {
            mediaSource.endOfStream()
        }
    }
    setInterval(function () {
        push()
    }, 1000)
    let transmuxer = new muxjs.Transmuxer();
    transmuxer.on('data', (segment) => {
        let data = new Uint8Array(segment.initSegment.byteLength + segment.data.byteLength);
        data.set(segment.initSegment, 0);
        data.set(segment.data, segment.initSegment.byteLength);
        sourceBuffer.appendBuffer(data);
    })

    document.getElementById('stop').onclick = function () {
        document.getElementById('stop').style.display = 'none'
        document.getElementById('download').style.display = ''
        receiving = false
    }
    window.addEventListener('message', function (e) {
        if (!receiving)
            return push()
        if (e.origin !== 'chrome-extension://mlhmpagaiacpiakagjbggabdbbngnhgm' && e.origin !== 'https://www.twitch.tv')
            return;
        let segment = e.data;
        if (segment?.message == 'hello') {
            if (window?.opener?.postMessage)
                window.opener.postMessage({ message: segment?.id }, '*')
            return
        }
        var id = segment.id
        var duration = segment.duration
        var data = new Uint8Array(segment.data)
        var pos = ts_list.length - 1
        while (pos > 0 && ts_list.length > 0) {
            if (ts_list[pos].id < id)
                break
            pos -= 1
        }
        ts_list.splice(pos + 1, 0, { id: id, data: data, duration: duration })
        var sum = 0
        ts_list.forEach(i=>{
            sum += i.data.length
        })
        document.getElementById('mem').innerText = humanFileSize(sum)
        update_timeline()
        push()
    });

    document.getElementById('download').onclick = async function (e) {
        e.target.style.display = "none"
        document.getElementById('check_loader').style.display = ""
        try {
            var total_sec = get_total_sec()        
            var from_sec = round_second(curMargin / 100 * total_sec)
            var to_sec = round_second((curMargin + curWidth) / 100 * total_sec)
            from_sec = findIndex(from_sec)
            to_sec = findIndex(to_sec)
            var duration = 0
            for(i = from_sec; i < to_sec; i++) {
                duration += ts_list[i].duration
            }
            if(from_sec == to_sec) {
                return alert('影片長度不能等於0')
            }
            let file = await window.showSaveFilePicker({ types: [{
                description: 'mp4',
                accept: {'video/mp4': ['.mp4']},
            }],})
            let writeable = await file.createWritable()
            let transmuxer = new muxjs.Transmuxer();
            muxjs.generator.duration = duration * 90000
            var start = 0
            transmuxer.on('data', (segment) => {
                if(start == 0) {
                    writeable.write(segment.initSegment)
                    start = 1
                }
                writeable.write(segment.data);
            })
            for(i = from_sec; i < to_sec; i++) {
                transmuxer.push(ts_list[i].data)
                transmuxer.flush()
            }
            await writeable.close()
            alert('輸出成功')
        } catch{
            alert('輸出失敗')
        }
        e.target.style.display = ""
        document.getElementById('check_loader').style.display = "none"
    }
}

function update_grabber() {
    left.style.left = curMargin + "%"
    mid.style.marginLeft = curMargin + "%"
    mid.style.width = curWidth + "%"
    right.style.right = (100 - curMargin - curWidth) + "%"
    update_timeline()
}

function setup_timeline() {
    left = document.querySelector('.draggable-slider-handle--left')
    right = document.querySelector('.draggable-slider-handle--right')
    mid = document.querySelector('.draggable-slider__overlay--mid')
    holder = document.querySelector('.slider-holder')

    let scrollLeft = false
    let scrollRight = false
    let scrollMid = false
    let startPoint, startOffset, startWidth
    left.addEventListener('mousedown', function () {
        scrollLeft = true
    })
    right.addEventListener('mousedown', function () {
        scrollRight = true
    })
    mid.addEventListener('mousedown', function () {
        scrollMid = true
    })

    holder.addEventListener('mousedown', function (event) {
        startPoint = event.x
        startOffset = curMargin
        startWidth = curWidth
    })
    holder.addEventListener('mousemove', function (event) {
        var offset = (event.x - startPoint) / holder.clientWidth * 100
        if (scrollMid) {
            var target = (startOffset + offset) % 100
            if (target + startWidth > 100)
                target = 100 - startWidth
            if (target < 0)
                target = 0
            curMargin = target
            update_grabber()
        }
        if (scrollLeft) {
            var targetWidth = startWidth - offset
            var targetMargin = startOffset + offset
            if (targetMargin < 0) {
                targetWidth += targetMargin
                targetMargin = 0
            }
            if (targetWidth < 0) {
                targetMargin += targetWidth
                targetWidth = 0
            }
            if (targetMargin > 100)
                targetMargin = 100
            if (targetWidth > 100)
                targetWidth = 100

            curMargin = targetMargin
            curWidth = targetWidth
            update_grabber()
        }
        if (scrollRight) {
            var target = startWidth + offset
            if (target < 0)
                target = 0
            if(target + curMargin > 100)
                target = 100 - curMargin
            curWidth = target
            update_grabber()
        }
    })
    holder.addEventListener('mouseleave', function (event) {
        if (scrollLeft && event.clientX < 50) {
            curWidth += curMargin
            curMargin = 0
            update_grabber()
        }
        if (scrollRight && event.clientX > holder.offsetLeft + holder.clientWidth) {
            curWidth = 100 - curMargin
            update_grabber()
        }
    });
    function exit() {
        scrollLeft = false
        scrollRight = false
        scrollMid = false
        update_timeline()
    }
    document.addEventListener('mouseleave', exit);
    document.addEventListener('mouseup', exit);
}

document.addEventListener("DOMContentLoaded", function () {
    setup_timeline()
    setup_video()
    var video = document.querySelector('video')
    document.getElementById('screenshot').onclick = function (e) {
        var filename = new Date().toTimeString().split(' ')[0]
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
})

function humanFileSize(bytes, si=false, dp=1) {
    const thresh = si ? 1000 : 1024;
  
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
  
    const units = si 
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10**dp;
  
    do {
      bytes /= thresh;
      ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
  
  
    return bytes.toFixed(dp) + ' ' + units[u];
  }