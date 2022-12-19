/**
 * mux.js
 *
 * Copyright (c) Brightcove
 * Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
 *
 * A lightweight readable stream implemention that handles event dispatching.
 * Objects that inherit from streams should call init in their constructors.
 */

var Stream = function Stream() {
    this.init = function () {
        var listeners = {};
        /**
         * Add a listener for a specified event type.
         * @param type {string} the event name
         * @param listener {function} the callback to be invoked when an event of
         * the specified type occurs
         */

        this.on = function (type, listener) {
            if (!listeners[type]) {
                listeners[type] = [];
            }

            listeners[type] = listeners[type].concat(listener);
        };
        /**
         * Remove a listener for a specified event type.
         * @param type {string} the event name
         * @param listener {function} a function previously registered for this
         * type of event through `on`
         */


        this.off = function (type, listener) {
            var index;

            if (!listeners[type]) {
                return false;
            }

            index = listeners[type].indexOf(listener);
            listeners[type] = listeners[type].slice();
            listeners[type].splice(index, 1);
            return index > -1;
        };
        /**
         * Trigger an event of the specified type on this stream. Any additional
         * arguments to this function are passed as parameters to event listeners.
         * @param type {string} the event name
         */


        this.trigger = function (type) {
            var callbacks, i, length, args;
            callbacks = listeners[type];

            if (!callbacks) {
                return;
            } // Slicing the arguments on every invocation of this method
            // can add a significant amount of overhead. Avoid the
            // intermediate object creation for the common case of a
            // single callback argument


            if (arguments.length === 2) {
                length = callbacks.length;

                for (i = 0; i < length; ++i) {
                    callbacks[i].call(this, arguments[1]);
                }
            } else {
                args = [];
                i = arguments.length;

                for (i = 1; i < arguments.length; ++i) {
                    args.push(arguments[i]);
                }

                length = callbacks.length;

                for (i = 0; i < length; ++i) {
                    callbacks[i].apply(this, args);
                }
            }
        };
        /**
         * Destroys the stream and cleans up.
         */


        this.dispose = function () {
            listeners = {};
        };
    };
};
/**
 * Forwards all `data` events on this stream to the destination stream. The
 * destination stream should provide a method `push` to receive the data
 * events as they arrive.
 * @param destination {stream} the stream that will receive all `data` events
 * @param autoFlush {boolean} if false, we will not call `flush` on the destination
 *                            when the current stream emits a 'done' event
 * @see http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
 */


Stream.prototype.pipe = function (destination) {
    this.on('data', function (data) {
        destination.push(data);
    });
    this.on('done', function (flushSource) {
        destination.flush(flushSource);
    });
    this.on('partialdone', function (flushSource) {
        destination.partialFlush(flushSource);
    });
    this.on('endedtimeline', function (flushSource) {
        destination.endTimeline(flushSource);
    });
    this.on('reset', function (flushSource) {
        destination.reset(flushSource);
    });
    return destination;
}; // Default stream functions that are expected to be overridden to perform
// actual work. These are provided by the prototype as a sort of no-op
// implementation so that we don't have to check for their existence in the
// `pipe` function above.


Stream.prototype.push = function (data) {
    this.trigger('data', data);
};

Stream.prototype.flush = function (flushSource) {
    this.trigger('done', flushSource);
};

Stream.prototype.partialFlush = function (flushSource) {
    this.trigger('partialdone', flushSource);
};

Stream.prototype.endTimeline = function (flushSource) {
    this.trigger('endedtimeline', flushSource);
};

Stream.prototype.reset = function (flushSource) {
    this.trigger('reset', flushSource);
};
var stream = Stream;

_Transmuxer$1 = function Transmuxer(options) {
    var self = this,
        hasFlushed = true,
        videoTrack,
        audioTrack;

    _Transmuxer$1.prototype.init.call(this);

    options = options || {};
    this.baseMediaDecodeTime = options.baseMediaDecodeTime || 0;
    this.transmuxPipeline_ = {};
    this.push = function (data) {
        if (hasFlushed) {
            this.setupTsPipeline();
            hasFlushed = false;
        }

        this.transmuxPipeline_.headOfPipeline.push(data);
    }; // flush any buffered data
    this.flush = function (historyBytes) {
        hasFlushed = true; // Start at the top of the pipeline and flush all pending work
        this.transmuxPipeline_.coalesceStream.setHistory(historyBytes)
        this.transmuxPipeline_.headOfPipeline.flush();
    }

    this.setupTsPipeline = function () {
        var pipeline = {};
        this.transmuxPipeline_ = pipeline;
        pipeline.type = 'ts';

        pipeline.packetStream = new m2ts_1.TransportPacketStream();
        pipeline.parseStream = new m2ts_1.TransportParseStream();
        pipeline.elementaryStream = new m2ts_1.ElementaryStream();
        pipeline.adtsStream = new adts();
        pipeline.h264Stream = new _H264Stream();
        pipeline.coalesceStream = new _CoalesceStream(options);
        pipeline.headOfPipeline = pipeline.packetStream; // disassemble MPEG2-TS packets into elementary streams

        pipeline.packetStream.pipe(pipeline.parseStream).pipe(pipeline.elementaryStream) // !!THIS ORDER IS IMPORTANT!!
        // demux the streams
        pipeline.elementaryStream.pipe(pipeline.h264Stream)
        pipeline.elementaryStream.pipe(pipeline.adtsStream);

        pipeline.elementaryStream.on('data', function (data) {
            var i;
            if (data.type === 'metadata') {
                i = data.tracks.length; // scan the tracks listed in the metadata

                while (i--) {
                    if (!videoTrack && data.tracks[i].type === 'video') {
                        videoTrack = data.tracks[i];
                        videoTrack.timelineStartInfo.baseMediaDecodeTime = self.baseMediaDecodeTime;
                    } else if (!audioTrack && data.tracks[i].type === 'audio') {
                        audioTrack = data.tracks[i];
                        audioTrack.timelineStartInfo.baseMediaDecodeTime = self.baseMediaDecodeTime;
                    }
                } // hook up the video segment stream to the first track with h264 data


                if (videoTrack && !pipeline.videoSegmentStream) {
                    pipeline.coalesceStream.numberOfTracks++;
                    pipeline.videoSegmentStream = new _VideoSegmentStream$1(videoTrack, options);
                    pipeline.videoSegmentStream.on('baseMediaDecodeTime', function (baseMediaDecodeTime) {
                        if (audioTrack) {
                            pipeline.audioSegmentStream.setVideoBaseMediaDecodeTime(baseMediaDecodeTime);
                        }
                    });

                    pipeline.h264Stream.pipe(pipeline.videoSegmentStream).pipe(pipeline.coalesceStream);
                }

                if (audioTrack && !pipeline.audioSegmentStream) {
                    // hook up the audio segment stream to the first track with aac data
                    pipeline.coalesceStream.numberOfTracks++;
                    pipeline.audioSegmentStream = new _AudioSegmentStream$1(audioTrack, options);
                    pipeline.adtsStream.pipe(pipeline.audioSegmentStream).pipe(pipeline.coalesceStream);
                } // emit pmt info
            }
        }); // Re-emit any data coming from the coalesce stream to the outside world
        pipeline.coalesceStream.on('data', this.trigger.bind(this, 'data'));
        pipeline.coalesceStream.on('done', this.trigger.bind(this, 'done'));
    };

    this.endTimeline = function () {
        this.transmuxPipeline_.headOfPipeline.endTimeline();
    };
    this.reset = function () {
        if (this.transmuxPipeline_.headOfPipeline) {
            this.transmuxPipeline_.headOfPipeline.reset();
        }
    }; // Caption data has to be reset when seeking outside buffered range
    this.resetCaptions = function () {
        if (this.transmuxPipeline_.captionStream) {
            this.transmuxPipeline_.captionStream.reset();
        }
    };
};
_Transmuxer$1.prototype = new stream();
Transmuxer = _Transmuxer$1
//
var MP2T_PACKET_LENGTH$1 = 188,
    // bytes
    SYNC_BYTE$1 = 0x47;

var streamTypes = {
    H264_STREAM_TYPE: 0x1B,
    ADTS_STREAM_TYPE: 0x0F,
    METADATA_STREAM_TYPE: 0x15
};
// PacketStream
/**
 * Splits an incoming stream of binary data into MPEG-2 Transport
 * Stream packets.
 */

_TransportPacketStream = function TransportPacketStream() {
    var buffer = new Uint8Array(MP2T_PACKET_LENGTH$1),
        bytesInBuffer = 0;

    _TransportPacketStream.prototype.init.call(this); // Deliver new bytes to the stream.

    /**
     * Split a stream of data into M2TS packets
     **/


    this.push = function (bytes) {
        var startIndex = 0,
            endIndex = MP2T_PACKET_LENGTH$1,
            everything; // If there are bytes remaining from the last segment, prepend them to the
        // bytes that were pushed in

        if (bytesInBuffer) {
            everything = new Uint8Array(bytes.byteLength + bytesInBuffer);
            everything.set(buffer.subarray(0, bytesInBuffer));
            everything.set(bytes, bytesInBuffer);
            bytesInBuffer = 0;
        } else {
            everything = bytes;
        } // While we have enough data for a packet


        while (endIndex < everything.byteLength) {
            // Look for a pair of start and end sync bytes in the data..
            if (everything[startIndex] === SYNC_BYTE$1 && everything[endIndex] === SYNC_BYTE$1) {
                // We found a packet so emit it and jump one whole packet forward in
                // the stream
                this.trigger('data', everything.subarray(startIndex, endIndex));
                startIndex += MP2T_PACKET_LENGTH$1;
                endIndex += MP2T_PACKET_LENGTH$1;
                continue;
            } // If we get here, we have somehow become de-synchronized and we need to step
            // forward one byte at a time until we find a pair of sync bytes that denote
            // a packet


            startIndex++;
            endIndex++;
        } // If there was some data left over at the end of the segment that couldn't
        // possibly be a whole packet, keep it because it might be the start of a packet
        // that continues in the next segment


        if (startIndex < everything.byteLength) {
            buffer.set(everything.subarray(startIndex), 0);
            bytesInBuffer = everything.byteLength - startIndex;
        }
    };
    /**
     * Passes identified M2TS packets to the TransportParseStream to be parsed
     **/


    this.flush = function () {
        // If the buffer contains a whole packet when we are being flushed, emit it
        // and empty the buffer. Otherwise hold onto the data because it may be
        // important for decoding the next segment
        if (bytesInBuffer === MP2T_PACKET_LENGTH$1 && buffer[0] === SYNC_BYTE$1) {
            this.trigger('data', buffer);
            bytesInBuffer = 0;
        }

        this.trigger('done');
    };

    this.endTimeline = function () {
        this.flush();
        this.trigger('endedtimeline');
    };

    this.reset = function () {
        bytesInBuffer = 0;
        this.trigger('reset');
    };
};

_TransportPacketStream.prototype = new stream();

// Parse stream
/**
 * Accepts an MP2T TransportPacketStream and emits data events with parsed
 * forms of the individual transport stream packets.
 */

_TransportParseStream = function TransportParseStream() {
    var parsePsi, parsePat, parsePmt, self;

    _TransportParseStream.prototype.init.call(this);

    self = this;
    this.packetsWaitingForPmt = [];
    this.programMapTable = undefined;

    parsePsi = function parsePsi(payload, psi) {
        var offset = 0; // PSI packets may be split into multiple sections and those
        // sections may be split into multiple packets. If a PSI
        // section starts in this packet, the payload_unit_start_indicator
        // will be true and the first byte of the payload will indicate
        // the offset from the current position to the start of the
        // section.

        if (psi.payloadUnitStartIndicator) {
            offset += payload[offset] + 1;
        }

        if (psi.type === 'pat') {
            parsePat(payload.subarray(offset), psi);
        } else {
            parsePmt(payload.subarray(offset), psi);
        }
    };

    parsePat = function parsePat(payload, pat) {
        pat.section_number = payload[7]; // eslint-disable-line camelcase

        pat.last_section_number = payload[8]; // eslint-disable-line camelcase
        // skip the PSI header and parse the first PMT entry

        self.pmtPid = (payload[10] & 0x1F) << 8 | payload[11];
        pat.pmtPid = self.pmtPid;
    };
    /**
     * Parse out the relevant fields of a Program Map Table (PMT).
     * @param payload {Uint8Array} the PMT-specific portion of an MP2T
     * packet. The first byte in this array should be the table_id
     * field.
     * @param pmt {object} the object that should be decorated with
     * fields parsed from the PMT.
     */


    parsePmt = function parsePmt(payload, pmt) {
        var sectionLength, tableEnd, programInfoLength, offset; // PMTs can be sent ahead of the time when they should actually
        // take effect. We don't believe this should ever be the case
        // for HLS but we'll ignore "forward" PMT declarations if we see
        // them. Future PMT declarations have the current_next_indicator
        // set to zero.

        if (!(payload[5] & 0x01)) {
            return;
        } // overwrite any existing program map table


        self.programMapTable = {
            video: null,
            audio: null,
            'timed-metadata': {}
        }; // the mapping table ends at the end of the current section

        sectionLength = (payload[1] & 0x0f) << 8 | payload[2];
        tableEnd = 3 + sectionLength - 4; // to determine where the table is, we have to figure out how
        // long the program info descriptors are

        programInfoLength = (payload[10] & 0x0f) << 8 | payload[11]; // advance the offset to the first entry in the mapping table

        offset = 12 + programInfoLength;

        while (offset < tableEnd) {
            var streamType = payload[offset];
            var pid = (payload[offset + 1] & 0x1F) << 8 | payload[offset + 2]; // only map a single elementary_pid for audio and video stream types
            // TODO: should this be done for metadata too? for now maintain behavior of
            //       multiple metadata streams

            if (streamType === streamTypes.H264_STREAM_TYPE && self.programMapTable.video === null) {
                self.programMapTable.video = pid;
            } else if (streamType === streamTypes.ADTS_STREAM_TYPE && self.programMapTable.audio === null) {
                self.programMapTable.audio = pid;
            } else if (streamType === streamTypes.METADATA_STREAM_TYPE) {
                // map pid to stream type for metadata streams
                self.programMapTable['timed-metadata'][pid] = streamType;
            } // move to the next table entry
            // skip past the elementary stream descriptors, if present


            offset += ((payload[offset + 3] & 0x0F) << 8 | payload[offset + 4]) + 5;
        } // record the map on the packet as well


        pmt.programMapTable = self.programMapTable;
    };
    /**
     * Deliver a new MP2T packet to the next stream in the pipeline.
     */


    this.push = function (packet) {
        var result = {},
            offset = 4;
        result.payloadUnitStartIndicator = !!(packet[1] & 0x40); // pid is a 13-bit field starting at the last bit of packet[1]

        result.pid = packet[1] & 0x1f;
        result.pid <<= 8;
        result.pid |= packet[2]; // if an adaption field is present, its length is specified by the
        // fifth byte of the TS packet header. The adaptation field is
        // used to add stuffing to PES packets that don't fill a complete
        // TS packet, and to specify some forms of timing and control data
        // that we do not currently use.

        if ((packet[3] & 0x30) >>> 4 > 0x01) {
            offset += packet[offset] + 1;
        } // parse the rest of the packet based on the type


        if (result.pid === 0) {
            result.type = 'pat';
            parsePsi(packet.subarray(offset), result);
            this.trigger('data', result);
        } else if (result.pid === this.pmtPid) {
            result.type = 'pmt';
            parsePsi(packet.subarray(offset), result);
            this.trigger('data', result); // if there are any packets waiting for a PMT to be found, process them now

            while (this.packetsWaitingForPmt.length) {
                this.processPes_.apply(this, this.packetsWaitingForPmt.shift());
            }
        } else if (this.programMapTable === undefined) {
            // When we have not seen a PMT yet, defer further processing of
            // PES packets until one has been parsed
            this.packetsWaitingForPmt.push([packet, offset, result]);
        } else {
            this.processPes_(packet, offset, result);
        }
    };

    this.processPes_ = function (packet, offset, result) {
        // set the appropriate stream type
        if (result.pid === this.programMapTable.video) {
            result.streamType = streamTypes.H264_STREAM_TYPE;
        } else if (result.pid === this.programMapTable.audio) {
            result.streamType = streamTypes.ADTS_STREAM_TYPE;
        } else {
            // if not video or audio, it is timed-metadata or unknown
            // if unknown, streamType will be undefined
            result.streamType = this.programMapTable['timed-metadata'][result.pid];
        }

        result.type = 'pes';
        result.data = packet.subarray(offset);
        this.trigger('data', result);
    };
};

