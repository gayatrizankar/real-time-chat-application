import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Settings from './pages/SettingPage';
import Profile from './pages/Profile';
import { Loader } from "lucide-react";
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore';

const App = () => {
  const { authUser, isCheckingAuth, onlineUsers, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth(); // Automatically check auth on app start
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className="h-[100px] animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <div data-theme="retro">
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
};

export default App;
