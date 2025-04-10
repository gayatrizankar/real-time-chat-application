import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

const SideBar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } = useChatStore();
    const { onlineUsers } = useAuthStore();

    useEffect(() => {
        getUsers();
    }, []);

    const isUserOnline = (userId) => onlineUsers.includes(userId);

    const fallbackImg = 'https://i0.wp.com/sharethelife.org/wp-content/uploads/2021/01/Blank-profile-circle.png?ssl=1';

    return (
        <div className="h-full w-20 lg:w-64 bg-gray-800 border-r border-blue-300 flex flex-col transition-all duration-300">
            <div className="border-b border-blue-500 w-full p-5">
                <div className="flex items-center gap-2">
                    <span className="font-medium hidden lg:block text-white">Contacts</span>
                </div>
            </div>

            <div className="overflow-y-auto w-full py-3">
                {isUserLoading ? (
                    <p className="text-center text-gray-400">Loading users...</p>
                ) : users.length === 0 ? (
                    <p className="text-center text-gray-400">No users found</p>
                ) : (
                    users.map((user) => (
                        <button
                            key={user._id}
                            onClick={() => setSelectedUser(user)}
                            className={`w-full p-3 flex items-center gap-3 
                            hover:bg-blue-500 transition-colors ${
                                selectedUser?._id === user._id ? 'bg-blue-300 ring-1 ring-base-300' : ''
                            }`}
                        >
                            <div className="relative mx-auto lg:mx-0">
                                <img
                                    src={user.profilePic || fallbackImg}
                                    alt={user.fullName}
                                    className="size-12 object-cover rounded-full"
                                />
                                {isUserOnline(user._id) && (
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                                )}
                            </div>

                            <div className="hidden lg:block text-left min-w-0">
                                <div className="font-medium truncate text-white">{user.fullName}</div>
                                <div className={`text-sm ${isUserOnline(user._id) ? 'text-green-400' : 'text-zinc-400'}`}>
                                    {isUserOnline(user._id) ? 'Online' : 'Offline'}
                                </div>
                            </div>
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};

export default SideBar;
