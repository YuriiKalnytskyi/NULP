require('dotenv');
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 4000;
const server = http.createServer(app);
const io = require("socket.io")(server);
const { v4: uuidv4 } = require('uuid');

server.listen(port, () => {
  console.log(`---- Server running on port [${port}]----`);
});

io.on('connection', (socket) => {
  socket.on('addData', () => {
    io.sockets.emit('addData', {
      user: uuidv4(),
    });
  })
})
