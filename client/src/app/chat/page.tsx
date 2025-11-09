"use client";
import AppSidebar from '@/components/_components/AppSidebar';
import ChatContainer from '@/components/_components/ChatContainer';
import { SpinnerEmpty } from '@/components/_components/Spinner';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAppData , User } from '@/context/appContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import axios from 'axios';
import { config } from '@/config/config';

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
  const [currentChatId , setCurrentChatId] = useState<string | null>(null);
  const [message , setMessage] = useState<string>("");
  const [SideBarOpen , setSideBarOpen] = useState<boolean>(false);
  const [messages , setMessages] = useState<Message[] | null>(null);
  const [user , setUser] = useState<User | null>(null);
  const [showAllUsers , setShowAllUsers] = useState<boolean>(false);
  const [isTyping , setIsTyping] = useState<boolean>(false);
  const [typingTimeout , setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  
   const router = useRouter();

  const handleLogout = () => logoutUser();

  const fetchSingleChat = async() => {
      try {
        const token = Cookies.get("token");
        const {data} = await axios.get(`${config.CHAT_SERVICE.FETCH_SINGLE_CHAT}/${currentChatId}` , {
          headers : {
            Authorization : `Bearer ${token}`
          }
        });

        setMessages(data.messagesData);
        setUser(data.user.user);
        await fetchChats();
      } catch (error) {
         console.log("failed to load messages" , error);
         // toast
      }
  }

  const createChat = async(user: User) => {
      try {
         const token = Cookies.get("token");  
         const {data} = await axios.post(`${config.CHAT_SERVICE.CREATE_NEW_CHAT}`,{
           userId : loggedInUser?._id,
           otherUserId : user._id
         },{
           headers : {
            Authorization : `Bearer ${token}`
           }
         });
         console.log("create chat called" , data);
         setCurrentChatId(data.chatId);
         setSelectedUser(user._id);
         setShowAllUsers(false);
         await fetchChats();
      } catch (error) {
        console.log("error while creating chat" , error);
        // call toast
      }
  }

  const handleTyping = async(value: string) => {
      setMessage(value);

      if(!selectedUser) return;

      // socket setup
  }

  const handleSendMessage = async(e:any , imageFile: File | null) => {
      e.preventDefault();
      
  }



  useEffect(() => {
     if(!isAuthenticated && !userLoading){
        router.push('/login');
     }
  },[isAuthenticated , userLoading , router]);

  useEffect(() => {
    if(selectedUser){
      fetchSingleChat();
    }
  },[selectedUser])


  if(userLoading || (!userLoading && !isAuthenticated)){
    return <SpinnerEmpty/>
  }

  return (
   <div className='min-h-screen flex relative overflow-hidden'>
      <SidebarProvider>
       <div>
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
          setCurrentChatId={setCurrentChatId}
          handleLogout={handleLogout}
          createChat={createChat}
        />
       </div>
      </SidebarProvider>
      <div className='min-w-full'>
        <ChatContainer 
        user={user} 
        setSidebarOpen={setSideBarOpen}
        isTyping={isTyping}
        selectedUser={selectedUser}
        loggedInUser={loggedInUser}
        messages={messages}
        currentChatId={currentChatId}
        />
      </div>
   </div>
  )
}

export default page
