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
}


const ChatContainer = ({
    user,
    setSidebarOpen,
    isTyping,
    selectedUser,
    messages,
    loggedInUser,
    currentChatId
}: ChatContainerProps) => {
    return (
        <div className='max-w-[calc(100vw-259px)]'>
            <div className='w-full h-24 py-6 px-4 border-b-2'>
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
            <MessageInput/>
        </div>
    )
}

export default ChatContainer
