class CloudStorage {
    constructor() {
        this.btn = null
        // list videos
        this.videos = null
        this.idx = 0
    }
    setBtn(btn) {
        this.btn = btn
    }

    // writable
    reset() {
        this.videos = null
    }

    createVideo(filename) {
        throw Error("Create File not implemented")
    }

    deleteVideo(videoID) {
        return
    }

    finishVideo(videoID) {
        return
    }

    cleanup() {
        this.btn = null
    }
}