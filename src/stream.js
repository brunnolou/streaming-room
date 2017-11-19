const RtmpServer = require("rtmp-server");
const rtmpServer = new RtmpServer();
const rtmpToHLS = require("./rtmpToHLS");
const del = require("del");
const chalk = require("chalk");

const videoPath = "../public/videos/";

rtmpServer.on("error", err => {
  throw err;
});

rtmpServer.on("client", client => {
  // client.on('command', command => {
  //  console.log(chalk.yellow(command.cmd), command);
  // });

  client.on("connect", () => {
    console.log(chalk.blue("CONNECT"), client.app);
  });

  client.on("play", ({ streamName }) => {
    console.log(chalk.blue("PLAY"), streamName);
  });

  client.on("publish", ({ streamName }) => {
    rtmpToHLS(streamName, videoPath);
    console.log(chalk.blue("PUBLISH"), streamName);
  });

  client.on("stop", () => {
    console.log(chalk.red("client disconnected"));
  });
});

rtmpServer.listen(1935);
