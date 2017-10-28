var ffmpeg = require("fluent-ffmpeg");

const rtmpToHLS = (streamName, path) =>
  ffmpeg("rtmp://localhost:1935/live/" + streamName, { timeout: 432000 })
    // set video bitrate
    .videoBitrate(1024)
    // set target codec
    .videoCodec("libx264")
    // set audio bitrate
    .audioBitrate("128k")
    // set audio codec
    .audioCodec("aac")
    // set number of audio channels
    .audioChannels(2)
    // set hls segments time
    .addOption("-s", "640x360")
    .addOption("-hls_time", 10)
    .addOption("-hls_wrap", 10)
    // include all the segments in the list
    .addOption("-hls_list_size", 0)
    .output(path + "output.m3u8");

module.exports = rtmpToHLS;