_TransportParseStream.prototype = new stream();
_TransportParseStream.STREAM_TYPES = {
    h264: 0x1b,
    adts: 0x0f
};

/**
 * Reconsistutes program elementary stream (PES) packets from parsed
 * transport stream packets. That is, if you pipe an
 * mp2t.TransportParseStream into a mp2t.ElementaryStream, the output
 * events will be events which capture the bytes for individual PES
 * packets plus relevant metadata that has been extracted from the
 * container.
 */

_ElementaryStream = function ElementaryStream() {
    var self = this,
        segmentHadPmt = false,
        // PES packet fragments
        video = {
            data: [],
            size: 0
        },
        audio = {
            data: [],
            size: 0
        },
        timedMetadata = {
            data: [],
            size: 0
        },
        programMapTable,
        parsePes = function parsePes(payload, pes) {
            var ptsDtsFlags;
            var startPrefix = payload[0] << 16 | payload[1] << 8 | payload[2]; // default to an empty array

            pes.data = new Uint8Array(); // In certain live streams, the start of a TS fragment has ts packets
            // that are frame data that is continuing from the previous fragment. This
            // is to check that the pes data is the start of a new pes payload

            if (startPrefix !== 1) {
                return;
            } // get the packet length, this will be 0 for video


            pes.packetLength = 6 + (payload[4] << 8 | payload[5]); // find out if this packets starts a new keyframe

            pes.dataAlignmentIndicator = (payload[6] & 0x04) !== 0; // PES packets may be annotated with a PTS value, or a PTS value
            // and a DTS value. Determine what combination of values is
            // available to work with.

            ptsDtsFlags = payload[7]; // PTS and DTS are normally stored as a 33-bit number.  Javascript
            // performs all bitwise operations on 32-bit integers but javascript
            // supports a much greater range (52-bits) of integer using standard
            // mathematical operations.
            // We construct a 31-bit value using bitwise operators over the 31
            // most significant bits and then multiply by 4 (equal to a left-shift
            // of 2) before we add the final 2 least significant bits of the
            // timestamp (equal to an OR.)

            if (ptsDtsFlags & 0xC0) {
                // the PTS and DTS are not written out directly. For information
                // on how they are encoded, see
                // http://dvd.sourceforge.net/dvdinfo/pes-hdr.html
                pes.pts = (payload[9] & 0x0E) << 27 | (payload[10] & 0xFF) << 20 | (payload[11] & 0xFE) << 12 | (payload[12] & 0xFF) << 5 | (payload[13] & 0xFE) >>> 3;
                pes.pts *= 4; // Left shift by 2

                pes.pts += (payload[13] & 0x06) >>> 1; // OR by the two LSBs

                pes.dts = pes.pts;

                if (ptsDtsFlags & 0x40) {
                    pes.dts = (payload[14] & 0x0E) << 27 | (payload[15] & 0xFF) << 20 | (payload[16] & 0xFE) << 12 | (payload[17] & 0xFF) << 5 | (payload[18] & 0xFE) >>> 3;
                    pes.dts *= 4; // Left shift by 2

                    pes.dts += (payload[18] & 0x06) >>> 1; // OR by the two LSBs
                }
            } // the data section starts immediately after the PES header.
            // pes_header_data_length specifies the number of header bytes
            // that follow the last byte of the field.


            pes.data = payload.subarray(9 + payload[8]);
        },

        /**
         * Pass completely parsed PES packets to the next stream in the pipeline
         **/
        flushStream = function flushStream(stream, type, forceFlush) {
            var packetData = new Uint8Array(stream.size),
                event = {
                    type: type
                },
                i = 0,
                offset = 0,
                packetFlushable = false,
                fragment; // do nothing if there is not enough buffered data for a complete
            // PES header

            if (!stream.data.length || stream.size < 9) {
                return;
            }

            event.trackId = stream.data[0].pid; // reassemble the packet

            for (i = 0; i < stream.data.length; i++) {
                fragment = stream.data[i];
                packetData.set(fragment.data, offset);
                offset += fragment.data.byteLength;
            } // parse assembled packet's PES header


            parsePes(packetData, event); // non-video PES packets MUST have a non-zero PES_packet_length
            // check that there is enough stream data to fill the packet

            packetFlushable = type === 'video' || event.packetLength <= stream.size; // flush pending packets if the conditions are right

            if (forceFlush || packetFlushable) {
                stream.size = 0;
                stream.data.length = 0;
            } // only emit packets that are complete. this is to avoid assembling
            // incomplete PES packets due to poor segmentation


            if (packetFlushable) {
                self.trigger('data', event);
            }
        };

    _ElementaryStream.prototype.init.call(this);
    /**
     * Identifies M2TS packet types and parses PES packets using metadata
     * parsed from the PMT
     **/


    this.push = function (data) {
        ({
            pat: function pat() { // we have to wait for the PMT to arrive as well before we
                // have any meaningful metadata
            },
            pes: function pes() {
                var stream, streamType;

                switch (data.streamType) {
                    case streamTypes.H264_STREAM_TYPE:
                        stream = video;
                        streamType = 'video';
                        break;

                    case streamTypes.ADTS_STREAM_TYPE:
                        stream = audio;
                        streamType = 'audio';
                        break;

                    case streamTypes.METADATA_STREAM_TYPE:
                        stream = timedMetadata;
                        streamType = 'timed-metadata';
                        break;

                    default:
                        // ignore unknown stream types
                        return;
                } // if a new packet is starting, we can flush the completed
                // packet


                if (data.payloadUnitStartIndicator) {
                    flushStream(stream, streamType, true);
                } // buffer this fragment until we are sure we've received the
                // complete payload


                stream.data.push(data);
                stream.size += data.data.byteLength;
            },
            pmt: function pmt() {
                var event = {
                    type: 'metadata',
                    tracks: []
                };
                programMapTable = data.programMapTable; // translate audio and video streams to tracks

                if (programMapTable.video !== null) {
                    event.tracks.push({
                        timelineStartInfo: {
                            baseMediaDecodeTime: 0
                        },
                        id: +programMapTable.video,
                        codec: 'avc',
                        type: 'video'
                    });
                }

                if (programMapTable.audio !== null) {
                    event.tracks.push({
                        timelineStartInfo: {
                            baseMediaDecodeTime: 0
                        },
                        id: +programMapTable.audio,
                        codec: 'adts',
                        type: 'audio'
                    });
                }

                segmentHadPmt = true;
                self.trigger('data', event);
            }
        })[data.type]();
    };

    this.reset = function () {
        video.size = 0;
        video.data.length = 0;
        audio.size = 0;
        audio.data.length = 0;
        this.trigger('reset');
    };
    /**
     * Flush any remaining input. Video PES packets may be of variable
     * length. Normally, the start of a new video packet can trigger the
     * finalization of the previous packet. That is not possible if no
     * more video is forthcoming, however. In that case, some other
     * mechanism (like the end of the file) has to be employed. When it is
     * clear that no additional data is forthcoming, calling this method
     * will flush the buffered packets.
     */


    this.flushStreams_ = function () {
        // !!THIS ORDER IS IMPORTANT!!
        // video first then audio
        flushStream(video, 'video');
        flushStream(audio, 'audio');
        flushStream(timedMetadata, 'timed-metadata');
    };

    this.flush = function () {
        // if on flush we haven't had a pmt emitted
        // and we have a pmt to emit. emit the pmt
        // so that we trigger a trackinfo downstream.
        if (!segmentHadPmt && programMapTable) {
            var pmt = {
                type: 'metadata',
                tracks: []
            }; // translate audio and video streams to tracks

            if (programMapTable.video !== null) {
                pmt.tracks.push({
                    timelineStartInfo: {
                        baseMediaDecodeTime: 0
                    },
                    id: +programMapTable.video,
                    codec: 'avc',
                    type: 'video'
                });
            }

            if (programMapTable.audio !== null) {
                pmt.tracks.push({
                    timelineStartInfo: {
                        baseMediaDecodeTime: 0
                    },
                    id: +programMapTable.audio,
                    codec: 'adts',
                    type: 'audio'
                });
            }

            self.trigger('data', pmt);
        }

        segmentHadPmt = false;
        this.flushStreams_();
        this.trigger('done');
    };
};

_ElementaryStream.prototype = new stream();

var m2ts_1 = {
    TransportPacketStream: _TransportPacketStream,
    TransportParseStream: _TransportParseStream,
    ElementaryStream: _ElementaryStream
};

// clock
var ONE_SECOND_IN_TS$5 = 90000;
// 90kHz clock
var clock = {
    ONE_SECOND_IN_TS: ONE_SECOND_IN_TS$5,
}

// constants
var AUDIO_PROPERTIES = ['audioobjecttype', 'channelcount', 'samplerate', 'samplingfrequencyindex', 'samplesize'];
var audioProperties = AUDIO_PROPERTIES;

var VIDEO_PROPERTIES = ['width', 'height', 'profileIdc', 'levelIdc', 'profileCompatibility', 'sarRatio'];
var videoProperties = VIDEO_PROPERTIES;
// adts
var ONE_SECOND_IN_TS$4 = clock.ONE_SECOND_IN_TS;

var _AdtsStream;

var ADTS_SAMPLING_FREQUENCIES$1 = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
/*
 * Accepts a ElementaryStream and emits data events with parsed
 * AAC Audio Frames of the individual packets. Input audio in ADTS
 * format is unpacked and re-emitted as AAC frames.
 *
 * @see http://wiki.multimedia.cx/index.php?title=ADTS
 * @see http://wiki.multimedia.cx/?title=Understanding_AAC
 */

_AdtsStream = function AdtsStream() {
    var buffer;

    _AdtsStream.prototype.init.call(this);

    this.push = function (packet) {
        var i = 0,
            frameLength,
            protectionSkipBytes,
            oldBuffer,
            sampleCount,
            adtsFrameDuration;


        if (packet.type !== 'audio') {
            // ignore non-audio data
            return;
        } // Prepend any data in the buffer to the input data so that we can parse
        // aac frames the cross a PES packet boundary


        if (buffer && buffer.length) {
            oldBuffer = buffer;
            buffer = new Uint8Array(oldBuffer.byteLength + packet.data.byteLength);
            buffer.set(oldBuffer);
            buffer.set(packet.data, oldBuffer.byteLength);
        } else {
            buffer = packet.data;
        } // unpack any ADTS frames which have been fully received
        // for details on the ADTS header, see http://wiki.multimedia.cx/index.php?title=ADTS


        var skip; // We use i + 7 here because we want to be able to parse the entire header.
        // If we don't have enough bytes to do that, then we definitely won't have a full frame.

        while (i + 7 < buffer.length) {
            // Look for the start of an ADTS header..
            if (buffer[i] !== 0xFF || (buffer[i + 1] & 0xF6) !== 0xF0) {
                if (typeof skip !== 'number') {
                    skip = i;
                } // If a valid header was not found,  jump one forward and attempt to
                // find a valid ADTS header starting at the next byte


                i++;
                continue;
            }

            if (typeof skip === 'number') {
                skip = null;
            } // The protection skip bit tells us if we have 2 bytes of CRC data at the
            // end of the ADTS header


            protectionSkipBytes = (~buffer[i + 1] & 0x01) * 2; // Frame length is a 13 bit integer starting 16 bits from the
            // end of the sync sequence
            // NOTE: frame length includes the size of the header

            frameLength = (buffer[i + 3] & 0x03) << 11 | buffer[i + 4] << 3 | (buffer[i + 5] & 0xe0) >> 5;
            // then we have to wait for more data

            if (buffer.byteLength - i < frameLength) {
                break;
            } // Otherwise, deliver the complete AAC frame


            this.trigger('data', {
                pts: packet.pts,
                dts: packet.dts,
                audioobjecttype: (buffer[i + 2] >>> 6 & 0x03) + 1,
                channelcount: (buffer[i + 2] & 1) << 2 | (buffer[i + 3] & 0xc0) >>> 6,
                samplerate: ADTS_SAMPLING_FREQUENCIES$1[(buffer[i + 2] & 0x3c) >>> 2],
                samplingfrequencyindex: (buffer[i + 2] & 0x3c) >>> 2,
                // assume ISO/IEC 14496-12 AudioSampleEntry default of 16
                samplesize: 16,
                // data is the frame without it's header
                data: buffer.subarray(i + 7 + protectionSkipBytes, i + frameLength)
            });
            i += frameLength;
        }

        if (typeof skip === 'number') {
            this.skipWarn_(skip, i);
            skip = null;
        } // remove processed bytes from the buffer.


        buffer = buffer.subarray(i);
    };

    this.flush = function () {
        frameNum = 0;
        this.trigger('done');
    };

    this.reset = function () {
        buffer = void 0;
        this.trigger('reset');
    };

    this.endTimeline = function () {
        buffer = void 0;
        this.trigger('endedtimeline');
    };
};

_AdtsStream.prototype = new stream();
var adts = _AdtsStream;

// video stream
var generateSegmentTimingInfo = function generateSegmentTimingInfo(baseMediaDecodeTime, startDts, startPts, endDts, endPts, prependedContentDuration) {
    var ptsOffsetFromDts = startPts - startDts,
        decodeDuration = endDts - startDts,
        presentationDuration = endPts - startPts; // The PTS and DTS values are based on the actual stream times from the segment,
    // however, the player time values will reflect a start from the baseMediaDecodeTime.
    // In order to provide relevant values for the player times, base timing info on the
    // baseMediaDecodeTime and the DTS and PTS durations of the segment.

    return {
        start: {
            dts: baseMediaDecodeTime,
            pts: baseMediaDecodeTime + ptsOffsetFromDts
        },
        end: {
            dts: baseMediaDecodeTime + decodeDuration,
            pts: baseMediaDecodeTime + presentationDuration
        },
        prependedContentDuration: prependedContentDuration,
        baseMediaDecodeTime: baseMediaDecodeTime
    };
};
var ONE_SECOND_IN_TS$3 = clock.ONE_SECOND_IN_TS;
/**
 * Store information about the start and end of the track and the
 * duration for each frame/sample we process in order to calculate
 * the baseMediaDecodeTime
 */

var collectDtsInfo = function collectDtsInfo(track, data) {
    if (typeof data.pts === 'number') {
        if (track.timelineStartInfo.pts === undefined) {
            track.timelineStartInfo.pts = data.pts;
        }

        if (track.minSegmentPts === undefined) {
            track.minSegmentPts = data.pts;
        } else {
            track.minSegmentPts = Math.min(track.minSegmentPts, data.pts);
        }

        if (track.maxSegmentPts === undefined) {
            track.maxSegmentPts = data.pts;
        } else {
            track.maxSegmentPts = Math.max(track.maxSegmentPts, data.pts);
        }
    }

    if (typeof data.dts === 'number') {
        if (track.timelineStartInfo.dts === undefined) {
            track.timelineStartInfo.dts = data.dts;
        }

        if (track.minSegmentDts === undefined) {
            track.minSegmentDts = data.dts;
        } else {
            track.minSegmentDts = Math.min(track.minSegmentDts, data.dts);
        }

        if (track.maxSegmentDts === undefined) {
            track.maxSegmentDts = data.dts;
        } else {
            track.maxSegmentDts = Math.max(track.maxSegmentDts, data.dts);
        }
    }
};
/**
 * Clear values used to calculate the baseMediaDecodeTime between
 * tracks
 */


var clearDtsInfo = function clearDtsInfo(track) {
    delete track.minSegmentDts;
    delete track.maxSegmentDts;
    delete track.minSegmentPts;
    delete track.maxSegmentPts;
};
/**
 * Calculate the track's baseMediaDecodeTime based on the earliest
 * DTS the transmuxer has ever seen and the minimum DTS for the
 * current track
 * @param track {object} track metadata configuration
 * @param keepOriginalTimestamps {boolean} If true, keep the timestamps
 *        in the source; false to adjust the first segment to start at 0.
 */


var calculateTrackBaseMediaDecodeTime = function calculateTrackBaseMediaDecodeTime(track, keepOriginalTimestamps) {
    var baseMediaDecodeTime,
        scale,
        minSegmentDts = track.minSegmentDts; // Optionally adjust the time so the first segment starts at zero.

    if (!keepOriginalTimestamps) {
        minSegmentDts -= track.timelineStartInfo.dts;
    } // track.timelineStartInfo.baseMediaDecodeTime is the location, in time, where
    // we want the start of the first segment to be placed


    baseMediaDecodeTime = track.timelineStartInfo.baseMediaDecodeTime; // Add to that the distance this segment is from the very first

    baseMediaDecodeTime += minSegmentDts; // baseMediaDecodeTime must not become negative

    baseMediaDecodeTime = Math.max(0, baseMediaDecodeTime);

    if (track.type === 'audio') {
        // Audio has a different clock equal to the sampling_rate so we need to
        // scale the PTS values into the clock rate of the track
        scale = track.samplerate / ONE_SECOND_IN_TS$3;
        baseMediaDecodeTime *= scale;
        baseMediaDecodeTime = Math.floor(baseMediaDecodeTime);
    }

    return baseMediaDecodeTime;
};

