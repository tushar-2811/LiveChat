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
    handleSendMessage : (e: any , imageFile: File | null) => void
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
    handleSendMessage
}: ChatContainerProps) => {
    return (
        <div className='max-w-[calc(100vw-259px)] relative'>
            <div className='w-full h-24 py-6 px-4 border-b-2 fixed top-0 z-50'>
                <ChatHeader
                    user={user}
                    setSidebarOpen={setSidebarOpen}
                    isTyping
                />
            </div>
            <ChatMessages
                selectedUser={selectedUser}
                messages={messages}
                loggedInUser={loggedInUser}
                currentChatId={currentChatId}
            />
           <div className='w-5/6 fixed bottom-0 z-100 '>
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
