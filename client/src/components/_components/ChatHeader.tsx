import { User } from '@/context/appContext';
import { Menu, User2 } from 'lucide-react';
import React from 'react'
import { SidebarTrigger } from '../ui/sidebar';

interface ChatHeaderProps {
  user: User | null;
  setSidebarOpen: (open: boolean) => void;
  isTyping: boolean;
  onlineUsers: string[]
}

const ChatHeader = ({
  user,
  setSidebarOpen,
  isTyping,
  onlineUsers
}: ChatHeaderProps) => {
   const isUserOnline = onlineUsers.includes(user?._id as string);
  return (
    <>
      <div className='sm:hidden fixed top-8 right-4 z-30'>
        {/* <button onClick={() => setSidebarOpen(true)}>
          <Menu className='w-5 h-5 text-black' />
        </button> */}
        <SidebarTrigger/>
      </div>

      {
        user ? (
        <div className='flex items-center gap-2 relative'>
          <User2 className='h-10 w-10' />
          <p className='text-black text-4xl'>
            {user?.name} 
           {/* typing */}
          </p>
          {
             isUserOnline && <span className='absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-500'>
               <span className='absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75'></span>
            </span>
          }
        </div>
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