var trackDecodeInfo = {
    clearDtsInfo: clearDtsInfo,
    calculateTrackBaseMediaDecodeTime: calculateTrackBaseMediaDecodeTime,
    collectDtsInfo: collectDtsInfo
};


/**
 * mux.js
 *
 * Copyright (c) Brightcove
 * Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
 */
// Convert an array of nal units into an array of frames with each frame being
// composed of the nal units that make up that frame
// Also keep track of cummulative data about the frame from the nal units such
// as the frame duration, starting pts, etc.
var groupNalsIntoFrames = function groupNalsIntoFrames(nalUnits) {
    var i,
        currentNal,
        currentFrame = [],
        frames = []; // TODO added for LHLS, make sure this is OK

    frames.byteLength = 0;
    frames.nalCount = 0;
    frames.duration = 0;
    currentFrame.byteLength = 0;

    for (i = 0; i < nalUnits.length; i++) {
        currentNal = nalUnits[i]; // Split on 'aud'-type nal units

        if (currentNal.nalUnitType === 'access_unit_delimiter_rbsp') {
            // Since the very first nal unit is expected to be an AUD
            // only push to the frames array when currentFrame is not empty
            if (currentFrame.length) {
                currentFrame.duration = currentNal.dts - currentFrame.dts; // TODO added for LHLS, make sure this is OK

                frames.byteLength += currentFrame.byteLength;
                frames.nalCount += currentFrame.length;
                frames.duration += currentFrame.duration;
                frames.push(currentFrame);
            }

            currentFrame = [currentNal];
            currentFrame.byteLength = currentNal.data.byteLength;
            currentFrame.pts = currentNal.pts;
            currentFrame.dts = currentNal.dts;
        } else {
            // Specifically flag key frames for ease of use later
            if (currentNal.nalUnitType === 'slice_layer_without_partitioning_rbsp_idr') {
                currentFrame.keyFrame = true;
            }

            currentFrame.duration = currentNal.dts - currentFrame.dts;
            currentFrame.byteLength += currentNal.data.byteLength;
            currentFrame.push(currentNal);
        }
    } // For the last frame, use the duration of the previous frame if we
    // have nothing better to go on


    if (frames.length && (!currentFrame.duration || currentFrame.duration <= 0)) {
        currentFrame.duration = frames[frames.length - 1].duration;
    } // Push the final frame
    // TODO added for LHLS, make sure this is OK


    frames.byteLength += currentFrame.byteLength;
    frames.nalCount += currentFrame.length;
    frames.duration += currentFrame.duration;
    frames.push(currentFrame);
    return frames;
}; // Convert an array of frames into an array of Gop with each Gop being composed
// of the frames that make up that Gop
// Also keep track of cummulative data about the Gop from the frames such as the
// Gop duration, starting pts, etc.


var groupFramesIntoGops = function groupFramesIntoGops(frames) {
    var i,
        currentFrame,
        currentGop = [],
        gops = []; // We must pre-set some of the values on the Gop since we
    // keep running totals of these values

    currentGop.byteLength = 0;
    currentGop.nalCount = 0;
    currentGop.duration = 0;
    currentGop.pts = frames[0].pts;
    currentGop.dts = frames[0].dts; // store some metadata about all the Gops

    gops.byteLength = 0;
    gops.nalCount = 0;
    gops.duration = 0;
    gops.pts = frames[0].pts;
    gops.dts = frames[0].dts;

    for (i = 0; i < frames.length; i++) {
        currentFrame = frames[i];

        if (currentFrame.keyFrame) {
            // Since the very first frame is expected to be an keyframe
            // only push to the gops array when currentGop is not empty
            if (currentGop.length) {
                gops.push(currentGop);
                gops.byteLength += currentGop.byteLength;
                gops.nalCount += currentGop.nalCount;
                gops.duration += currentGop.duration;
            }

            currentGop = [currentFrame];
            currentGop.nalCount = currentFrame.length;
            currentGop.byteLength = currentFrame.byteLength;
            currentGop.pts = currentFrame.pts;
            currentGop.dts = currentFrame.dts;
            currentGop.duration = currentFrame.duration;
        } else {
            currentGop.duration += currentFrame.duration;
            currentGop.nalCount += currentFrame.length;
            currentGop.byteLength += currentFrame.byteLength;
            currentGop.push(currentFrame);
        }
    }

    if (gops.length && currentGop.duration <= 0) {
        currentGop.duration = gops[gops.length - 1].duration;
    }

    gops.byteLength += currentGop.byteLength;
    gops.nalCount += currentGop.nalCount;
    gops.duration += currentGop.duration; // push the final Gop

    gops.push(currentGop);
    return gops;
};
/*
 * Search for the first keyframe in the GOPs and throw away all frames
 * until that keyframe. Then extend the duration of the pulled keyframe
 * and pull the PTS and DTS of the keyframe so that it covers the time
 * range of the frames that were disposed.
 *
 * @param {Array} gops video GOPs
 * @returns {Array} modified video GOPs
 */


var extendFirstKeyFrame = function extendFirstKeyFrame(gops) {
    var currentGop;

    if (!gops[0][0].keyFrame && gops.length > 1) {
        // Remove the first GOP
        currentGop = gops.shift();
        gops.byteLength -= currentGop.byteLength;
        gops.nalCount -= currentGop.nalCount; // Extend the first frame of what is now the
        // first gop to cover the time period of the
        // frames we just removed

        gops[0][0].dts = currentGop.dts;
        gops[0][0].pts = currentGop.pts;
        gops[0][0].duration += currentGop.duration;
    }

    return gops;
};
/**
 * Default sample object
 * see ISO/IEC 14496-12:2012, section 8.6.4.3
 */


var createDefaultSample = function createDefaultSample() {
    return {
        size: 0,
        flags: {
            isLeading: 0,
            dependsOn: 1,
            isDependedOn: 0,
            hasRedundancy: 0,
            degradationPriority: 0,
            isNonSyncSample: 1
        }
    };
};
/*
 * Collates information from a video frame into an object for eventual
 * entry into an MP4 sample table.
 *
 * @param {Object} frame the video frame
 * @param {Number} dataOffset the byte offset to position the sample
 * @return {Object} object containing sample table info for a frame
 */


var sampleForFrame = function sampleForFrame(frame, dataOffset) {
    var sample = createDefaultSample();
    sample.dts = frame.dts;
    sample.dataOffset = dataOffset;
    sample.compositionTimeOffset = frame.pts - frame.dts;
    sample.duration = frame.duration;
    sample.size = 4 * frame.length; // Space for nal unit size

    sample.size += frame.byteLength;

    if (frame.keyFrame) {
        sample.flags.dependsOn = 2;
        sample.flags.isNonSyncSample = 0;
    }

    return sample;
}; // generate the track's sample table from an array of gops


var generateSampleTable$1 = function generateSampleTable(gops, baseDataOffset) {
    var h,
        i,
        sample,
        currentGop,
        currentFrame,
        dataOffset = baseDataOffset || 0,
        samples = [];

    for (h = 0; h < gops.length; h++) {
        currentGop = gops[h];

        for (i = 0; i < currentGop.length; i++) {
            currentFrame = currentGop[i];
            sample = sampleForFrame(currentFrame, dataOffset);
            dataOffset += sample.size;
            samples.push(sample);
        }
    }

    return samples;
}; // generate the track's raw mdat data from an array of gops


var concatenateNalData = function concatenateNalData(gops) {
    var h,
        i,
        j,
        currentGop,
        currentFrame,
        currentNal,
        dataOffset = 0,
        nalsByteLength = gops.byteLength,
        numberOfNals = gops.nalCount,
        totalByteLength = nalsByteLength + 4 * numberOfNals,
        data = new Uint8Array(totalByteLength),
        view = new DataView(data.buffer); // For each Gop..

    for (h = 0; h < gops.length; h++) {
        currentGop = gops[h]; // For each Frame..

        for (i = 0; i < currentGop.length; i++) {
            currentFrame = currentGop[i]; // For each NAL..

            for (j = 0; j < currentFrame.length; j++) {
                currentNal = currentFrame[j];
                view.setUint32(dataOffset, currentNal.data.byteLength);
                dataOffset += 4;
                data.set(currentNal.data, dataOffset);
                dataOffset += currentNal.data.byteLength;
            }
        }
    }

    return data;
}; // generate the track's sample table from a frame


var generateSampleTableForFrame = function generateSampleTableForFrame(frame, baseDataOffset) {
    var sample,
        dataOffset = baseDataOffset || 0,
        samples = [];
    sample = sampleForFrame(frame, dataOffset);
    samples.push(sample);
    return samples;
}; // generate the track's raw mdat data from a frame


var concatenateNalDataForFrame = function concatenateNalDataForFrame(frame) {
    var i,
        currentNal,
        dataOffset = 0,
        nalsByteLength = frame.byteLength,
        numberOfNals = frame.length,
        totalByteLength = nalsByteLength + 4 * numberOfNals,
        data = new Uint8Array(totalByteLength),
        view = new DataView(data.buffer); // For each NAL..

    for (i = 0; i < frame.length; i++) {
        currentNal = frame[i];
        view.setUint32(dataOffset, currentNal.data.byteLength);
        dataOffset += 4;
        data.set(currentNal.data, dataOffset);
        dataOffset += currentNal.data.byteLength;
    }

    return data;
};

var frameUtils = {
    groupNalsIntoFrames: groupNalsIntoFrames,
    groupFramesIntoGops: groupFramesIntoGops,
    extendFirstKeyFrame: extendFirstKeyFrame,
    generateSampleTable: generateSampleTable$1,
    concatenateNalData: concatenateNalData,
    generateSampleTableForFrame: generateSampleTableForFrame,
    concatenateNalDataForFrame: concatenateNalDataForFrame
};
/**
 * Constructs a single-track, ISO BMFF media segment from H264 data
 * events. The output of this stream can be fed to a SourceBuffer
 * configured with a suitable initialization segment.
 * @param track {object} track metadata configuration
 * @param options {object} transmuxer options object
 * @param options.alignGopsAtEnd {boolean} If true, start from the end of the
 *        gopsToAlignWith list when attempting to align gop pts
 * @param options.keepOriginalTimestamps {boolean} If true, keep the timestamps
 *        in the source; false to adjust the first segment to start at 0.
 */

_VideoSegmentStream$1 = function VideoSegmentStream(track, options) {
    var sequenceNumber,
        nalUnits = [],
        gopsToAlignWith = [],
        config,
        pps;
    options = options || {};
    sequenceNumber = options.firstSequenceNumber || 0;

    _VideoSegmentStream$1.prototype.init.call(this);

    delete track.minPTS;
    this.gopCache_ = [];
    /**
     * Constructs a ISO BMFF segment given H264 nalUnits
     * @param {Object} nalUnit A data event representing a nalUnit
     * @param {String} nalUnit.nalUnitType
     * @param {Object} nalUnit.config Properties for a mp4 track
     * @param {Uint8Array} nalUnit.data The nalUnit bytes
     * @see lib/codecs/h264.js
     **/

    this.push = function (nalUnit) {
        trackDecodeInfo.collectDtsInfo(track, nalUnit); // record the track config

        if (nalUnit.nalUnitType === 'seq_parameter_set_rbsp' && !config) {
            config = nalUnit.config;
            track.sps = [nalUnit.data];
            videoProperties.forEach(function (prop) {
                track[prop] = config[prop];
            }, this);
        }

        if (nalUnit.nalUnitType === 'pic_parameter_set_rbsp' && !pps) {
            pps = nalUnit.data;
            track.pps = [nalUnit.data];
        } // buffer video until flush() is called


        nalUnits.push(nalUnit);
    };
    /**
     * Pass constructed ISO BMFF track and boxes on to the
     * next stream in the pipeline
     **/


    this.flush = function () {
        var frames,
            gopForFusion,
            gops,
            mdat,
            boxes,
            prependedContentDuration = 0; // Throw away nalUnits at the start of the byte stream until
        // we find the first AUD

        while (nalUnits.length) {
            if (nalUnits[0].nalUnitType === 'access_unit_delimiter_rbsp') {
                break;
            }

            nalUnits.shift();
        } // Return early if no video data has been observed


        if (nalUnits.length === 0) {
            this.resetStream_();
            this.trigger('done', 'VideoSegmentStream');
            return;
        } // Organize the raw nal-units into arrays that represent
        // higher-level constructs such as frames and gops
        // (group-of-pictures)


        frames = frameUtils.groupNalsIntoFrames(nalUnits);
        gops = frameUtils.groupFramesIntoGops(frames); // If the first frame of this fragment is not a keyframe we have
        // a problem since MSE (on Chrome) requires a leading keyframe.
        //
        // We have two approaches to repairing this situation:
        // 1) GOP-FUSION:
        //    This is where we keep track of the GOPS (group-of-pictures)
        //    from previous fragments and attempt to find one that we can
        //    prepend to the current fragment in order to create a valid
        //    fragment.
        // 2) KEYFRAME-PULLING:
        //    Here we search for the first keyframe in the fragment and
        //    throw away all the frames between the start of the fragment
        //    and that keyframe. We then extend the duration and pull the
        //    PTS of the keyframe forward so that it covers the time range
        //    of the frames that were disposed of.
        //
        // #1 is far prefereable over #2 which can cause "stuttering" but
        // requires more things to be just right.

        if (!gops[0][0].keyFrame) {
            // Search for a gop for fusion from our gopCache
            gopForFusion = this.getGopForFusion_(nalUnits[0], track);

            if (gopForFusion) {
                // in order to provide more accurate timing information about the segment, save
                // the number of seconds prepended to the original segment due to GOP fusion
                prependedContentDuration = gopForFusion.duration;
                gops.unshift(gopForFusion); // Adjust Gops' metadata to account for the inclusion of the
                // new gop at the beginning

                gops.byteLength += gopForFusion.byteLength;
                gops.nalCount += gopForFusion.nalCount;
                gops.pts = gopForFusion.pts;
                gops.dts = gopForFusion.dts;
                gops.duration += gopForFusion.duration;
            } else {
                // If we didn't find a candidate gop fall back to keyframe-pulling
                gops = frameUtils.extendFirstKeyFrame(gops);
            }
        } // Trim gops to align with gopsToAlignWith


        if (gopsToAlignWith.length) {
            var alignedGops;

            if (options.alignGopsAtEnd) {
                alignedGops = this.alignGopsAtEnd_(gops);
            } else {
                alignedGops = this.alignGopsAtStart_(gops);
            }

            if (!alignedGops) {
                // save all the nals in the last GOP into the gop cache
                this.gopCache_.unshift({
                    gop: gops.pop(),
                    pps: track.pps,
                    sps: track.sps
                }); // Keep a maximum of 6 GOPs in the cache

                this.gopCache_.length = Math.min(6, this.gopCache_.length); // Clear nalUnits

                nalUnits = []; // return early no gops can be aligned with desired gopsToAlignWith

                this.resetStream_();
                this.trigger('done', 'VideoSegmentStream');
                return;
            } // Some gops were trimmed. clear dts info so minSegmentDts and pts are correct
            // when recalculated before sending off to CoalesceStream


            trackDecodeInfo.clearDtsInfo(track);
            gops = alignedGops;
        }

        trackDecodeInfo.collectDtsInfo(track, gops); // First, we have to build the index from byte locations to
        // samples (that is, frames) in the video data

        track.samples = frameUtils.generateSampleTable(gops); // Concatenate the video data and construct the mdat

        mdat = frameUtils.concatenateNalData(gops);
        track.baseMediaDecodeTime = trackDecodeInfo.calculateTrackBaseMediaDecodeTime(track, options.keepOriginalTimestamps);

        this.gopCache_.unshift({
            gop: gops.pop(),
            pps: track.pps,
            sps: track.sps
        }); // Keep a maximum of 6 GOPs in the cache

        this.gopCache_.length = Math.min(6, this.gopCache_.length); // Clear nalUnits

        nalUnits = [];

        preview_mdat = mp4Generator.mdat(mdat);
        preview_moof = mp4Generator.moof(0, [track]);
        preview_boxes = new Uint8Array(preview_moof.byteLength + preview_mdat.byteLength); // Bump the sequence number for next time
        preview_boxes.set(preview_moof);
        preview_boxes.set(preview_mdat, preview_moof.byteLength);

        boxes = mdat
        track.dataByteLength = boxes.byteLength
        track.videoBytes = boxes.length
        this.trigger('data', {
            track: track,
            boxes: boxes,
            preview_boxes
        });
        this.trigger('baseMediaDecodeTime', track);
        this.resetStream_(); // Continue with the flush process now

        this.trigger('done', 'VideoSegmentStream');
    };

    this.reset = function () {
        this.resetStream_();
        nalUnits = [];
        this.gopCache_.length = 0;
        gopsToAlignWith.length = 0;
        this.trigger('reset');
    };

    this.resetStream_ = function () {
        trackDecodeInfo.clearDtsInfo(track); // reset config and pps because they may differ across segments
        // for instance, when we are rendition switching

        config = undefined;
        pps = undefined;
    }; // Search for a candidate Gop for gop-fusion from the gop cache and
    // return it or return null if no good candidate was found


    this.getGopForFusion_ = function (nalUnit) {
        var halfSecond = 45000,
            // Half-a-second in a 90khz clock
            allowableOverlap = 10000,
            // About 3 frames @ 30fps
            nearestDistance = Infinity,
            dtsDistance,
            nearestGopObj,
            currentGop,
            currentGopObj,
            i; // Search for the GOP nearest to the beginning of this nal unit

        for (i = 0; i < this.gopCache_.length; i++) {
            currentGopObj = this.gopCache_[i];
            currentGop = currentGopObj.gop; // Reject Gops with different SPS or PPS

            if (!(track.pps && arrayEquals(track.pps[0], currentGopObj.pps[0])) || !(track.sps && arrayEquals(track.sps[0], currentGopObj.sps[0]))) {
                continue;
            } // Reject Gops that would require a negative baseMediaDecodeTime


            if (currentGop.dts < track.timelineStartInfo.dts) {
                continue;
            } // The distance between the end of the gop and the start of the nalUnit


            dtsDistance = nalUnit.dts - currentGop.dts - currentGop.duration; // Only consider GOPS that start before the nal unit and end within
            // a half-second of the nal unit

            if (dtsDistance >= -allowableOverlap && dtsDistance <= halfSecond) {
                // Always use the closest GOP we found if there is more than
                // one candidate
                if (!nearestGopObj || nearestDistance > dtsDistance) {
                    nearestGopObj = currentGopObj;
                    nearestDistance = dtsDistance;
                }
            }
        }

        if (nearestGopObj) {
            return nearestGopObj.gop;
        }

        return null;
    }; // trim gop list to the first gop found that has a matching pts with a gop in the list
    // of gopsToAlignWith starting from the START of the list


    this.alignGopsAtStart_ = function (gops) {
        var alignIndex, gopIndex, align, gop, byteLength, nalCount, duration, alignedGops;
        byteLength = gops.byteLength;
        nalCount = gops.nalCount;
        duration = gops.duration;
        alignIndex = gopIndex = 0;

        while (alignIndex < gopsToAlignWith.length && gopIndex < gops.length) {
            align = gopsToAlignWith[alignIndex];
            gop = gops[gopIndex];

            if (align.pts === gop.pts) {
                break;
            }

            if (gop.pts > align.pts) {
                // this current gop starts after the current gop we want to align on, so increment
                // align index
                alignIndex++;
                continue;
            } // current gop starts before the current gop we want to align on. so increment gop
            // index


            gopIndex++;
            byteLength -= gop.byteLength;
            nalCount -= gop.nalCount;
            duration -= gop.duration;
        }

        if (gopIndex === 0) {
            // no gops to trim
            return gops;
        }

        if (gopIndex === gops.length) {
            // all gops trimmed, skip appending all gops
            return null;
        }

        alignedGops = gops.slice(gopIndex);
        alignedGops.byteLength = byteLength;
        alignedGops.duration = duration;
        alignedGops.nalCount = nalCount;
        alignedGops.pts = alignedGops[0].pts;
        alignedGops.dts = alignedGops[0].dts;
        return alignedGops;
    }; // trim gop list to the first gop found that has a matching pts with a gop in the list
    // of gopsToAlignWith starting from the END of the list


    this.alignGopsAtEnd_ = function (gops) {
        var alignIndex, gopIndex, align, gop, alignEndIndex, matchFound;
        alignIndex = gopsToAlignWith.length - 1;
        gopIndex = gops.length - 1;
        alignEndIndex = null;
        matchFound = false;

        while (alignIndex >= 0 && gopIndex >= 0) {
            align = gopsToAlignWith[alignIndex];
            gop = gops[gopIndex];

            if (align.pts === gop.pts) {
                matchFound = true;
                break;
            }

            if (align.pts > gop.pts) {
                alignIndex--;
                continue;
            }

            if (alignIndex === gopsToAlignWith.length - 1) {
                // gop.pts is greater than the last alignment candidate. If no match is found
                // by the end of this loop, we still want to append gops that come after this
                // point
                alignEndIndex = gopIndex;
            }

            gopIndex--;
        }

        if (!matchFound && alignEndIndex === null) {
            return null;
        }

        var trimIndex;

        if (matchFound) {
            trimIndex = gopIndex;
        } else {
            trimIndex = alignEndIndex;
        }

        if (trimIndex === 0) {
            return gops;
        }

        var alignedGops = gops.slice(trimIndex);
        var metadata = alignedGops.reduce(function (total, gop) {
            total.byteLength += gop.byteLength;
            total.duration += gop.duration;
            total.nalCount += gop.nalCount;
            return total;
        }, {
            byteLength: 0,
            duration: 0,
            nalCount: 0
        });
        alignedGops.byteLength = metadata.byteLength;
        alignedGops.duration = metadata.duration;
        alignedGops.nalCount = metadata.nalCount;
        alignedGops.pts = alignedGops[0].pts;
        alignedGops.dts = alignedGops[0].dts;
        return alignedGops;
    };
};

