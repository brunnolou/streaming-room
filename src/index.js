// Setup basic express server
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const webServer = require('./webServer');
const chatServer = require('./chatServer');
const { deleteVideos } = require('./utils');
const rtmpServer = require('./rtmpServer');

async function App() {
  const app = express();
  const server = http.createServer(app);
  const io = socketIo(server);

  deleteVideos();

  // Start web server.
  webServer(app, server);

  // Start chat server.
  const socket = await chatServer(io);

  // Start stream server.
  rtmpServer(socket);
}

module.exports = App;
