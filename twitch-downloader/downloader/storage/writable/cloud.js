function concatArray(arr1, arr2) {
    var arr = arr1.concat(arr2)
    var size = 0
    arr.forEach(e => {
        size += e.length
    })
    var new_array = new Uint8Array(size)
    var offset = 0
    arr.forEach(e => {
        new_array.set(e, offset)
        offset += e.length
    })
    return new_array
}

class CloudWritable {
    constructor(videoUploadURL) {
        // uploading
        this.videoID = null
        this.videoUploadURL = videoUploadURL

        // current
        this.currentBytes = 0
        this.buffer = null

        this.isSending = false
        this.closingResovlePair = false
        this.getError = false
        this.pendingBuffer = null
    }
    // writable
    reset() {
        this.videoID = null
        this.videoUploadURL = null

        this.currentBytes = 0
        this.buffer = null

        this.isSending = false
        this.closingResovlePair = false
        this.getError = false
        this.pendingBuffer = null
    }

    write(bytes) {
        throw new Error("Not implemented")
    }

    close() {
        throw new Error("Not implemented")
    }

    hasData() {
        return true
    }
}