_VideoSegmentStream$1.prototype = new stream();

// h264
var ExpGolomb;
/**
 * Parser for exponential Golomb codes, a variable-bitwidth number encoding
 * scheme used by h264.
 */

ExpGolomb = function ExpGolomb(workingData) {
    var // the number of bytes left to examine in workingData
        workingBytesAvailable = workingData.byteLength,
        // the current word being examined
        workingWord = 0,
        // :uint
        // the number of bits left to examine in the current word
        workingBitsAvailable = 0; // :uint;
    // ():uint

    this.length = function () {
        return 8 * workingBytesAvailable;
    }; // ():uint


    this.bitsAvailable = function () {
        return 8 * workingBytesAvailable + workingBitsAvailable;
    }; // ():void


    this.loadWord = function () {
        var position = workingData.byteLength - workingBytesAvailable,
            workingBytes = new Uint8Array(4),
            availableBytes = Math.min(4, workingBytesAvailable);

        if (availableBytes === 0) {
            throw new Error('no bytes available');
        }

        workingBytes.set(workingData.subarray(position, position + availableBytes));
        workingWord = new DataView(workingBytes.buffer).getUint32(0); // track the amount of workingData that has been processed

        workingBitsAvailable = availableBytes * 8;
        workingBytesAvailable -= availableBytes;
    }; // (count:int):void


    this.skipBits = function (count) {
        var skipBytes; // :int

        if (workingBitsAvailable > count) {
            workingWord <<= count;
            workingBitsAvailable -= count;
        } else {
            count -= workingBitsAvailable;
            skipBytes = Math.floor(count / 8);
            count -= skipBytes * 8;
            workingBytesAvailable -= skipBytes;
            this.loadWord();
            workingWord <<= count;
            workingBitsAvailable -= count;
        }
    }; // (size:int):uint


    this.readBits = function (size) {
        var bits = Math.min(workingBitsAvailable, size),
            // :uint
            valu = workingWord >>> 32 - bits; // :uint
        // if size > 31, handle error

        workingBitsAvailable -= bits;

        if (workingBitsAvailable > 0) {
            workingWord <<= bits;
        } else if (workingBytesAvailable > 0) {
            this.loadWord();
        }

        bits = size - bits;

        if (bits > 0) {
            return valu << bits | this.readBits(bits);
        }

        return valu;
    }; // ():uint


    this.skipLeadingZeros = function () {
        var leadingZeroCount; // :uint

        for (leadingZeroCount = 0; leadingZeroCount < workingBitsAvailable; ++leadingZeroCount) {
            if ((workingWord & 0x80000000 >>> leadingZeroCount) !== 0) {
                // the first bit of working word is 1
                workingWord <<= leadingZeroCount;
                workingBitsAvailable -= leadingZeroCount;
                return leadingZeroCount;
            }
        } // we exhausted workingWord and still have not found a 1


        this.loadWord();
        return leadingZeroCount + this.skipLeadingZeros();
    }; // ():void


    this.skipUnsignedExpGolomb = function () {
        this.skipBits(1 + this.skipLeadingZeros());
    }; // ():void


    this.skipExpGolomb = function () {
        this.skipBits(1 + this.skipLeadingZeros());
    }; // ():uint


    this.readUnsignedExpGolomb = function () {
        var clz = this.skipLeadingZeros(); // :uint

        return this.readBits(clz + 1) - 1;
    }; // ():int


    this.readExpGolomb = function () {
        var valu = this.readUnsignedExpGolomb(); // :int

        if (0x01 & valu) {
            // the number is odd if the low order bit is set
            return 1 + valu >>> 1; // add 1 to make it even, and divide by 2
        }

        return -1 * (valu >>> 1); // divide by two then make it negative
    }; // Some convenience functions
    // :Boolean


    this.readBoolean = function () {
        return this.readBits(1) === 1;
    }; // ():int


    this.readUnsignedByte = function () {
        return this.readBits(8);
    };

    this.loadWord();
};

var expGolomb = ExpGolomb;

var _H264Stream, _NalByteStream;

var PROFILES_WITH_OPTIONAL_SPS_DATA;
/**
 * Accepts a NAL unit byte stream and unpacks the embedded NAL units.
 */

_NalByteStream = function NalByteStream() {
    var syncPoint = 0,
        i,
        buffer;

    _NalByteStream.prototype.init.call(this);
    /*
     * Scans a byte stream and triggers a data event with the NAL units found.
     * @param {Object} data Event received from H264Stream
     * @param {Uint8Array} data.data The h264 byte stream to be scanned
     *
     * @see H264Stream.push
     */
    this.push = function (data) {
        var swapBuffer;

        if (!buffer) {
            buffer = data.data;
        } else {
            swapBuffer = new Uint8Array(buffer.byteLength + data.data.byteLength);
            swapBuffer.set(buffer);
            swapBuffer.set(data.data, buffer.byteLength);
            buffer = swapBuffer;
        }

        var len = buffer.byteLength; // Rec. ITU-T H.264, Annex B
        // scan for NAL unit boundaries
        // a match looks like this:
        // 0 0 1 .. NAL .. 0 0 1
        // ^ sync point        ^ i
        // or this:
        // 0 0 1 .. NAL .. 0 0 0
        // ^ sync point        ^ i
        // advance the sync point to a NAL start, if necessary

        for (; syncPoint < len - 3; syncPoint++) {
            if (buffer[syncPoint + 2] === 1) {
                // the sync point is properly aligned
                i = syncPoint + 5;
                break;
            }
        }

        while (i < len) {
            // look at the current byte to determine if we've hit the end of
            // a NAL unit boundary
            switch (buffer[i]) {
                case 0:
                    // skip past non-sync sequences
                    if (buffer[i - 1] !== 0) {
                        i += 2;
                        break;
                    } else if (buffer[i - 2] !== 0) {
                        i++;
                        break;
                    } // deliver the NAL unit if it isn't empty


                    if (syncPoint + 3 !== i - 2) {
                        this.trigger('data', buffer.subarray(syncPoint + 3, i - 2));
                    } // drop trailing zeroes


                    do {
                        i++;
                    } while (buffer[i] !== 1 && i < len);

                    syncPoint = i - 2;
                    i += 3;
                    break;

                case 1:
                    // skip past non-sync sequences
                    if (buffer[i - 1] !== 0 || buffer[i - 2] !== 0) {
                        i += 3;
                        break;
                    } // deliver the NAL unit


                    this.trigger('data', buffer.subarray(syncPoint + 3, i - 2));
                    syncPoint = i - 2;
                    i += 3;
                    break;

                default:
                    // the current byte isn't a one or zero, so it cannot be part
                    // of a sync sequence
                    i += 3;
                    break;
            }
        } // filter out the NAL units that were delivered


        buffer = buffer.subarray(syncPoint);
        i -= syncPoint;
        syncPoint = 0;
    };

    this.reset = function () {
        buffer = null;
        syncPoint = 0;
        this.trigger('reset');
    };

    this.flush = function () {
        // deliver the last buffered NAL unit
        if (buffer && buffer.byteLength > 3) {
            this.trigger('data', buffer.subarray(syncPoint + 3));
        } // reset the stream state


        buffer = null;
        syncPoint = 0;
        this.trigger('done');
    };

    this.endTimeline = function () {
        this.flush();
        this.trigger('endedtimeline');
    };
};

_NalByteStream.prototype = new stream(); // values of profile_idc that indicate additional fields are included in the SPS
// see Recommendation ITU-T H.264 (4/2013),
// 7.3.2.1.1 Sequence parameter set data syntax

PROFILES_WITH_OPTIONAL_SPS_DATA = {
    100: true,
    110: true,
    122: true,
    244: true,
    44: true,
    83: true,
    86: true,
    118: true,
    128: true,
    // TODO: the three profiles below don't
    // appear to have sps data in the specificiation anymore?
    138: true,
    139: true,
    134: true
};
/**
 * Accepts input from a ElementaryStream and produces H.264 NAL unit data
 * events.
 */
