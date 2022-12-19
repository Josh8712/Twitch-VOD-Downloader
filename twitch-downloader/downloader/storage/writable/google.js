class GoogleWritable extends CloudWritable {
    handleServerError(buffer) {
        return fetch(this.videoUploadURL, {
            method: 'PUT',
            headers: {
                'Content-Range': "bytes */*"
            }
        }).then(response => {
            if (response.status >= 500)
                return this.handleServerError()
            if (response.status >= 400)
                throw new Error("Upload error - " + response.status)

            for (let entry of response.headers.entries()) {
                if (entry[0] == 'range') {
                    var received = parseInt(entry[1].split('-')[1])
                    received += 1
                    var left = received - this.currentBytes
                    if (left > 0) {
                        buffer = buffer.slice(left)
                        this.currentBytes += left
                        return buffer
                    }
                    return buffer
                }
            }
            throw new Error("Unknown upload error - " + response.status)
        })
    }

    sendBytes(send_buffer, retry = 0) {
        return fetch(this.videoUploadURL, {
            method: 'PUT',
            headers: {
                'Content-Range': "bytes " + this.currentBytes + '-' + (this.currentBytes + send_buffer.length - 1) + '/*',
            },
            body: send_buffer
        }).then(response => {
            if (response.status >= 500) {
                return this.handleServerError(send_buffer)
                    .then(buffer => {
                        if (buffer.length == 0)
                            return
                        if (this.buffer == null) {
                            this.buffer = buffer
                        } else {
                            this.buffer = concatArray([buffer], [this.buffer])
                        }
                    })
            }
            if (response.status >= 400)
                throw new Error("Upload error - " + response.status)

            for (let entry of response.headers.entries()) {
                if (entry[0] == 'range') {
                    var received = parseInt(entry[1].split('-')[1])
                    received += 1
                    var left = received - this.currentBytes
                    if (left != send_buffer.length) {
                        var remaining = send_buffer.slice(left)
                        if (this.buffer) {
                            this.buffer = concatArray([remaining], [this.buffer])
                        } else
                            this.buffer = remaining
                    }
                    this.currentBytes += left
                    return
                }
            }
            throw new Error("Unknown Upload error - " + response.status)
        }).catch(e => {
            if (retry < 3) {
                return this.handleServerError(send_buffer)
                    .then((buffer) => {
                        return this.sendBytes(buffer, retry + 1)
                    })
            }
            throw e
        })
    }

    write(bytes) {
        bytes = bytes.data
        return new Promise((resolve, reject) => {
            if (this.isSending) {
                if (this.pendingBuffer) {
                    this.pendingBuffer.push(bytes)
                } else
                    this.pendingBuffer = [bytes]
                return resolve()
            }
            if (this.getError)
                throw new Error("Unable to upload")

            if (this.pendingBuffer) {
                bytes = concatArray(this.pendingBuffer, [bytes])
                this.pendingBuffer = null
            }
            if (this.buffer) {
                bytes = concatArray([this.buffer], [bytes])
                this.buffer = null
            }
            var count = bytes.length
            count -= (count % (512 * 512))
            if (count <= 0) {
                this.buffer = bytes
                return resolve()
            }
            this.isSending = true
            resolve()
            var send_buffer = bytes
            if (count != bytes.length) {
                send_buffer = bytes.slice(0, count)
                this.buffer = bytes.slice(count)
            }

            this.sendBytes(send_buffer)
                .catch((e) => {
                    push_error(e)
                    this.getError = true
                }).finally(() => {
                    this.isSending = false
                    if (this.closingResovlePair) {
                        this.close()
                            .then((id) => {
                                this.closingResovlePair[0](id)
                            }).catch(e => {
                                this.closingResovlePair[1](e)
                            })
                    }
                })
        })
    }

    _close(remaining) {
        if (remaining) {
            return fetch(this.videoUploadURL, {
                method: 'PUT',
                headers: {
                    'Content-Range': "bytes " + this.currentBytes + '-' + (this.currentBytes + remaining.length - 1) + '/' + (this.currentBytes + remaining.length),
                },
                body: remaining
            })
        } else {
            return fetch(this.videoUploadURL, {
                method: 'PUT',
                headers: {
                    'Content-Range': 'bytes */' + this.currentBytes,
                }
            })
        }
    }

    close() {
        return new Promise((resolve, reject) => {
            if (this.isSending) {
                this.closingResovlePair = [resolve, reject]
                return
            }

            if (this.getError)
                throw new Error("無法輸出影片")

            var count = 0
            var remaining = null

            if (this.buffer)
                count += this.buffer.length
            if (this.pendingBuffer) {
                this.pendingBuffer.forEach(buffer => {
                    count += buffer.length
                })
            }

            if (count > 0) {
                var new_buffer = new Uint8Array(count)
                var offset = 0
                if (this.buffer) {
                    new_buffer.set(this.buffer, offset)
                    offset += this.buffer.length
                }
                if (this.pendingBuffer) {
                    this.pendingBuffer.forEach(buffer => {
                        new_buffer.set(buffer, offset)
                        offset += buffer.length
                    })
                }
                remaining = new_buffer
                this.pendingBuffer = null
                this.buffer = remaining
            }

            resolve(this._close(remaining)
                .then(response => {
                    if (response.status >= 500)
                        return this.handleServerError(remaining)
                            .then(buffer => {
                                if (buffer.length == 0)
                                    return
                                this.buffer = remaining
                                return this.close()
                            })

                    if (response.status >= 200 && response.status < 300) {
                        return response.json()
                            .then(body => {
                                if (body.id) {
                                    this.videoID = body.id
                                    return body.id
                                } else
                                    throw new Error("Unable to find video id")
                            })
                    }
                    throw new Error("Unable to close video")
                }))
        })
    }
}