import express = require('express');
import http = require('http');
import path = require('path');
import sio = require('socket.io');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));
const server = http.createServer(app);

const port = 8080;
server.listen(port, () => console.log(`Server is listening on port ${port}...`));

// Handle the connection of new websocket clients
sio(server).on('connection', (socket) => {
  // Handle an ArrowKey event
  socket.on('ArrowKey', function(code) {
    console.log(`${code} pressed`);

    // Broadcast the event to all connected clients except the sender
    socket.broadcast.emit('ArrowKey', code);
  });
});