_H264Stream = function H264Stream() {
    var nalByteStream = new _NalByteStream(),
        self,
        trackId,
        currentPts,
        currentDts,
        discardEmulationPreventionBytes,
        readSequenceParameterSet,
        skipScalingList;

    _H264Stream.prototype.init.call(this);

    self = this;
    /*
     * Pushes a packet from a stream onto the NalByteStream
     *
     * @param {Object} packet - A packet received from a stream
     * @param {Uint8Array} packet.data - The raw bytes of the packet
     * @param {Number} packet.dts - Decode timestamp of the packet
     * @param {Number} packet.pts - Presentation timestamp of the packet
     * @param {Number} packet.trackId - The id of the h264 track this packet came from
     * @param {('video'|'audio')} packet.type - The type of packet
     *
     */

    this.push = function (packet) {
        if (packet.type !== 'video') {
            return;
        }

        trackId = packet.trackId;
        currentPts = packet.pts;
        currentDts = packet.dts;
        nalByteStream.push(packet);
    };
    /*
     * Identify NAL unit types and pass on the NALU, trackId, presentation and decode timestamps
     * for the NALUs to the next stream component.
     * Also, preprocess caption and sequence parameter NALUs.
     *
     * @param {Uint8Array} data - A NAL unit identified by `NalByteStream.push`
     * @see NalByteStream.push
     */


    nalByteStream.on('data', function (data) {
        var event = {
            trackId: trackId,
            pts: currentPts,
            dts: currentDts,
            data: data,
            nalUnitTypeCode: data[0] & 0x1f
        };

        switch (event.nalUnitTypeCode) {
            case 0x05:
                event.nalUnitType = 'slice_layer_without_partitioning_rbsp_idr';
                break;

            case 0x06:
                event.nalUnitType = 'sei_rbsp';
                event.escapedRBSP = discardEmulationPreventionBytes(data.subarray(1));
                break;

            case 0x07:
                event.nalUnitType = 'seq_parameter_set_rbsp';
                event.escapedRBSP = discardEmulationPreventionBytes(data.subarray(1));
                event.config = readSequenceParameterSet(event.escapedRBSP);
                break;

            case 0x08:
                event.nalUnitType = 'pic_parameter_set_rbsp';
                break;

            case 0x09:
                event.nalUnitType = 'access_unit_delimiter_rbsp';
                break;
        } // This triggers data on the H264Stream


        self.trigger('data', event);
    });
    nalByteStream.on('done', function () {
        self.trigger('done');
    });
    nalByteStream.on('partialdone', function () {
        self.trigger('partialdone');
    });
    nalByteStream.on('reset', function () {
        self.trigger('reset');
    });
    nalByteStream.on('endedtimeline', function () {
        self.trigger('endedtimeline');
    });

    this.flush = function () {
        nalByteStream.flush();
    };

    this.partialFlush = function () {
        nalByteStream.partialFlush();
    };

    this.reset = function () {
        nalByteStream.reset();
    };

    this.endTimeline = function () {
        nalByteStream.endTimeline();
    };
    /**
     * Advance the ExpGolomb decoder past a scaling list. The scaling
     * list is optionally transmitted as part of a sequence parameter
     * set and is not relevant to transmuxing.
     * @param count {number} the number of entries in this scaling list
     * @param expGolombDecoder {object} an ExpGolomb pointed to the
     * start of a scaling list
     * @see Recommendation ITU-T H.264, Section 7.3.2.1.1.1
     */


    skipScalingList = function skipScalingList(count, expGolombDecoder) {
        var lastScale = 8,
            nextScale = 8,
            j,
            deltaScale;

        for (j = 0; j < count; j++) {
            if (nextScale !== 0) {
                deltaScale = expGolombDecoder.readExpGolomb();
                nextScale = (lastScale + deltaScale + 256) % 256;
            }

            lastScale = nextScale === 0 ? lastScale : nextScale;
        }
    };
    /**
     * Expunge any "Emulation Prevention" bytes from a "Raw Byte
     * Sequence Payload"
     * @param data {Uint8Array} the bytes of a RBSP from a NAL
     * unit
     * @return {Uint8Array} the RBSP without any Emulation
     * Prevention Bytes
     */


    discardEmulationPreventionBytes = function discardEmulationPreventionBytes(data) {
        var length = data.byteLength,
            emulationPreventionBytesPositions = [],
            i = 1,
            newLength,
            newData; // Find all `Emulation Prevention Bytes`

        while (i < length - 2) {
            if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0x03) {
                emulationPreventionBytesPositions.push(i + 2);
                i += 2;
            } else {
                i++;
            }
        } // If no Emulation Prevention Bytes were found just return the original
        // array


        if (emulationPreventionBytesPositions.length === 0) {
            return data;
        } // Create a new array to hold the NAL unit data


        newLength = length - emulationPreventionBytesPositions.length;
        newData = new Uint8Array(newLength);
        var sourceIndex = 0;

        for (i = 0; i < newLength; sourceIndex++, i++) {
            if (sourceIndex === emulationPreventionBytesPositions[0]) {
                // Skip this byte
                sourceIndex++; // Remove this position index

                emulationPreventionBytesPositions.shift();
            }

            newData[i] = data[sourceIndex];
        }

        return newData;
    };
    /**
     * Read a sequence parameter set and return some interesting video
     * properties. A sequence parameter set is the H264 metadata that
     * describes the properties of upcoming video frames.
     * @param data {Uint8Array} the bytes of a sequence parameter set
     * @return {object} an object with configuration parsed from the
     * sequence parameter set, including the dimensions of the
     * associated video frames.
     */


    readSequenceParameterSet = function readSequenceParameterSet(data) {
        var frameCropLeftOffset = 0,
            frameCropRightOffset = 0,
            frameCropTopOffset = 0,
            frameCropBottomOffset = 0,
            expGolombDecoder,
            profileIdc,
            levelIdc,
            profileCompatibility,
            chromaFormatIdc,
            picOrderCntType,
            numRefFramesInPicOrderCntCycle,
            picWidthInMbsMinus1,
            picHeightInMapUnitsMinus1,
            frameMbsOnlyFlag,
            scalingListCount,
            sarRatio = [1, 1],
            aspectRatioIdc,
            i;
        expGolombDecoder = new expGolomb(data);
        profileIdc = expGolombDecoder.readUnsignedByte(); // profile_idc

        profileCompatibility = expGolombDecoder.readUnsignedByte(); // constraint_set[0-5]_flag

        levelIdc = expGolombDecoder.readUnsignedByte(); // level_idc u(8)

        expGolombDecoder.skipUnsignedExpGolomb(); // seq_parameter_set_id
        // some profiles have more optional data we don't need

        if (PROFILES_WITH_OPTIONAL_SPS_DATA[profileIdc]) {
            chromaFormatIdc = expGolombDecoder.readUnsignedExpGolomb();

            if (chromaFormatIdc === 3) {
                expGolombDecoder.skipBits(1); // separate_colour_plane_flag
            }

            expGolombDecoder.skipUnsignedExpGolomb(); // bit_depth_luma_minus8

            expGolombDecoder.skipUnsignedExpGolomb(); // bit_depth_chroma_minus8

            expGolombDecoder.skipBits(1); // qpprime_y_zero_transform_bypass_flag

            if (expGolombDecoder.readBoolean()) {
                // seq_scaling_matrix_present_flag
                scalingListCount = chromaFormatIdc !== 3 ? 8 : 12;

                for (i = 0; i < scalingListCount; i++) {
                    if (expGolombDecoder.readBoolean()) {
                        // seq_scaling_list_present_flag[ i ]
                        if (i < 6) {
                            skipScalingList(16, expGolombDecoder);
                        } else {
                            skipScalingList(64, expGolombDecoder);
                        }
                    }
                }
            }
        }

        expGolombDecoder.skipUnsignedExpGolomb(); // log2_max_frame_num_minus4

        picOrderCntType = expGolombDecoder.readUnsignedExpGolomb();

        if (picOrderCntType === 0) {
            expGolombDecoder.readUnsignedExpGolomb(); // log2_max_pic_order_cnt_lsb_minus4
        } else if (picOrderCntType === 1) {
            expGolombDecoder.skipBits(1); // delta_pic_order_always_zero_flag

            expGolombDecoder.skipExpGolomb(); // offset_for_non_ref_pic

            expGolombDecoder.skipExpGolomb(); // offset_for_top_to_bottom_field

            numRefFramesInPicOrderCntCycle = expGolombDecoder.readUnsignedExpGolomb();

            for (i = 0; i < numRefFramesInPicOrderCntCycle; i++) {
                expGolombDecoder.skipExpGolomb(); // offset_for_ref_frame[ i ]
            }
        }

        expGolombDecoder.skipUnsignedExpGolomb(); // max_num_ref_frames

        expGolombDecoder.skipBits(1); // gaps_in_frame_num_value_allowed_flag

        picWidthInMbsMinus1 = expGolombDecoder.readUnsignedExpGolomb();
        picHeightInMapUnitsMinus1 = expGolombDecoder.readUnsignedExpGolomb();
        frameMbsOnlyFlag = expGolombDecoder.readBits(1);

        if (frameMbsOnlyFlag === 0) {
            expGolombDecoder.skipBits(1); // mb_adaptive_frame_field_flag
        }

        expGolombDecoder.skipBits(1); // direct_8x8_inference_flag

        if (expGolombDecoder.readBoolean()) {
            // frame_cropping_flag
            frameCropLeftOffset = expGolombDecoder.readUnsignedExpGolomb();
            frameCropRightOffset = expGolombDecoder.readUnsignedExpGolomb();
            frameCropTopOffset = expGolombDecoder.readUnsignedExpGolomb();
            frameCropBottomOffset = expGolombDecoder.readUnsignedExpGolomb();
        }

        if (expGolombDecoder.readBoolean()) {
            // vui_parameters_present_flag
            if (expGolombDecoder.readBoolean()) {
                // aspect_ratio_info_present_flag
                aspectRatioIdc = expGolombDecoder.readUnsignedByte();

                switch (aspectRatioIdc) {
                    case 1:
                        sarRatio = [1, 1];
                        break;

                    case 2:
                        sarRatio = [12, 11];
                        break;

                    case 3:
                        sarRatio = [10, 11];
                        break;

                    case 4:
                        sarRatio = [16, 11];
                        break;

                    case 5:
                        sarRatio = [40, 33];
                        break;

                    case 6:
                        sarRatio = [24, 11];
                        break;

                    case 7:
                        sarRatio = [20, 11];
                        break;

                    case 8:
                        sarRatio = [32, 11];
                        break;

                    case 9:
                        sarRatio = [80, 33];
                        break;

                    case 10:
                        sarRatio = [18, 11];
                        break;

                    case 11:
                        sarRatio = [15, 11];
                        break;

                    case 12:
                        sarRatio = [64, 33];
                        break;

                    case 13:
                        sarRatio = [160, 99];
                        break;

                    case 14:
                        sarRatio = [4, 3];
                        break;

                    case 15:
                        sarRatio = [3, 2];
                        break;

                    case 16:
                        sarRatio = [2, 1];
                        break;

                    case 255: {
                        sarRatio = [expGolombDecoder.readUnsignedByte() << 8 | expGolombDecoder.readUnsignedByte(), expGolombDecoder.readUnsignedByte() << 8 | expGolombDecoder.readUnsignedByte()];
                        break;
                    }
                }

                if (sarRatio) {
                    sarRatio[0] / sarRatio[1];
                }
            }
        }

        return {
            profileIdc: profileIdc,
            levelIdc: levelIdc,
            profileCompatibility: profileCompatibility,
            width: (picWidthInMbsMinus1 + 1) * 16 - frameCropLeftOffset * 2 - frameCropRightOffset * 2,
            height: (2 - frameMbsOnlyFlag) * (picHeightInMapUnitsMinus1 + 1) * 16 - frameCropTopOffset * 2 - frameCropBottomOffset * 2,
            // sar is sample aspect ratio
            sarRatio: sarRatio
        };
    };
};
_H264Stream.prototype = new stream();

// audio stream

/**
 * mux.js
 *
 * Copyright (c) Brightcove
 * Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
 */
var highPrefix = [33, 16, 5, 32, 164, 27];
var lowPrefix = [33, 65, 108, 84, 1, 2, 4, 8, 168, 2, 4, 8, 17, 191, 252];

var zeroFill = function zeroFill(count) {
    var a = [];

    while (count--) {
        a.push(0);
    }

    return a;
};

var makeTable = function makeTable(metaTable) {
    return Object.keys(metaTable).reduce(function (obj, key) {
        obj[key] = new Uint8Array(metaTable[key].reduce(function (arr, part) {
            return arr.concat(part);
        }, []));
        return obj;
    }, {});
};

var silence;

var silence_1 = function silence_1() {
    if (!silence) {
        // Frames-of-silence to use for filling in missing AAC frames
        var coneOfSilence = {
            96000: [highPrefix, [227, 64], zeroFill(154), [56]],
            88200: [highPrefix, [231], zeroFill(170), [56]],
            64000: [highPrefix, [248, 192], zeroFill(240), [56]],
            48000: [highPrefix, [255, 192], zeroFill(268), [55, 148, 128], zeroFill(54), [112]],
            44100: [highPrefix, [255, 192], zeroFill(268), [55, 163, 128], zeroFill(84), [112]],
            32000: [highPrefix, [255, 192], zeroFill(268), [55, 234], zeroFill(226), [112]],
            24000: [highPrefix, [255, 192], zeroFill(268), [55, 255, 128], zeroFill(268), [111, 112], zeroFill(126), [224]],
            16000: [highPrefix, [255, 192], zeroFill(268), [55, 255, 128], zeroFill(268), [111, 255], zeroFill(269), [223, 108], zeroFill(195), [1, 192]],
            12000: [lowPrefix, zeroFill(268), [3, 127, 248], zeroFill(268), [6, 255, 240], zeroFill(268), [13, 255, 224], zeroFill(268), [27, 253, 128], zeroFill(259), [56]],
            11025: [lowPrefix, zeroFill(268), [3, 127, 248], zeroFill(268), [6, 255, 240], zeroFill(268), [13, 255, 224], zeroFill(268), [27, 255, 192], zeroFill(268), [55, 175, 128], zeroFill(108), [112]],
            8000: [lowPrefix, zeroFill(268), [3, 121, 16], zeroFill(47), [7]]
        };
        silence = makeTable(coneOfSilence);
    }

    return silence;
};

/**
 * mux.js
 *
 * Copyright (c) Brightcove
 * Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
 */

/**
 * Sum the `byteLength` properties of the data in each AAC frame
 */

var sumFrameByteLengths = function sumFrameByteLengths(array) {
    var i,
        currentObj,
        sum = 0; // sum the byteLength's all each nal unit in the frame

    for (i = 0; i < array.length; i++) {
        currentObj = array[i];
        sum += currentObj.data.byteLength;
    }

    return sum;
}; // Possibly pad (prefix) the audio track with silence if appending this track
// would lead to the introduction of a gap in the audio buffer


var prefixWithSilence = function prefixWithSilence(track, frames, audioAppendStartTs, videoBaseMediaDecodeTime) {
    var baseMediaDecodeTimeTs,
        frameDuration = 0,
        audioGapDuration = 0,
        audioFillFrameCount = 0,
        audioFillDuration = 0,
        silentFrame,
        i,
        firstFrame;

    if (!frames.length) {
        return;
    }

    baseMediaDecodeTimeTs = clock.audioTsToVideoTs(track.baseMediaDecodeTime, track.samplerate); // determine frame clock duration based on sample rate, round up to avoid overfills

    frameDuration = Math.ceil(clock.ONE_SECOND_IN_TS / (track.samplerate / 1024));

    if (audioAppendStartTs && videoBaseMediaDecodeTime) {
        // insert the shortest possible amount (audio gap or audio to video gap)
        audioGapDuration = baseMediaDecodeTimeTs - Math.max(audioAppendStartTs, videoBaseMediaDecodeTime); // number of full frames in the audio gap

        audioFillFrameCount = Math.floor(audioGapDuration / frameDuration);
        audioFillDuration = audioFillFrameCount * frameDuration;
    } // don't attempt to fill gaps smaller than a single frame or larger
    // than a half second


    if (audioFillFrameCount < 1 || audioFillDuration > clock.ONE_SECOND_IN_TS / 2) {
        return;
    }

    silentFrame = silence_1()[track.samplerate];

    if (!silentFrame) {
        // we don't have a silent frame pregenerated for the sample rate, so use a frame
        // from the content instead
        silentFrame = frames[0].data;
    }

    for (i = 0; i < audioFillFrameCount; i++) {
        firstFrame = frames[0];
        frames.splice(0, 0, {
            data: silentFrame,
            dts: firstFrame.dts - frameDuration,
            pts: firstFrame.pts - frameDuration
        });
    }

    track.baseMediaDecodeTime -= Math.floor(clock.videoTsToAudioTs(audioFillDuration, track.samplerate));
    return audioFillDuration;
}; // If the audio segment extends before the earliest allowed dts
// value, remove AAC frames until starts at or after the earliest
// allowed DTS so that we don't end up with a negative baseMedia-
// DecodeTime for the audio track


var trimAdtsFramesByEarliestDts = function trimAdtsFramesByEarliestDts(adtsFrames, track, earliestAllowedDts) {
    if (track.minSegmentDts >= earliestAllowedDts) {
        return adtsFrames;
    } // We will need to recalculate the earliest segment Dts


    track.minSegmentDts = Infinity;
    return adtsFrames.filter(function (currentFrame) {
        // If this is an allowed frame, keep it and record it's Dts
        if (currentFrame.dts >= earliestAllowedDts) {
            track.minSegmentDts = Math.min(track.minSegmentDts, currentFrame.dts);
            track.minSegmentPts = track.minSegmentDts;
            return true;
        } // Otherwise, discard it


        return false;
    });
}; // generate the track's raw mdat data from an array of frames


var generateSampleTable = function generateSampleTable(frames) {
    var i,
        currentFrame,
        samples = [];

    for (i = 0; i < frames.length; i++) {
        currentFrame = frames[i];
        samples.push({
            size: currentFrame.data.byteLength,
            dts: currentFrame.dts,
            duration: 1024 // For AAC audio, all samples contain 1024 samples
        });
    }

    return samples;
}; // generate the track's sample table from an array of frames


var concatenateFrameData = function concatenateFrameData(frames) {
    var i,
        currentFrame,
        dataOffset = 0,
        data = new Uint8Array(sumFrameByteLengths(frames));

    for (i = 0; i < frames.length; i++) {
        currentFrame = frames[i];
        data.set(currentFrame.data, dataOffset);
        dataOffset += currentFrame.data.byteLength;
    }

    return data;
};

var audioFrameUtils = {
    prefixWithSilence: prefixWithSilence,
    trimAdtsFramesByEarliestDts: trimAdtsFramesByEarliestDts,
    generateSampleTable: generateSampleTable,
    concatenateFrameData: concatenateFrameData
};
/**
 * Constructs a single-track, ISO BMFF media segment from AAC data
 * events. The output of this stream can be fed to a SourceBuffer
 * configured with a suitable initialization segment.
 * @param track {object} track metadata configuration
 * @param options {object} transmuxer options object
 * @param options.keepOriginalTimestamps {boolean} If true, keep the timestamps
 *        in the source; false to adjust the first segment to start at 0.
 */


