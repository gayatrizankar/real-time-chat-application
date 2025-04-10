import express from "express";
import { protectRoute } from "../Middlewares/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage
} from "../Controllers/message.controllers.js";

const router = express.Router();

// 🔐 Protected Routes
router.get("/users", protectRoute, getUsersForSidebar); // Sidebar users
router.get("/:id", protectRoute, getMessages);           // Fetch messages with selected user
router.post("/send/:id", protectRoute, sendMessage);     // Send message to selected user

export default router;
