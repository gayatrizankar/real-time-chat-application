import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="h-16 w-full bg-blue-500 flex justify-between items-center px-6 text-white">
      <Link to="/" className="text-2xl font-bold">Chatty</Link>
      <div className="flex gap-6">
        {authUser ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/settings">Settings</Link>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-1 rounded-md">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
