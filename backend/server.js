import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

const server = http.createServer();

// Configure Socket.IO options (optional)
const ioOptions = {
  cors: {
    origin: "*",
  },
};

const io = new SocketIOServer(server, ioOptions);

const users = {};

io.on("connection", (socket) => {
  socket.on("setUsername", ({ username, avatar }) => {
    users[socket.id] = { username, avatar };
    io.emit("users", users);
  });

  socket.on("message", (data) => {
    const message = {
      id: uuidv4(),
      userId: socket.id,
      username: users[socket.id].username,
      avatar: users[socket.id].avatar,
      text: data,
    };
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("users", users);
  });
});

server.listen(80, () => {
  console.log("Server running on port 80");
});
