import React from 'react';
import { X } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();

    if (!selectedUser) {
        return <div className='p-3 border-b border-gray-300 text-center text-gray-500'>No user selected</div>;
    }

    return (
        <div className='p-3 border-b border-gray-300 bg-white flex justify-between items-center'>
            <div className='flex items-center gap-3'>
                <img 
                    src="https://i0.wp.com/sharethelife.org/wp-content/uploads/2021/01/Blank-profile-circle.png?ssl=1" 
                    alt={selectedUser?.fullName || "User"} 
                    className="w-10 h-10 rounded-full"
                />

                <div>
                    <h3 className='font-semibold'>{selectedUser?.fullName || "Unknown User"}</h3>
                    <p className='text-sm text-gray-500'>
                        {onlineUsers?.includes(selectedUser?._id) ? 'Online' : 'Offline'}
                    </p>
                </div>
            </div>

            <button onClick={() => setSelectedUser(null)} className="text-gray-600 hover:text-gray-800">
                <X size={20} />
            </button>
        </div>
    );
};

export default ChatHeader;
