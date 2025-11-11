import React from 'react'
import ChatHeader from './ChatHeader'
import { User } from '@/context/appContext';
import ChatMessages from './ChatMessages';
import { Message } from '@/app/chat/page';
import MessageInput from './MessageInput';

interface ChatContainerProps {
    user: User | null;
    setSidebarOpen: (open: boolean) => void;
    isTyping: boolean;
    selectedUser: string | null;
    messages: Message[] | null;
    loggedInUser: User | null;
    currentChatId : string | null;
    message : string;
    setMessage: (message: string) => void;
    handleSendMessage : (e: any , imageFile: File | null) => void;
    onlineUsers : string[]
}


const ChatContainer = ({
    user,
    setSidebarOpen,
    isTyping,
    selectedUser,
    messages,
    loggedInUser,
    currentChatId,
    message,
    setMessage,
    handleSendMessage,
    onlineUsers
}: ChatContainerProps) => {
    return (
        <div className=''>
            <div className=' h-24 py-6 px-4 border-b-2'>
                <ChatHeader
                    user={user}
                    setSidebarOpen={setSidebarOpen}
                    isTyping
                    onlineUsers={onlineUsers}
                />
            </div>
            <ChatMessages
                selectedUser={selectedUser}
                messages={messages}
                loggedInUser={loggedInUser}
                currentChatId={currentChatId}
            />
           <div className=''>
             <MessageInput
                currentChatId={currentChatId}
                message={message}
                selectedUser={selectedUser}
                setMessage={setMessage}
                handleSendMessage={handleSendMessage}
            />
           </div>
        </div>
    )
}

export default ChatContainer
