'use strict';

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));

  // receives a message from client
  // and replies back
  socket.on('client-msg', (msg) => {
    console.log('server log - server received a message: ' + msg);
    socket.emit(
      'server-reply',
      "Thanks for the following message: '" + msg + "', very cuute! ^^"
    );
  });
});
