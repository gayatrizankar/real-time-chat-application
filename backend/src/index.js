// src/index.js
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./Routes/auth.route.js";
import messageRoutes from "./Routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { server, app } from "./lib/socket.js"; // Express instance from socket.js

dotenv.config();
connectDB(); // connect to MongoDB

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Get __dirname in ESM
const __dirname = path.resolve();

// CORS settings
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://your-frontend-domain.com", // replace with your deployed frontend domain if needed
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve frontend (for production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
}

// Health check route
app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
