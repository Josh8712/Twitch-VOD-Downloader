class YoutubeLiveWritable extends CloudWritable {
    constructor(videoID, ingestionAddress) {
        super(ingestionAddress)
        this.videoID = videoID

        this.ts_idx = 0
        this.ts_buffer = []
    }

    write(bytes, duration) {
        this.ts_buffer.push({
            duration: duration,
            bytes: bytes
        })
    }

    flush() {
        if (this.ts_buffer.length == 0)
            return
        var target = this.ts_buffer[0]
        var m3u8 = this.build_m3u8(target['duration'])
        return fetch(this.videoUploadURL + '1.m3u8', {
            method: "POST",
            body: m3u8
        }).then(response => {
            if (response.status != 200)
                throw new Error("Cannot send stream info")
            return fetch(this.videoUploadURL + this.ts_idx + '.ts', {
                method: "POST",
                body: target['bytes']
            }).then(response => {
                if (response.status != 200)
                    throw new Error("Cannot send video")
                this.ts_idx += 1
                this.ts_buffer.shift()
                return this.flush()
            })
        })
    }

    build_m3u8(duration) {
        var file = "#EXTM3U\n"
        file += "#EXT-X-VERSION:3\n"
        file += "#EXT-X-MEDIA-SEQUENCE:" + this.ts_idx + "\n"
        file += "#EXTINF:" + duration + "\n"
        file += this.ts_idx + ".ts"
        return file
    }

    hasData() {
        return this.ts_buffer.length > 0
    }
}