_AudioSegmentStream$1 = function AudioSegmentStream(track, options) {
    var adtsFrames = [],
        sequenceNumber,
        earliestAllowedDts = 0;
    options = options || {};
    sequenceNumber = options.firstSequenceNumber || 0,
        baseMediaDecodeTime = null;

    _AudioSegmentStream$1.prototype.init.call(this);
    this.setVideoBaseMediaDecodeTime = function (baseMediaDecodeTime) {
        this.baseMediaDecodeTime = baseMediaDecodeTime
    }

    this.fixWithSilence = function () {

    }

    this.push = function (data) {
        trackDecodeInfo.collectDtsInfo(track, data);

        if (track) {
            audioProperties.forEach(function (prop) {
                track[prop] = data[prop];
            });
        } // buffer audio data until end() is called


        adtsFrames.push(data);
    };

    this.flush = function () {
        var frames, mdat, boxes; // return early if no audio data has been observed

        if (adtsFrames.length === 0) {
            this.trigger('done', 'AudioSegmentStream');
            return;
        }

        frames = audioFrameUtils.trimAdtsFramesByEarliestDts(adtsFrames, track, earliestAllowedDts);
        track.baseMediaDecodeTime = trackDecodeInfo.calculateTrackBaseMediaDecodeTime(track, options.keepOriginalTimestamps); // amount of audio filled but the value is in video clock rather than audio clock
        this.fixWithSilence(track, frames); // we have to build the index from byte locations to

        track.samples = audioFrameUtils.generateSampleTable(frames); // concatenate the audio data to constuct the mdat
        mdat = audioFrameUtils.concatenateFrameData(frames);

        preview_mdat = mp4Generator.mdat(mdat);
        preview_moof = mp4Generator.moof(0, [track]);
        preview_boxes = new Uint8Array(preview_moof.byteLength + preview_mdat.byteLength); // bump the sequence number for next time
        preview_boxes.set(preview_moof);
        preview_boxes.set(preview_mdat, preview_moof.byteLength);

        adtsFrames = [];
        trackDecodeInfo.clearDtsInfo(track);

        boxes = mdat
        track.dataByteLength = boxes.byteLength
        track.audioBytes = boxes.length
        this.trigger('data', {
            track: track,
            boxes: boxes,
            preview_boxes: preview_boxes
        });
        this.trigger('done', 'AudioSegmentStream');
    };

    this.reset = function () {
        trackDecodeInfo.clearDtsInfo(track);
        adtsFrames = [];
        this.trigger('reset');
    };
};

_AudioSegmentStream$1.prototype = new stream();


// combine
/**
 * A Stream that can combine multiple streams (ie. audio & video)
 * into a single output segment for MSE. Also supports audio-only
 * and video-only streams.
 * @param options {object} transmuxer options object
 * @param options.keepOriginalTimestamps {boolean} If true, keep the timestamps
 *        in the source; false to adjust the first segment to start at media timeline start.
 */

_CoalesceStream = function CoalesceStream(options) {
    // Number of Tracks per output segment
    // If greater than 1, we combine multiple
    // tracks into a single segment
    this.numberOfTracks = 0;
    options = options || {};

    this.remuxTracks = true;
    this.keepOriginalTimestamps = false;

    this.pendingTracks = [];
    this.videoTrack = null;
    this.audioTrack = null;
    this.pendingBoxes = [];
    this.pendingBytes = 0;
    this.pendingPreveiw = [];
    this.pendingPreviewBytes = 0
    this.emittedTracks = 0;
    this.historyBytes = null

    _CoalesceStream.prototype.init.call(this); // Take output from multiple


    this.push = function (output) {
        // Add this track to the list of pending tracks and store
        // important information required for the construction of
        // the final segment

        this.pendingTracks.push(output.track);
        this.pendingBytes += output.boxes.byteLength; // TODO: is there an issue for this against chrome?
        this.pendingPreviewBytes += output.preview_boxes.byteLength
        // We unshift audio and push video because
        // as of Chrome 75 when switching from
        // one init segment to another if the video
        // mdat does not appear after the audio mdat
        // only audio will play for the duration of our transmux.

        if (output.track.type === 'video') {
            this.videoTrack = output.track;
            this.pendingBoxes.push(output.boxes);
            this.pendingPreveiw.push(output.preview_boxes);
        }

        if (output.track.type === 'audio') {
            this.audioTrack = output.track;
            this.pendingBoxes.unshift(output.boxes);
            this.pendingPreveiw.unshift(output.preview_boxes);
        }
    };
};

_CoalesceStream.prototype = new stream();

_CoalesceStream.prototype.flush = function (flushSource) {
    var offset = 0,
        event = {
            metadata: [],
            info: {}
        },
        initSegment, preview_initSegment,
        i;

    if (this.pendingTracks.length < this.numberOfTracks) {
        if (flushSource !== 'VideoSegmentStream' && flushSource !== 'AudioSegmentStream') {
            // Return because we haven't received a flush from a data-generating
            // portion of the segment (meaning that we have only recieved meta-data
            // or captions.)
            return;
        } else if (this.remuxTracks) {
            // Return until we have enough tracks from the pipeline to remux (if we
            // are remuxing audio and video into a single MP4)
            return;
        } else if (this.pendingTracks.length === 0) {
            // In the case where we receive a flush without any data having been
            // received we consider it an emitted track for the purposes of coalescing
            // `done` events.
            // We do this for the case where there is an audio and video track in the
            // segment but no audio data. (seen in several playlists with alternate
            // audio tracks and no audio present in the main TS segments.)
            this.emittedTracks++;

            if (this.emittedTracks >= this.numberOfTracks) {
                this.trigger('done');
                this.emittedTracks = 0;
            }

            return;
        }
    }

    if (this.videoTrack) {
        timelineStartPts = this.videoTrack.timelineStartInfo.pts;
        videoProperties.forEach(function (prop) {
            event.info[prop] = this.videoTrack[prop];
        }, this);
    } else if (this.audioTrack) {
        timelineStartPts = this.audioTrack.timelineStartInfo.pts;
        audioProperties.forEach(function (prop) {
            event.info[prop] = this.audioTrack[prop];
        }, this);
    }

    if (this.videoTrack || this.audioTrack) {
        if (this.pendingTracks.length === 1) {
            event.type = this.pendingTracks[0].type;
        } else {
            event.type = 'combined';
        }

        this.emittedTracks += this.pendingTracks.length;
        initSegment = mp4Generator.initSegment(this.pendingTracks, this.historyBytes); // Create a new typed array to hold the init segment
        preview_initSegment = mp4Generator.preview_initSegment(this.pendingTracks); // Create a new typed array to hold the init segment

        event.initSegment = new Uint8Array(initSegment.byteLength); // Create an init segment containing a moov
        event.preview_initSegment = new Uint8Array(preview_initSegment.byteLength); // Create an init segment containing a moov
        // and track definitions

        event.initSegment.set(initSegment); // Create a new typed array to hold the moof+mdats
        event.preview_initSegment.set(preview_initSegment); // Create a new typed array to hold the moof+mdats

        event.preview = new Uint8Array(this.pendingPreviewBytes); // Append each moof+mdat (one per track) together
        offset = 0
        for (i = 0; i < this.pendingPreveiw.length; i++) {
            event.preview.set(this.pendingPreveiw[i], offset);
            offset += this.pendingPreveiw[i].byteLength;
        }

        event.data = new Uint8Array(this.pendingBytes); // Append each moof+mdat (one per track) together
        offset = 0
        for (i = 0; i < this.pendingBoxes.length; i++) {
            event.data.set(this.pendingBoxes[i], offset);
            offset += this.pendingBoxes[i].byteLength;
        }

        this.pendingTracks.length = 0;
        this.videoTrack = null;
        this.audioTrack = null;
        this.pendingBoxes.length = 0;
        this.pendingPreveiw.length = 0;
        this.pendingBytes = 0;
        this.pendingPreviewBytes = 0
        this.trigger('data', event);
    } // Only emit `done` if all tracks have been flushed and emitted


    if (this.emittedTracks >= this.numberOfTracks) {
        this.trigger('done');
        this.emittedTracks = 0;
    }
};
_CoalesceStream.prototype.setHistory = function (history) {
    this.historyBytes = history
}
// box generator

/**
 * mux.js
 *
 * Copyright (c) Brightcove
 * Licensed Apache-2.0 https://github.com/videojs/mux.js/blob/master/LICENSE
 */

var intToByteArray = function (value) {
    // we want to represent the input as a 8-bytes array
    var byteArray = [0, 0, 0, 0];

    for (var index = 0; index < byteArray.length; index++) {
        var byte = value & 0xff;
        byteArray[byteArray.length - index - 1] = byte;
        value = (value - byte) / 256;
    }

    return byteArray;
};

var longToByteArray = function (value) {
    // we want to represent the input as a 8-bytes array
    var byteArray = [0, 0, 0, 0, 0, 0, 0, 0];

    for (var index = 0; index < byteArray.length; index++) {
        var byte = value & 0xff;
        byteArray[byteArray.length - index - 1] = byte;
        value = (value - byte) / 256;
    }

    return byteArray;
};

var MAX_UINT32$1 = Math.pow(2, 32);

var getUint64$4 = function getUint64(uint8) {
    var dv = new DataView(uint8.buffer, uint8.byteOffset, uint8.byteLength);
    var value;

    if (dv.getBigUint64) {
        value = dv.getBigUint64(0);

        if (value < Number.MAX_SAFE_INTEGER) {
            return Number(value);
        }

        return value;
    }

    return dv.getUint32(0) * MAX_UINT32$1 + dv.getUint32(4);
};

var numbers = {
    getUint64: getUint64$4,
    MAX_UINT32: MAX_UINT32$1
};

var MAX_UINT32 = numbers.MAX_UINT32;
var preview_mdia, preview_minf, preview_stbl, preview_trak, box, dinf, esds, ftyp, mdat, mfhd, minf, moof, moov, preview_moov, mvex, mvhd, trak, tkhd, mdia, mdhd, hdlr, sdtp, stbl, stsd, traf, trex, stts, stss, ctts, stsc, stsz, co64, edts, elst, trun$1, types, MAJOR_BRAND, MINOR_VERSION, AVC1_BRAND, VIDEO_HDLR, AUDIO_HDLR, HDLR_TYPES, VMHD, SMHD, DREF, STCO, STSC, STSZ, STTS; // pre-calculate constants

(function () {
    var i;
    types = {
        ctts: [],
        stss: [],
        avc1: [],
        // codingname
        avcC: [],
        btrt: [],
        dinf: [],
        dref: [],
        esds: [],
        ftyp: [],
        hdlr: [],
        mdat: [],
        mdhd: [],
        mdia: [],
        mfhd: [],
        minf: [],
        moof: [],
        moov: [],
        mp4a: [],
        // codingname
        mvex: [],
        mvhd: [],
        pasp: [],
        sdtp: [],
        smhd: [],
        stbl: [],
        stco: [],
        stsc: [],
        stsd: [],
        stsz: [],
        stts: [],
        styp: [],
        tfdt: [],
        tfhd: [],
        traf: [],
        trak: [],
        trun: [],
        trex: [],
        co64: [],
        tkhd: [],
        vmhd: [],
        edts: [],
        elst: []
    }; // In environments where Uint8Array is undefined (e.g., IE8), skip set up so that we
    // don't throw an error

    if (typeof Uint8Array === 'undefined') {
        return;
    }

    for (i in types) {
        if (types.hasOwnProperty(i)) {
            types[i] = [i.charCodeAt(0), i.charCodeAt(1), i.charCodeAt(2), i.charCodeAt(3)];
        }
    }

    MAJOR_BRAND = new Uint8Array(['i'.charCodeAt(0), 's'.charCodeAt(0), 'o'.charCodeAt(0), 'm'.charCodeAt(0)]);
    AVC1_BRAND = new Uint8Array(['a'.charCodeAt(0), 'v'.charCodeAt(0), 'c'.charCodeAt(0), '1'.charCodeAt(0)]);
    MINOR_VERSION = new Uint8Array([0, 0, 0, 1]);
    VIDEO_HDLR = new Uint8Array([0x00, // version 0
        0x00, 0x00, 0x00, // flags
        0x00, 0x00, 0x00, 0x00, // pre_defined
        0x76, 0x69, 0x64, 0x65, // handler_type: 'vide'
        0x00, 0x00, 0x00, 0x00, // reserved
        0x00, 0x00, 0x00, 0x00, // reserved
        0x00, 0x00, 0x00, 0x00, // reserved
        0x56, 0x69, 0x64, 0x65, 0x6f, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'VideoHandler'
    ]);
    AUDIO_HDLR = new Uint8Array([0x00, // version 0
        0x00, 0x00, 0x00, // flags
        0x00, 0x00, 0x00, 0x00, // pre_defined
        0x73, 0x6f, 0x75, 0x6e, // handler_type: 'soun'
        0x00, 0x00, 0x00, 0x00, // reserved
        0x00, 0x00, 0x00, 0x00, // reserved
        0x00, 0x00, 0x00, 0x00, // reserved
        0x53, 0x6f, 0x75, 0x6e, 0x64, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'SoundHandler'
    ]);
    HDLR_TYPES = {
        video: VIDEO_HDLR,
        audio: AUDIO_HDLR
    };
    DREF = new Uint8Array([0x00, // version 0
        0x00, 0x00, 0x00, // flags
        0x00, 0x00, 0x00, 0x01, // entry_count
        0x00, 0x00, 0x00, 0x0c, // entry_size
        0x75, 0x72, 0x6c, 0x20, // 'url' type
        0x00, // version 0
        0x00, 0x00, 0x01 // entry_flags
    ]);
    SMHD = new Uint8Array([0x00, // version
        0x00, 0x00, 0x00, // flags
        0x00, 0x00, // balance, 0 means centered
        0x00, 0x00 // reserved
    ]);
    STCO = new Uint8Array([0x00, // version
        0x00, 0x00, 0x00, // flags
        0x00, 0x00, 0x00, 0x00 // entry_count
    ]);
    STSC = STCO;
    STSZ = new Uint8Array([0x00, // version
        0x00, 0x00, 0x00, // flags
        0x00, 0x00, 0x00, 0x00, // sample_size
        0x00, 0x00, 0x00, 0x00 // sample_count
    ]);
    STTS = STCO;
    VMHD = new Uint8Array([0x00, // version
        0x00, 0x00, 0x01, // flags
        0x00, 0x00, // graphicsmode
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00 // opcolor
    ]);
})();

box = function box(type) {
    var payload = [],
        size = 0,
        i,
        result,
        view;

    for (i = 1; i < arguments.length; i++) {
        payload.push(arguments[i]);
    }

    i = payload.length; // calculate the total size we need to allocate

    while (i--) {
        size += payload[i].byteLength;
    }

    result = new Uint8Array(size + 8);
    view = new DataView(result.buffer, result.byteOffset, result.byteLength);
    view.setUint32(0, result.byteLength);
    result.set(type, 4); // copy the payload into the result

    for (i = 0, size = 8; i < payload.length; i++) {
        result.set(payload[i], size);
        size += payload[i].byteLength;
    }

    return result;
};

dinf = function dinf() {
    return box(types.dinf, box(types.dref, DREF));
};

esds = function esds(track) {
    return box(types.esds, new Uint8Array([0x00, // version
        0x00, 0x00, 0x00, // flags
        // ES_Descriptor
        0x03, // tag, ES_DescrTag
        0x19, // length
        0x00, 0x00, // ES_ID
        0x00, // streamDependenceFlag, URL_flag, reserved, streamPriority
        // DecoderConfigDescriptor
        0x04, // tag, DecoderConfigDescrTag
        0x11, // length
        0x40, // object type
        0x15, // streamType
        0x00, 0x06, 0x00, // bufferSizeDB
        0x00, 0x00, 0xda, 0xc0, // maxBitrate
        0x00, 0x00, 0xda, 0xc0, // avgBitrate
        // DecoderSpecificInfo
        0x05, // tag, DecoderSpecificInfoTag
        0x02, // length
        // ISO/IEC 14496-3, AudioSpecificConfig
        // for samplingFrequencyIndex see ISO/IEC 13818-7:2006, 8.1.3.2.2, Table 35
        track.audioobjecttype << 3 | track.samplingfrequencyindex >>> 1, track.samplingfrequencyindex << 7 | track.channelcount << 3, 0x06, 0x01, 0x02 // GASpecificConfig
    ]));
};

ftyp = function ftyp() {
    return box(types.ftyp, MAJOR_BRAND, MINOR_VERSION, MAJOR_BRAND, AVC1_BRAND);
};

hdlr = function hdlr(type) {
    return box(types.hdlr, HDLR_TYPES[type]);
};

mdat = function mdat(data) {
    return box(types.mdat, data);
};

