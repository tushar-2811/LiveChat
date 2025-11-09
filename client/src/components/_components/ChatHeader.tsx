import { User } from '@/context/appContext';
import { Menu, User2 } from 'lucide-react';
import React from 'react'

interface ChatHeaderProps {
  user: User | null;
  setSidebarOpen: (open: boolean) => void;
  isTyping: boolean;
}

const ChatHeader = ({
  user,
  setSidebarOpen,
  isTyping
}: ChatHeaderProps) => {
  return (
    <>
      {/* <div className='sm:hidden fixed top-5 right-4 z-30'>
        <button onClick={() => setSidebarOpen(true)}>
          <Menu className='w-5 h-5 text-black' />
        </button>
      </div> */}

      {
        user ? (
        <div className='flex items-center gap-2'>
          <User2 className='h-10 w-10' />
          <p className='text-black text-4xl'>
            {user?.name}
          </p>
        </div>
        // to show typing status
        ) : (
           <div className='flex items-center gap-2'>
          <User2 className='h-10 w-10' />
          <div>
            <h2 className='text-xl'>Select a Convo</h2>
             <p className='text-neutral-500 text-sm'>
              Choose a chat from sidebar to start texting
             </p>
          </div>
        </div>
        )
      }
    </>
  )
}

export default ChatHeader
