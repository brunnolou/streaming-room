var path = require("path");
var ffmpeg = require("fluent-ffmpeg");
const { exec } = require("child_process");
const {
  hls: { input, maxrate, bufsize, output },
  videosPath,
  streamKey
} = require("../config.json");

const rtmpToHLS = () => {
  const command =
  "ffmpeg " +
  ` -i ${input}${streamKey} ` +
  ` -maxrate ${maxrate}` +
  ` -bufsize ${bufsize}` +
    " -v verbose " +
    " -c:v libx264 " +
    " -c:a aac " +
    " -ac 1 " +
    " -strict -2" +
    " -crf 18" +
    " -profile:v baseline" +
    " -pix_fmt yuv420p" +
    " -flags" +
    " -global_header" +
    " -hls_time 10" +
    " -hls_list_size 6" +
    " -hls_wrap 10" +
    " -start_number 1 " +
    path.join(videosPath, output);

    // ffmpeg -v verbose -i rtmp:localhost/live/live -c:v libx264 -c:a aac -ac 1 -strict -2 -crf 18 -profile:v baseline -maxrate 400k -bufsize 1835k -pix_fmt yuv420p -flags -global_header -hls_time 10 -hls_list_size 6 -hls_wrap 10 -start_number 1 public/videos/output.m3u8
    console.log('command: ', command);
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.log("ffmpeg error: ", err);
      return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`ffmpeg: ${stdout}`);
    console.log(`ffmpeg: ${stderr}`);
  });
};

module.exports = rtmpToHLS;
