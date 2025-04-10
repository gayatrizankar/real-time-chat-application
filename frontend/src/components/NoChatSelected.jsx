import React from 'react'
import {MessageSquare} from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className='w-full flex flex-1 flex-col items-center justify-center p-16 bg-blue-100'>
        <div className='max-w-mid text-center '>
            <div className='flex justify-center gap-4'>
                <div className='relative'>
                    <div className='w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center animate-bounce'>
                    <MessageSquare className=' w-8 h-8 text-primary' />
                    </div>
                </div>
            </div>

            <h2 className='font-bold text-2xl'>WELCOME TO CHATTY!!!</h2>
            <p className='text-base-content/6'>
            Select the conversatio from sidebar to start a chat
            </p>
        </div>
    </div>
  )
}

export default NoChatSelected
