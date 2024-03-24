import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";

const app = express();

const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: { origin: "*" },
});

const PORT = 5001;

io.on("connection", (socket) => {
  console.log("socket connect: ", socket.id);

  socket.broadcast.emit("join", `${socket.id} joined the queue!`);

  socket.on("disconnect", async () => {
    console.log("socket disconnect: ", socket.id);

    socket.broadcast.emit("leave", `${socket.id} left the queue!`);
  });
});

server.listen(PORT, () => {
  console.log(`Socket server running on port: ${PORT}`);
});
