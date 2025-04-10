import React, { useLayoutEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import ChatHeader from '../components/ChatHeader';
import MessageInputs from '../components/MessageInputs';
import MessageSkeletons from '../components/skeletons/MessageSkeletons';

const ChatContainer = () => {
    const { messages, isMessagesLoading, selectedUser } = useChatStore();
    const { authUser } = useAuthStore();
    const messagesEndRef = useRef(null);

    // ✅ Effect for subscribing to messages when selected user changes
    React.useEffect(() => {
        if (!selectedUser?._id) return;

        const { getMessages, subscribeToMessages, unsubscribeFromMessages } = useChatStore.getState();

        getMessages(selectedUser._id);
        subscribeToMessages();

        return () => {
            unsubscribeFromMessages();
        };
    }, [selectedUser?._id]);

    // ✅ Auto-scroll to latest message after messages update
    useLayoutEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // No user selected fallback
    if (!selectedUser) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
                <p>Select a chat to start messaging</p>
            </div>
        );
    }

    // Loading state
    if (isMessagesLoading) {
        return (
            <div className='flex-1 flex flex-col overflow-auto bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow-lg'>
                <ChatHeader />
                <MessageSkeletons />
                <MessageInputs />
            </div>
        );
    }

    // ✅ Main chat UI
    return (
        <div className='flex-1 flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden'>
            <ChatHeader />

            {/* Messages */}
            <div className='flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent'>
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`relative max-w-[75%] p-3 rounded-lg shadow-md text-sm ${
                                msg.senderId === authUser?._id
                                    ? 'ml-auto bg-blue-500 text-white'
                                    : 'mr-auto bg-gray-200 dark:bg-gray-700 dark:text-white'
                            }`}
                        >
                            <div>{msg.text}</div>

                            <div className="absolute bottom-1 right-2 text-xs text-black dark:text-white">
                                {msg.createdAt ? formatMessageTime(msg.createdAt) : null}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No messages yet</p>
                )}
                {/* ✅ Scroll target */}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 p-4 shadow-lg">
                <MessageInputs />
            </div>
        </div>
    );
};

// ✅ Helper to format message time
export function formatMessageTime(date) {
    return new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

export default ChatContainer;
