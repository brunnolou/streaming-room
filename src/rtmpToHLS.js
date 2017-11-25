var ffmpeg = require("fluent-ffmpeg");
const { exec } = require('child_process');

const rtmpToHLS = (streamName, path) => {
  exec('ffmpeg -v verbose -i rtmp://localhost/live/live -c:v libx264 -c:a aac -ac 1 -strict -2 -crf 18 -profile:v baseline -maxrate 400k -bufsize 1835k -pix_fmt yuv420p -flags -global_header -hls_time 10 -hls_list_size 6 -hls_wrap 10 -start_number 1 public/videos/output.m3u8', 
  (err, stdout, stderr) => {
	  if (err) {
		// node couldn't execute the command
		return;
	  }

	  // the *entire* stdout and stderr (buffered)
	  console.log(`stdout: ${stdout}`);
	  console.log(`stderr: ${stderr}`);
  });
}

/*
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
    .addOption("-v", "verbose")
    .addOption("-s", "640x360")
    .addOption("-hls_time", 10)
    .addOption("-hls_wrap", 10)
    // include all the segments in the list
    .addOption("-hls_list_size", 0)
    .output(path + "output.m3u8");
*/
module.exports = rtmpToHLS;