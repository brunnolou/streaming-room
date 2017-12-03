const path = require('path');
const { exec } = require('child_process');
const {
  hls: {
    input, maxrate, bufsize, output,
  },
  videosPath,
  streamKey,
} = require('../config.json');

const rtmpToHLS = () => {
  const command = `${'ffmpeg ' +
    ` -i ${input}${streamKey} ` +
    ` -maxrate ${maxrate}` +
    ` -bufsize ${bufsize}` +
    ' -v verbose ' +
    ' -c:v libx264 ' +
    ' -c:a aac ' +
    ' -ac 1 ' +
    ' -strict -2' +
    ' -crf 18' +
    ' -profile:v baseline' +
    ' -pix_fmt yuv420p' +
    ' -flags' +
    ' -global_header' +
    ' -hls_time 10' +
    ' -hls_list_size 6' +
    ' -hls_wrap 10' +
    ' -start_number 1 '}${path.join(videosPath, output)}`;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.log('ffmpeg error: ', err);
      return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`ffmpeg: ${stdout}`);
    console.log(`ffmpeg: ${stderr}`);
  });
};

module.exports = rtmpToHLS;
