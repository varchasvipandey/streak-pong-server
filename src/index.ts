import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import { RecvEvents, SendEvents } from "./types/socket-events";

const app = express();

const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: { origin: "*" },
});

const PORT = 5001;

io.on("connection", (socket) => {
  console.log("socket connect: ", socket.id);

  socket.on(RecvEvents.JoinQueue, (playerName) => {
    io.emit(SendEvents.SomeoneJoined, `${playerName} joined!`);
  });

  socket.on("disconnect", async () => {
    console.log("socket disconnect: ", socket.id);

    socket.broadcast.emit(SendEvents.SomeoneLeft, `Someone left!`);
  });
});

server.listen(PORT, () => {
  console.log(`Socket server running on port: ${PORT}`);
});
