// store/useAuthStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "/";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  // ✅ Check if user is already logged in
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket(); // ✅ Connect socket if authenticated
    } catch (error) {
      console.error("Error in checkAuth:", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // ✅ Signup
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("🎉 Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // ✅ Login
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("🎉 Logged in successfully");
      get().connectSocket();
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // ✅ Logout
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      get().disconnectSocket(); // ✅ Disconnect socket
      set({ authUser: null, onlineUsers: [] });
      toast.success("👋 Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  // ✅ Update profile
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("✅ Profile updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // ✅ Connect Socket.IO
  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const newSocket = io(BASE_URL, {
      query: { userId: authUser._id },
      transports: ["websocket"],
      withCredentials: true,
    });

    newSocket.on("connect", () => {
      console.log("✅ Socket connected:", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
    });

    newSocket.on("online-users", (users) => {
      console.log("📡 Online Users Updated:", users);
      set({ onlineUsers: users });
    });

    set({ socket: newSocket });
  },

  // ✅ Disconnect Socket.IO
  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      console.log("🔌 Socket disconnected");
      set({ socket: null });
    }
  },
}));
