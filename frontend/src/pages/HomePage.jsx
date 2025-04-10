import React from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import SideBar from '../components/SideBar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  console.log("✅ Online Users on HomePage:", onlineUsers);

  return (
    <div className="h-screen bg-blue-300 flex justify-center items-center p-4">
      <div className="bg-blue-100 rounded-2xl shadow-lg w-full max-w-6xl h-[calc(100vh-4rem)]">
        <div className="flex h-full rounded-lg overflow-hidden">
          <SideBar />
          {selectedUser ? <ChatContainer /> : <NoChatSelected />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
