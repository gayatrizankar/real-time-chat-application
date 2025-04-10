import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true,
  },
});

const onlineUsers = new Map();

function getReciverSocketId(userId) {
  return onlineUsers.get(userId);
}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log(`✅ User connected: ${socket.id}, User ID: ${userId}`);

  if (userId) {
    onlineUsers.set(userId, socket.id);
    socket.join(userId);
    io.emit("online-users", Array.from(onlineUsers.keys()));
  }

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
    if (userId) {
      onlineUsers.delete(userId);
      io.emit("online-users", Array.from(onlineUsers.keys()));
    }
  });

  socket.on("message", (data) => {
    console.log("📨 Message received:", data);
    io.emit("message", data);
  });
});

// ✅ Export everything you need
export { app, server, io, getReciverSocketId };
