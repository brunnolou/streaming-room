const RtmpServer = require('rtmp-server');
const rtmpServer = new RtmpServer();

rtmpServer.on('error', err => {
  throw err;
});

let nowWatching = 0;

const renderWatchCount = count => {
  console.log('┌──────────────────────┬───┐');
  console.log('│ NOW WATCHING:        │', count, '│');
  console.log('├──────────────────────┴───┤');
  console.log('│', new Date().toISOString().replace('T', ' '), '│');
  console.log('└──────────────────────────┘');
}

rtmpServer.on('client', client => {
  //client.on('command', command => {
  //  console.log(command.cmd, command);
  //});

  client.on('connect', () => {
  });

  client.on('play', ({ streamName }) => {
    nowWatching++;
    console.log('Play');
    renderWatchCount(nowWatching);
  });

  client.on('stop', () => {
    nowWatching--;
    console.log('Disconnected');
    renderWatchCount(nowWatching);
  });

  client.on('publish', ({ streamName }) => {
    console.log('Publish - ', streamName, ' ', new Date().toISOString());
    console.log('--------------------------------');
  });
});

rtmpServer.listen(1935);
