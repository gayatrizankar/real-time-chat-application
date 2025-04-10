import React from 'react';


const MessageSkeletons = () => {
    const skeletonMessages = Array(6).fill(null);

    return (
        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
            {skeletonMessages.map((_, index) => (
                <div key={index} className={`flex items-center gap-3 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className="w-[100px] h-[50px] bg-gray-300 rounded-full"></div>
                    <div className="w-[100px] h-[50px] rounded"></div>
                </div>
            ))}
        </div>
    );
};

export default MessageSkeletons;
