"use client";
import AppSidebar from '@/components/_components/AppSidebar';
import { SpinnerEmpty } from '@/components/_components/Spinner';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAppData , User } from '@/context/appContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export interface Message{
   _id : string;
   chatId : string;
   sender : string;
   text ?: string;
   image ?: {
       url : string;
       publicId : string;
   };
   messageType : "text" | "image";
   isSeen : boolean;
   seenAt ?: string;
   createdAt : string;
}

const page = () => {
  const {
    isAuthenticated , 
    logoutUser , 
    chats , 
    user: loggedInUser , 
    users , 
    fetchChats , 
    setChats, 
    loading: userLoading
  } = useAppData();
  
  const [selectedUser , setSelectedUser] = useState<string | null>(null);
  const [currentMessage , setCurrentMessage] = useState<string>("");
  const [SideBarOpen , setSideBarOpen] = useState<boolean>(false);
  const [messages , setMessages] = useState<Message[] | null>(null);
  const [user , setUser] = useState<User | null>(null);
  const [showAllUsers , setShowAllUsers] = useState<boolean>(false);
  const [isTyping , setIsTyping] = useState<boolean>(false);
  const [typingTimeout , setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const router = useRouter();

  const handleLogout = () => logoutUser();

  useEffect(() => {
     if(!isAuthenticated && !userLoading){
        router.push('/login');
     }
  },[isAuthenticated , userLoading , router]);

  if(userLoading || (!userLoading && !isAuthenticated)){
    return <SpinnerEmpty/>
  }

  return (
    <div className='min-h-screen flex bg-black text-white relative overflow-hidden'>
        <SidebarProvider>
          <AppSidebar
             sidebarOpen={SideBarOpen}
             setSidebarOpen={setSideBarOpen}
             showAllUsers={showAllUsers}
             setShowAllUsers={setShowAllUsers}
             users={users}
             loggedInUser={loggedInUser}
             chats={chats}
             selectedUser={selectedUser}
             setSelectedUser={setSelectedUser}
             handleLogout={handleLogout}
          />
        </SidebarProvider>
    </div>
  )
}

export default page
