class CloudDecoder extends Decoder {
    init_history() {
        this.historyBytes = {
            video: {
                stts: {
                    bytes: []
                },
                stss: {
                    bytes: []
                },
                ctts: {
                    bytes: []
                },
                stsc: {
                    bytes: []
                },
                stsz: {
                    bytes: []
                },
                co64: {
                    bytes: []
                },
                elst: {
                    bytes: []
                },
            },
            audio: {
                stts: {
                    bytes: []
                },
                stsc: {
                    bytes: []
                },
                stsz: {
                    bytes: []
                },
                co64: {
                    bytes: []
                },
                elst: {
                    bytes: []
                },
            },
            total_duration: 0,
            count: 0,
            mdatHead: 16
        }
    }

    _create_file() {
        var filename = this.get_filename()
        filename = filename.slice(0, -4)
        return this.folder_handler.createVideo(filename)
        .then(file_handler=>{
            file_handler.name = filename
            this.file_handler = file_handler
        })
    }

    recreate_writable() {
        this.writableStream = this.file_handler
    }

    saveFile(init_bytes, bytes) {
        return new Promise((resolve, reject)=>{
            if(this.output_type == 'mp4')
                resolve(this.writableStream.write({
                    type: "write",
                    data: new Uint8Array([0x00, 0x00, 0x00, 0x01, 0x6d, 0x64, 0x61, 0x74].concat(longToByteArray(8 + 8 + bytes.length))),
                    position: this.total_bytes_count
                }).then(()=>{
                    this.total_bytes_count += 8 + 8
                }))
            else
                resolve()
        }).then(() => {
            return this.writableStream.write({
                type: "write",
                data: bytes,
                position: this.total_bytes_count
            })
        }).then(() => {
            this.total_bytes_count += bytes.length
            this.init_bytes = init_bytes
        })
    }

    deleteFile(file_handler) {
        return this.folder_handler.deleteVideo(file_handler)
    }

    finishVideo(file_handler) {
        return this.folder_handler.finishVideo(file_handler)
    }
}