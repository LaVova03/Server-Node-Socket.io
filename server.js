const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Новое WebSocket соединение установлено.');

  socket.on('message', (message) => {
    console.log('Получено сообщение от клиента:', message);
    socket.emit('message', 'Привет, клиент!');
  });

  socket.on('disconnect', () => {
    console.log('WebSocket соединение закрыто.');
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`WebSocket сервер запущен на порту ${PORT}`);
});