mdhd = function mdhd(track) {
    var now = new Date().getTime()
    var timearr = intToByteArray(now)
    var result = new Uint8Array([0x00, // version 0
        0x00, 0x00, 0x00, // flags
        timearr[0], timearr[1], timearr[2], timearr[3], // creation_time
        timearr[0], timearr[1], timearr[2], timearr[3], // modification_time
        0x00, 0x01, 0x5f, 0x90, // timescale, 90,000 "ticks" per second
        track.duration >>> 24 & 0xFF, track.duration >>> 16 & 0xFF, track.duration >>> 8 & 0xFF, track.duration & 0xFF, // duration
        0x55, 0xc4, // 'und' language (undetermined)
        0x00, 0x00
    ]); // Use the sample rate from the track metadata, when it is
    // defined. The sample rate can be parsed out of an ADTS header, for
    // instance.

    if (track.samplerate) {
        result[12] = track.samplerate >>> 24 & 0xFF;
        result[13] = track.samplerate >>> 16 & 0xFF;
        result[14] = track.samplerate >>> 8 & 0xFF;
        result[15] = track.samplerate & 0xFF;
    }

    return box(types.mdhd, result);
};

mdia = function mdia(track, historyBytes) {
    return box(types.mdia, mdhd(track), hdlr(track.type), minf(track, historyBytes));
};
preview_mdia = function preview_mdia(track) {
    return box(types.mdia, mdhd(track), hdlr(track.type), preview_minf(track));
};

mfhd = function mfhd(sequenceNumber) {
    return box(types.mfhd, new Uint8Array([0x00, 0x00, 0x00, 0x00, // flags
        (sequenceNumber & 0xFF000000) >> 24, (sequenceNumber & 0xFF0000) >> 16, (sequenceNumber & 0xFF00) >> 8, sequenceNumber & 0xFF // sequence_number
    ]));
};

minf = function minf(track, historyBytes) {
    return box(types.minf, track.type === 'video' ? box(types.vmhd, VMHD) : box(types.smhd, SMHD), dinf(), stbl(track, historyBytes));
};

preview_minf = function preview_minf(track) {
    return box(types.minf, track.type === 'video' ? box(types.vmhd, VMHD) : box(types.smhd, SMHD), dinf(), preview_stbl(track));
};

moof = function moof(sequenceNumber, tracks) {
    var trackFragments = [],
        i = tracks.length; // build traf boxes for each track fragment

    while (i--) {
        trackFragments[i] = traf(tracks[i]);
    }

    return box.apply(null, [types.moof, mfhd(sequenceNumber)].concat(trackFragments));
};
/**
 * Returns a movie box.
 * @param tracks {array} the tracks associated with this movie
 * @see ISO/IEC 14496-12:2012(E), section 8.2.1
 */


moov = function moov(tracks, historyBytes) {
    var i = tracks.length,
        boxes = [];
    var audioBytes = null
    var videoBytes = null
    var final_duration = 0
    tracks.forEach(track => {
        if (audioBytes == null)
            audioBytes = track.audioBytes
        if (videoBytes == null)
            videoBytes = track.videoBytes
        if (track.samples.length > 0) {
            var duration = track.samples[track.samples.length - 1].duration
            if (track.samplerate)
                duration /= track.samplerate * clock.ONE_SECOND_IN_TS
            duration += track.samples[track.samples.length - 1].dts - track.samples[0].dts
            if (duration > final_duration)
                final_duration = duration
        }
    })
    historyBytes.total_duration += final_duration
    while (i--) {
        tracks[i].audioBytes = audioBytes
        tracks[i].videoBytes = videoBytes
        boxes[i] = trak(tracks[i], historyBytes);
    }

    return box.apply(null, [types.moov, mvhd(historyBytes.total_duration)].concat(boxes));
};

preview_moov = function moov(tracks) {
    var i = tracks.length,
        boxes = [];

    while (i--) {
        boxes[i] = preview_trak(tracks[i]);
    }

    return box.apply(null, [types.moov, mvhd(0xffffffff)].concat(boxes).concat(mvex(tracks)));
};

mvex = function mvex(tracks) {
    var i = tracks.length,
        boxes = [];

    while (i--) {
        boxes[i] = trex(tracks[i]);
    }

    return box.apply(null, [types.mvex].concat(boxes));
};

mvhd = function mvhd(duration) {
    var now = new Date().getTime() / 1000 + 2082873600 - 28800
    var timearr = intToByteArray(now)
    var bytes = new Uint8Array([0x00, // version 0
        0x00, 0x00, 0x00, // flags
        timearr[0], timearr[1], timearr[2], timearr[3], // creation_time
        timearr[0], timearr[1], timearr[2], timearr[3], // modification_time
        0x00, 0x01, 0x5f, 0x90, // timescale, 90,000 "ticks" per second
        (duration & 0xFF000000) >> 24, (duration & 0xFF0000) >> 16, (duration & 0xFF00) >> 8, duration & 0xFF, // duration
        0x00, 0x01, 0x00, 0x00, // 1.0 rate
        0x01, 0x00, // 1.0 volume
        0x00, 0x00, // reserved
        0x00, 0x00, 0x00, 0x00, // reserved
        0x00, 0x00, 0x00, 0x00, // reserved
        0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre_defined
        0xff, 0xff, 0xff, 0xff // next_track_ID
    ]);
    return box(types.mvhd, bytes);
};

sdtp = function sdtp(track) {
    var samples = track.samples || [],
        bytes = new Uint8Array(4 + samples.length),
        flags,
        i; // leave the full box header (4 bytes) all zero
    // write the sample table

    for (i = 0; i < samples.length; i++) {
        flags = samples[i].flags;
        bytes[i + 4] = flags.dependsOn << 4 | flags.isDependedOn << 2 | flags.hasRedundancy;
    }

    return box(types.sdtp, bytes);
};

stts = function stts(track, historyBytes) {
    var targetHistoryBytes = historyBytes[track.type]
    if (targetHistoryBytes.stts.result == null) {
        targetHistoryBytes.stts.result = []
    }
    var scale = 1
    if (track.type == 'audio') {
        scale = track.samplerate / clock.ONE_SECOND_IN_TS
    }
    track.samples.forEach(sample => {
        if (targetHistoryBytes.stts.lastDTS == null) {
            targetHistoryBytes.stts.last = sample.duration
            targetHistoryBytes.stts.count = 1
        } else if (targetHistoryBytes.stts.last == null) {
            targetHistoryBytes.stts.last = Math.round((sample.dts - targetHistoryBytes.stts.lastDTS) * scale)
            targetHistoryBytes.stts.count = 1
        } else if (targetHistoryBytes.stts.last == Math.round(((sample.dts - targetHistoryBytes.stts.lastDTS) * scale))) {
            targetHistoryBytes.stts.count += 1
        } else {
            targetHistoryBytes.stts.result.push([targetHistoryBytes.stts.last, targetHistoryBytes.stts.count, track.samplerate])
            targetHistoryBytes.stts.last = Math.round((sample.dts - targetHistoryBytes.stts.lastDTS) * scale)
            targetHistoryBytes.stts.count = 1
        }
        targetHistoryBytes.stts.lastDTS = sample.dts
    })
    targetHistoryBytes.stts.result.push([targetHistoryBytes.stts.last, targetHistoryBytes.stts.count, track.samplerate])
    targetHistoryBytes.stts.count = 0
    targetHistoryBytes.stts.last = null

    var length = 4 + 4 + (targetHistoryBytes.stts.result.length) * 8
    var bytes = new Uint8Array(length)
    offset = 4
    bytes.set(intToByteArray(targetHistoryBytes.stts.result.length), offset)
    offset += 4
    targetHistoryBytes.stts.result.forEach(pair => {
        bytes.set(intToByteArray(pair[1]), offset)
        offset += 4
        if (track.samplerate)
            bytes.set(intToByteArray(pair[0] / pair[2] * track.samplerate), offset)
        else
            bytes.set(intToByteArray(pair[0]), offset)
        offset += 4
    })

    return box(types.stts, bytes);
}

stss = function stss(track, historyBytes) {
    var targetHistoryBytes = historyBytes[track.type]
    if (targetHistoryBytes.stss.total == null) {
        targetHistoryBytes.stss.total = 0
        targetHistoryBytes.stss.count = 0
    }
    var result = []
    for (let idx = 0; idx < track.samples.length; idx++) {
        const sample = track.samples[idx];
        if (sample.flags.dependsOn == 2)
            result.push(targetHistoryBytes.stss.count + idx + 1)
    }

    var length = result.length * 4
    var new_bytes = new Uint8Array(length)
    var offset = 0
    result.forEach(idx => {
        new_bytes.set(intToByteArray(idx), offset)
        offset += 4
    })
    targetHistoryBytes.stss.count += track.samples.length
    targetHistoryBytes.stss.total += result.length
    targetHistoryBytes.stss.bytes.push(new_bytes)

    length = 4 + 4 + (targetHistoryBytes.stss.total) * 4
    var bytes = new Uint8Array(length)
    offset = 4
    bytes.set(intToByteArray(targetHistoryBytes.stss.total), offset)
    offset += 4
    targetHistoryBytes.stss.bytes.forEach(b => {
        bytes.set(b, offset)
        offset += b.length
    })

    return box(types.stss, bytes);
}

ctts = function ctts(track, historyBytes) {
    var targetHistoryBytes = historyBytes[track.type]
    if (targetHistoryBytes.ctts.total == null) {
        targetHistoryBytes.ctts.total = 0
    }
    var result = []
    track.samples.forEach(sample => {
        if (targetHistoryBytes.ctts.last == null) {
            targetHistoryBytes.ctts.last = sample.compositionTimeOffset
            targetHistoryBytes.ctts.count = 1
        } else if (targetHistoryBytes.ctts.last == sample.compositionTimeOffset) {
            targetHistoryBytes.ctts.count += 1
        } else {
            result.push([targetHistoryBytes.ctts.last, targetHistoryBytes.ctts.count])
            targetHistoryBytes.ctts.last = sample.compositionTimeOffset
            targetHistoryBytes.ctts.count = 1
        }
    })
    result.push([targetHistoryBytes.ctts.last, targetHistoryBytes.ctts.count])
    targetHistoryBytes.ctts.last = null

    var length = result.length * 8
    var new_bytes = new Uint8Array(length)
    var offset = 0
    result.forEach(pair => {
        new_bytes.set(intToByteArray(pair[1]), offset)
        offset += 4
        new_bytes.set(intToByteArray(pair[0]), offset)
        offset += 4
    })
    targetHistoryBytes.ctts.total += result.length
    targetHistoryBytes.ctts.bytes.push(new_bytes)

    length = 4 + 4 + (targetHistoryBytes.ctts.total) * 8
    var bytes = new Uint8Array(length)
    offset = 4
    bytes.set(intToByteArray(targetHistoryBytes.ctts.total), offset)
    offset += 4
    targetHistoryBytes.ctts.bytes.forEach(b => {
        bytes.set(b, offset)
        offset += b.length
    })

    return box(types.ctts, bytes);
}

stsc = function stsc(track, historyBytes) {
    var targetHistoryBytes = historyBytes[track.type]
    if (targetHistoryBytes.stsc.count == null) {
        targetHistoryBytes.stsc.count = []
    }
    targetHistoryBytes.stsc.count.push(track.samples.length)

    var length = 4 + 4 + (targetHistoryBytes.stsc.count.length) * 12
    var bytes = new Uint8Array(length)
    var offset = 4
    bytes.set(intToByteArray(targetHistoryBytes.stsc.count.length), offset)
    offset += 4
    for (let idx = 0; idx < targetHistoryBytes.stsc.count.length; idx++) {
        const element = targetHistoryBytes.stsc.count[idx];
        bytes.set(intToByteArray(idx + 1), offset)
        offset += 4
        bytes.set(intToByteArray(element), offset)
        offset += 4
        bytes.set(intToByteArray(1), offset)
        offset += 4
    }

    return box(types.stsc, bytes);
}

stsz = function stsz(track, historyBytes) {
    var targetHistoryBytes = historyBytes[track.type]
    if (targetHistoryBytes.stsz.count == null) {
        targetHistoryBytes.stsz.count = 0
    }
    var offset = 0
    var length = (track.samples.length) * 4
    var new_bytes = new Uint8Array(length)
    track.samples.forEach(sample => {
        new_bytes.set(intToByteArray(sample.size), offset)
        offset += 4
    })
    targetHistoryBytes.stsz.bytes.push(new_bytes)
    targetHistoryBytes.stsz.count += track.samples.length

    length = 4 + 4 + 4 + (targetHistoryBytes.stsz.count) * 4
    var bytes = new Uint8Array(length)
    offset = 8
    bytes.set(intToByteArray(targetHistoryBytes.stsz.count), offset)
    offset += 4
    targetHistoryBytes.stsz.bytes.forEach(b => {
        bytes.set(b, offset)
        offset += b.length
    })

    return box(types.stsz, bytes);
}

co64 = function co64(track, historyBytes) {
    var targetHistoryBytes = historyBytes[track.type]
    if (historyBytes.pending == null) {
        historyBytes.pending = 0
    }
    historyBytes.pending += 1
    if (targetHistoryBytes.co64.pos == null) {
        targetHistoryBytes.co64.pos = []
    }
    var base = historyBytes.count + historyBytes.mdatHead // mdap header
    if (track.type == 'video')
        base += track.audioBytes
    if (historyBytes.pending == 2) {
        historyBytes.pending = 0
        historyBytes.count += track.audioBytes + track.videoBytes + historyBytes.mdatHead
    }
    track.audioBytes = null
    track.videoBytes = null

    targetHistoryBytes.co64.pos.push(base)

    var offset = 4
    var length = 4 + 4 + (targetHistoryBytes.co64.pos.length) * 8
    var bytes = new Uint8Array(length)
    bytes.set(intToByteArray(targetHistoryBytes.co64.pos.length), offset)
    offset += 4
    targetHistoryBytes.co64.pos.forEach(pos => {
        bytes.set(longToByteArray(pos), offset)
        offset += 8
    })
    return box(types.co64, bytes);
}

stbl = function stbl(track, historyBytes) {
    if (track.type === 'video')
        return box(types.stbl, stsd(track), stts(track, historyBytes), stss(track, historyBytes), ctts(track, historyBytes), stsc(track, historyBytes), stsz(track, historyBytes), co64(track, historyBytes));
    else
        return box(types.stbl, stsd(track), stts(track, historyBytes), stsc(track, historyBytes), stsz(track, historyBytes), co64(track, historyBytes));
};

preview_stbl = function preview_stbl(track) {
    return box(types.stbl, stsd(track), box(types.stts, STTS), box(types.stsc, STSC), box(types.stsz, STSZ), box(types.stco, STCO));
};

