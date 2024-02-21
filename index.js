const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));
// Listen for the connection
io.on('connection', (socket) => {
  console.log('User connected');

  // Listen for messages from the client
  socket.on('chat message', (data) => {
    // Broadcast the message to all connected clients
    io.emit('chat message', data); 
  });

  // Listen for disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server listening on 3000');
});
