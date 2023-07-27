const SOCKET_CLIENT_URL = 'http://localhost:3000';
const SOCKET_EVENT = {
  SEND_MESSAGE: 'send_message',
  RECEIVE_MESSAGE: 'receive_message',
};

const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: SOCKET_CLIENT_URL,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on(SOCKET_EVENT.SEND_MESSAGE, (data) => {
    socket.broadcast.emit(SOCKET_EVENT.RECEIVE_MESSAGE, data);
  });
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});