(function () {
    var videoSample, audioSample;

    stsd = function stsd(track) {
        return box(types.stsd, new Uint8Array([0x00, // version 0
            0x00, 0x00, 0x00, // flags
            0x00, 0x00, 0x00, 0x01
        ]), track.type === 'video' ? videoSample(track) : audioSample(track));
    };

    videoSample = function videoSample(track) {
        var sps = track.sps || [],
            pps = track.pps || [],
            sequenceParameterSets = [],
            pictureParameterSets = [],
            i,
            avc1Box; // assemble the SPSs

        for (i = 0; i < sps.length; i++) {
            sequenceParameterSets.push((sps[i].byteLength & 0xFF00) >>> 8);
            sequenceParameterSets.push(sps[i].byteLength & 0xFF); // sequenceParameterSetLength

            sequenceParameterSets = sequenceParameterSets.concat(Array.prototype.slice.call(sps[i])); // SPS
        } // assemble the PPSs


        for (i = 0; i < pps.length; i++) {
            pictureParameterSets.push((pps[i].byteLength & 0xFF00) >>> 8);
            pictureParameterSets.push(pps[i].byteLength & 0xFF);
            pictureParameterSets = pictureParameterSets.concat(Array.prototype.slice.call(pps[i]));
        }

        avc1Box = [types.avc1, new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
            0x00, 0x01, // data_reference_index
            0x00, 0x00, // pre_defined
            0x00, 0x00, // reserved
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre_defined
            (track.width & 0xff00) >> 8, track.width & 0xff, // width
            (track.height & 0xff00) >> 8, track.height & 0xff, // height
            0x00, 0x48, 0x00, 0x00, // horizresolution
            0x00, 0x48, 0x00, 0x00, // vertresolution
            0x00, 0x00, 0x00, 0x00, // reserved
            0x00, 0x01, // frame_count
            0x13, 0x76, 0x69, 0x64, 0x65, 0x6f, 0x6a, 0x73, 0x2d, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x69, 0x62, 0x2d, 0x68, 0x6c, 0x73, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // compressorname
            0x00, 0x18, // depth = 24
            0x11, 0x11 // pre_defined = -1
        ]), box(types.avcC, new Uint8Array([0x01, // configurationVersion
            track.profileIdc, // AVCProfileIndication
            track.profileCompatibility, // profile_compatibility
            track.levelIdc, // AVCLevelIndication
            0xff // lengthSizeMinusOne, hard-coded to 4 bytes
        ].concat([sps.length], // numOfSequenceParameterSets
            sequenceParameterSets, // "SPS"
            [pps.length], // numOfPictureParameterSets
            pictureParameterSets // "PPS"
        ))), box(types.btrt, new Uint8Array([0x00, 0x1c, 0x9c, 0x80, // bufferSizeDB
            0x00, 0x2d, 0xc6, 0xc0, // maxBitrate
            0x00, 0x2d, 0xc6, 0xc0 // avgBitrate
        ]))];

        if (track.sarRatio) {
            var hSpacing = track.sarRatio[0],
                vSpacing = track.sarRatio[1];
            avc1Box.push(box(types.pasp, new Uint8Array([(hSpacing & 0xFF000000) >> 24, (hSpacing & 0xFF0000) >> 16, (hSpacing & 0xFF00) >> 8, hSpacing & 0xFF, (vSpacing & 0xFF000000) >> 24, (vSpacing & 0xFF0000) >> 16, (vSpacing & 0xFF00) >> 8, vSpacing & 0xFF])));
        }

        return box.apply(null, avc1Box);
    };

    audioSample = function audioSample(track) {
        return box(types.mp4a, new Uint8Array([ // SampleEntry, ISO/IEC 14496-12
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
            0x00, 0x01, // data_reference_index
            // AudioSampleEntry, ISO/IEC 14496-12
            0x00, 0x00, 0x00, 0x00, // reserved
            0x00, 0x00, 0x00, 0x00, // reserved
            (track.channelcount & 0xff00) >> 8, track.channelcount & 0xff, // channelcount
            (track.samplesize & 0xff00) >> 8, track.samplesize & 0xff, // samplesize
            0x00, 0x00, // pre_defined
            0x00, 0x00, // reserved
            (track.samplerate & 0xff00) >> 8, track.samplerate & 0xff, 0x00, 0x00 // samplerate, 16.16
            // MP4AudioSampleEntry, ISO/IEC 14496-14
        ]), esds(track));
    };
})();

tkhd = function tkhd(track) {
    var result = new Uint8Array([0x00, // version 0
        0x00, 0x00, 0x07, // flags
        0x00, 0x00, 0x00, 0x00, // creation_time
        0x00, 0x00, 0x00, 0x00, // modification_time
        (track.id & 0xFF000000) >> 24, (track.id & 0xFF0000) >> 16, (track.id & 0xFF00) >> 8, track.id & 0xFF, // track_ID
        0x00, 0x00, 0x00, 0x00, // reserved
        (track.duration & 0xFF000000) >> 24, (track.duration & 0xFF0000) >> 16, (track.duration & 0xFF00) >> 8, track.duration & 0xFF, // duration
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
        0x00, 0x00, // layer
        0x00, 0x00, // alternate_group
        0x01, 0x00, // non-audio track volume
        0x00, 0x00, // reserved
        0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
        (track.width & 0xFF00) >> 8, track.width & 0xFF, 0x00, 0x00, // width
        (track.height & 0xFF00) >> 8, track.height & 0xFF, 0x00, 0x00 // height
    ]);
    return box(types.tkhd, result);
};
/**
 * Generate a track fragment (traf) box. A traf box collects metadata
 * about tracks in a movie fragment (moof) box.
 */


traf = function traf(track) {
    var trackFragmentHeader, trackFragmentDecodeTime, trackFragmentRun, sampleDependencyTable, dataOffset, upperWordBaseMediaDecodeTime, lowerWordBaseMediaDecodeTime;
    trackFragmentHeader = box(types.tfhd, new Uint8Array([0x00, // version 0
        0x00, 0x00, 0x3a, // flags
        (track.id & 0xFF000000) >> 24, (track.id & 0xFF0000) >> 16, (track.id & 0xFF00) >> 8, track.id & 0xFF, // track_ID
        0x00, 0x00, 0x00, 0x01, // sample_description_index
        0x00, 0x00, 0x00, 0x00, // default_sample_duration
        0x00, 0x00, 0x00, 0x00, // default_sample_size
        0x00, 0x00, 0x00, 0x00 // default_sample_flags
    ]));
    upperWordBaseMediaDecodeTime = Math.floor(track.baseMediaDecodeTime / MAX_UINT32);
    lowerWordBaseMediaDecodeTime = Math.floor(track.baseMediaDecodeTime % MAX_UINT32);
    trackFragmentDecodeTime = box(types.tfdt, new Uint8Array([0x01, // version 1
        0x00, 0x00, 0x00, // flags
        // baseMediaDecodeTime
        upperWordBaseMediaDecodeTime >>> 24 & 0xFF, upperWordBaseMediaDecodeTime >>> 16 & 0xFF, upperWordBaseMediaDecodeTime >>> 8 & 0xFF, upperWordBaseMediaDecodeTime & 0xFF, lowerWordBaseMediaDecodeTime >>> 24 & 0xFF, lowerWordBaseMediaDecodeTime >>> 16 & 0xFF, lowerWordBaseMediaDecodeTime >>> 8 & 0xFF, lowerWordBaseMediaDecodeTime & 0xFF
    ])); // the data offset specifies the number of bytes from the start of
    // the containing moof to the first payload byte of the associated
    // mdat

    dataOffset = 32 + // tfhd
        20 + // tfdt
        8 + // traf header
        16 + // mfhd
        8 + // moof header
        8; // mdat header
    // audio tracks require less metadata

    if (track.type === 'audio') {
        trackFragmentRun = trun$1(track, dataOffset);
        return box(types.traf, trackFragmentHeader, trackFragmentDecodeTime, trackFragmentRun);
    } // video tracks should contain an independent and disposable samples
    // box (sdtp)
    // generate one and adjust offsets to match


    sampleDependencyTable = sdtp(track);
    trackFragmentRun = trun$1(track, sampleDependencyTable.length + dataOffset);
    return box(types.traf, trackFragmentHeader, trackFragmentDecodeTime, trackFragmentRun, sampleDependencyTable);
};
/**
 * Generate a track box.
 * @param track {object} a track definition
 * @return {Uint8Array} the track box
 */

elst = function elst(track, historyBytes) {
    var targetHistoryBytes = historyBytes[track.type]
    if (targetHistoryBytes.elst.block == null) {
        targetHistoryBytes.elst.block = []
        targetHistoryBytes.elst.duration = 0
        targetHistoryBytes.elst.paused = false
    }
    var self_range = track.audioRange
    var compare_range = track.videoRange
    var scale = 90000 / track.samplerate
    if (track.type == 'video') {
        self_range = track.videoRange
        compare_range = track.audioRange
        scale = 1
    }
    track.audioRange = null
    track.videoRange = null

    var duration = 0
    track.samples.forEach(sample => {
        duration += sample.duration
    })

    if (self_range[0] > compare_range[0]) {
        var diff = self_range[0] - compare_range[0]
        targetHistoryBytes.elst.block.push([diff, -1])
        targetHistoryBytes.elst.paused = true
    }
    targetHistoryBytes.elst.paused = false
    targetHistoryBytes.elst.block.push([duration * scale, targetHistoryBytes.elst.duration])
    targetHistoryBytes.elst.duration += duration
    if (self_range[1] < compare_range[1]) {
        var diff = compare_range[1] - self_range[1]
        targetHistoryBytes.elst.block.push([diff, -1])
        targetHistoryBytes.elst.paused = true
    }

    var length = targetHistoryBytes.elst.block.length * (8 * 2 + 4) + 4 + 4
    var new_bytes = new Uint8Array(length)
    new_bytes[0] = 1 // version
    var offset = 4
    new_bytes.set(intToByteArray(targetHistoryBytes.elst.block.length), offset)
    offset += 4
    targetHistoryBytes.elst.block.forEach(pair => {
        new_bytes.set(longToByteArray(pair[0]), offset)
        offset += 8
        new_bytes.set(longToByteArray(pair[1]), offset)
        offset += 8
        new_bytes.set(intToByteArray(0x00010000), offset)
        offset += 4
    })

    return box(types.elst, new_bytes);
};

elst = function elst(track, historyBytes) {
    var targetHistoryBytes = historyBytes[track.type]
    if(targetHistoryBytes.elst.startDTS == null) {
        targetHistoryBytes.elst.startDTS = track.samples[0].dts
    }
    var count = 2
    var length = count * (8 * 2 + 4) + 4 + 4
    var new_bytes = new Uint8Array(length)
    new_bytes[0] = 1 // version
    
    var offset = 4
    new_bytes.set(intToByteArray(count), offset)
    offset += 4

    new_bytes.set(longToByteArray(clock.ONE_SECOND_IN_TS * 155 / 1000), offset)
    offset += 8
    new_bytes.set(longToByteArray(-1), offset)
    offset += 8
    new_bytes.set(intToByteArray(0x00010000), offset)
    offset += 4

    
    var diff = track.samples[track.samples.length - 1].dts - targetHistoryBytes.elst.startDTS
    new_bytes.set(longToByteArray(diff), offset)
    offset += 8
    new_bytes.set(longToByteArray(0), offset)
    offset += 8
    new_bytes.set(intToByteArray(0x00010000), offset)
    offset += 4

    return box(types.elst, new_bytes);
}

edts = function edts(track, historyBytes) {
    return box(types.edts, elst(track, historyBytes));
};

trak = function trak(track, historyBytes) {
    track.duration = track.duration || 0xffffffff;
    if (track.type == 'video')
        return box(types.trak, tkhd(track), mdia(track, historyBytes));
    else
        return box(types.trak, tkhd(track), edts(track, historyBytes), mdia(track, historyBytes));
};

preview_trak = function preview_trak(track) {
    track.duration = track.duration || 0xffffffff;
    return box(types.trak, tkhd(track), preview_mdia(track));
};

trex = function trex(track) {
    var result = new Uint8Array([0x00, // version 0
        0x00, 0x00, 0x00, // flags
        (track.id & 0xFF000000) >> 24, (track.id & 0xFF0000) >> 16, (track.id & 0xFF00) >> 8, track.id & 0xFF, // track_ID
        0x00, 0x00, 0x00, 0x01, // default_sample_description_index
        0x00, 0x00, 0x00, 0x00, // default_sample_duration
        0x00, 0x00, 0x00, 0x00, // default_sample_size
        0x00, 0x01, 0x00, 0x01 // default_sample_flags
    ]); // the last two bytes of default_sample_flags is the sample
    // degradation priority, a hint about the importance of this sample
    // relative to others. Lower the degradation priority for all sample
    // types other than video.

    if (track.type !== 'video') {
        result[result.length - 1] = 0x00;
    }

    return box(types.trex, result);
};


(function () {
    var audioTrun, videoTrun, trunHeader; // This method assumes all samples are uniform. That is, if a
    // duration is present for the first sample, it will be present for
    // all subsequent samples.
    // see ISO/IEC 14496-12:2012, Section 8.8.8.1

    trunHeader = function trunHeader(samples, offset) {
        var durationPresent = 0,
            sizePresent = 0,
            flagsPresent = 0,
            compositionTimeOffset = 0; // trun flag constants

        if (samples.length) {
            if (samples[0].duration !== undefined) {
                durationPresent = 0x1;
            }

            if (samples[0].size !== undefined) {
                sizePresent = 0x2;
            }

            if (samples[0].flags !== undefined) {
                flagsPresent = 0x4;
            }

            if (samples[0].compositionTimeOffset !== undefined) {
                compositionTimeOffset = 0x8;
            }
        }

        return [0x00, // version 0
            0x00, durationPresent | sizePresent | flagsPresent | compositionTimeOffset, 0x01, // flags
            (samples.length & 0xFF000000) >>> 24, (samples.length & 0xFF0000) >>> 16, (samples.length & 0xFF00) >>> 8, samples.length & 0xFF, // sample_count
            (offset & 0xFF000000) >>> 24, (offset & 0xFF0000) >>> 16, (offset & 0xFF00) >>> 8, offset & 0xFF // data_offset
        ];
    };

    videoTrun = function videoTrun(track, offset) {
        var bytesOffest, bytes, header, samples, sample, i;
        samples = track.samples || [];
        offset += 8 + 12 + 16 * samples.length;
        header = trunHeader(samples, offset);
        bytes = new Uint8Array(header.length + samples.length * 16);
        bytes.set(header);
        bytesOffest = header.length;

        for (i = 0; i < samples.length; i++) {
            sample = samples[i];
            bytes[bytesOffest++] = (sample.duration & 0xFF000000) >>> 24;
            bytes[bytesOffest++] = (sample.duration & 0xFF0000) >>> 16;
            bytes[bytesOffest++] = (sample.duration & 0xFF00) >>> 8;
            bytes[bytesOffest++] = sample.duration & 0xFF; // sample_duration

            bytes[bytesOffest++] = (sample.size & 0xFF000000) >>> 24;
            bytes[bytesOffest++] = (sample.size & 0xFF0000) >>> 16;
            bytes[bytesOffest++] = (sample.size & 0xFF00) >>> 8;
            bytes[bytesOffest++] = sample.size & 0xFF; // sample_size

            bytes[bytesOffest++] = sample.flags.isLeading << 2 | sample.flags.dependsOn;
            bytes[bytesOffest++] = sample.flags.isDependedOn << 6 | sample.flags.hasRedundancy << 4 | sample.flags.paddingValue << 1 | sample.flags.isNonSyncSample;
            bytes[bytesOffest++] = sample.flags.degradationPriority & 0xF0 << 8;
            bytes[bytesOffest++] = sample.flags.degradationPriority & 0x0F; // sample_flags

            bytes[bytesOffest++] = (sample.compositionTimeOffset & 0xFF000000) >>> 24;
            bytes[bytesOffest++] = (sample.compositionTimeOffset & 0xFF0000) >>> 16;
            bytes[bytesOffest++] = (sample.compositionTimeOffset & 0xFF00) >>> 8;
            bytes[bytesOffest++] = sample.compositionTimeOffset & 0xFF; // sample_composition_time_offset
        }

        return box(types.trun, bytes);
    };

    audioTrun = function audioTrun(track, offset) {
        var bytes, bytesOffest, header, samples, sample, i;
        samples = track.samples || [];
        offset += 8 + 12 + 8 * samples.length;
        header = trunHeader(samples, offset);
        bytes = new Uint8Array(header.length + samples.length * 8);
        bytes.set(header);
        bytesOffest = header.length;

        for (i = 0; i < samples.length; i++) {
            sample = samples[i];
            bytes[bytesOffest++] = (sample.duration & 0xFF000000) >>> 24;
            bytes[bytesOffest++] = (sample.duration & 0xFF0000) >>> 16;
            bytes[bytesOffest++] = (sample.duration & 0xFF00) >>> 8;
            bytes[bytesOffest++] = sample.duration & 0xFF; // sample_duration

            bytes[bytesOffest++] = (sample.size & 0xFF000000) >>> 24;
            bytes[bytesOffest++] = (sample.size & 0xFF0000) >>> 16;
            bytes[bytesOffest++] = (sample.size & 0xFF00) >>> 8;
            bytes[bytesOffest++] = sample.size & 0xFF; // sample_size
        }

        return box(types.trun, bytes);
    };

    trun$1 = function trun(track, offset) {
        if (track.type === 'audio') {
            return audioTrun(track, offset);
        }

        return videoTrun(track, offset);
    };
})();
var mp4Generator = {
    mdat: mdat,
    moof: moof,
    preview_initSegment: function preview_initSegment(tracks) {
        var fileType = ftyp(),
            movie = preview_moov(tracks),
            result;
        result = new Uint8Array(fileType.byteLength + movie.byteLength);
        result.set(fileType);
        result.set(movie, fileType.byteLength);
        return result;
    },
    initSegment: function initSegment(tracks, historyBytes) {
        var fileType = ftyp(),
            movie = moov(tracks, historyBytes),
            result;
        result = new Uint8Array(fileType.byteLength + movie.byteLength);
        result.set(fileType);
        result.set(movie, fileType.byteLength);
        return result;
    }
};
// raw
RawDecoder = function RawDecoder() {
    RawDecoder.prototype.init.call(this);
    var self = this,
        initSegment = new Uint8Array();

    this.push = function (data) {
        this.trigger('data', {
            data: data,
            initSegment: initSegment,
            byteLength: data.byteLength
        })
    }; // flush any buffered data
    this.flush = function () {
        this.trigger('done')
    }
};
RawDecoder.prototype = new stream();