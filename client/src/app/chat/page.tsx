"use client";
import AppSidebar from '@/components/_components/AppSidebar';
import ChatContainer from '@/components/_components/ChatContainer';
import { SpinnerEmpty } from '@/components/_components/Spinner';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAppData, User } from '@/context/appContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import axios from 'axios';
import { config } from '@/config/config';
import { useSocket } from '@/context/socketContext';


export interface Message {
  _id: string;
  chatId: string;
  sender: string;
  text?: string;
  image?: {
    url: string;
    publicId: string;
  };
  messageType: "text" | "image";
  isSeen: boolean;
  seenAt?: string;
  createdAt: string;
}

const page = () => {
  const {
    isAuthenticated,
    logoutUser,
    chats,
    user: loggedInUser,
    users,
    fetchChats,
    setChats,
    loading: userLoading
  } = useAppData();

  const {
    onlineUsers,
    socket
  } = useSocket();

  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [SideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showAllUsers, setShowAllUsers] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const router = useRouter();

  const handleLogout = () => logoutUser();

  const fetchSingleChat = async () => {
    try {
      const token = Cookies.get("token");
      const { data } = await axios.get(`${config.CHAT_SERVICE.FETCH_SINGLE_CHAT}/${currentChatId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessages(data.messagesData);
      setUser(data.user.user);
      await fetchChats();
    } catch (error) {
      console.log("failed to load messages", error);
      // toast
    }
  }

  const moveChatToTop = async (chatId: string, newMessage: any, updatedUnSeenCount = true) => {
    setChats((prev) => {
      if (!prev) {
        return null;
      }

      const updatedChats = [...prev];
      const chatIndex = updatedChats.findIndex((chat) => chat.chat._id === chatId);

      if (chatIndex !== -1) {
        const [moveChat] = updatedChats.splice(chatIndex, 1);

        const updatedChat = {
          ...moveChat,
          chat: {
            ...moveChat.chat,
            latestMessage: {
              text: newMessage.text,
              sender: newMessage.sender
            },
            updatedAt : new Date().toString(),
            unSeenCount : updatedUnSeenCount && newMessage.sender !== loggedInUser?._id ? (moveChat.chat.unSeenCount || 0)+1 : moveChat.chat.unSeenCount || 0}
        };
        updatedChats.unshift(updatedChat);
      }
      return updatedChats;
    })
  }

  const resetUnseenCount = () => {}

  const createChat = async (user: User) => {
    try {
      const token = Cookies.get("token");
      const { data } = await axios.post(`${config.CHAT_SERVICE.CREATE_NEW_CHAT}`, {
        userId: loggedInUser?._id,
        otherUserId: user._id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("create chat called", data);
      setCurrentChatId(data.chatId);
      setSelectedUser(user._id);
      setShowAllUsers(false);
      await fetchChats();
    } catch (error) {
      console.log("error while creating chat", error);
      // call toast
    }
  }

  const handleTyping = async (value: string) => {
    setMessage(value);

    if (!selectedUser || !socket) return;

    // socket setup
    // if (value.trim()) {
    //   socket.emit("typing", ({
    //     chatId: currentChatId,
    //     userId: loggedInUser?._id
    //   }))
    // }

    // if(typingTimeout){
    //   clearTimeout(typingTimeout);
    // }



  }

  const handleSendMessage = async (e: any, imageFile: File | null) => {
    e.preventDefault();

    if (!message.trim() && !imageFile) {
      return;
    }

    if (!selectedUser) {
      return;
    }

    // socket work
    // if (typingTimeout) {
    //   clearTimeout(typingTimeout);
    //   setTypingTimeout(null);
    // }

    // socket?.emit("stopTyping", ({
    //   chatId: currentChatId,
    //   userId: loggedInUser?._id
    // }))

    const token = Cookies.get("token");
    try {
      const formData = new FormData();
      formData.append("chatId", currentChatId as string);

      if (message.trim()) {
        formData.append("text", message);
      }

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const { data } = await axios.post(`${config.CHAT_SERVICE.SEND_MESSAGE}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      console.log("message data", data);

      setMessages((prev) => {
        const currentMessages = prev || [];
        const messageExists = currentMessages.some((msg) => msg._id === data.data._id);

        if (!messageExists) {
          return [...currentMessages, data.data];
        }

        return currentMessages;
      })

      setMessage("");

      const displayText = imageFile ? "image" : message;

      moveChatToTop(currentChatId! , {
        text : displayText,
        sender : data.sender
      },false);

    


    } catch (error: any) {
      console.log("error while sending message", error);
      // toast
    }

  }



  useEffect(() => {
    if (!isAuthenticated && !userLoading) {
      router.push('/login');
    }
  }, [isAuthenticated, userLoading, router]);

  useEffect(() => {
     socket?.on("newMessage" , (message) => {
      console.log("Recieved new message" , message);

      if(selectedUser && currentChatId === message.chatId){
        setMessages((prev) => {
           const currentMessages = prev || [];
           const messageExist = currentMessages.some((msg) => msg._id === message._id);

           if(!messageExist){
            return [...currentMessages , message];
           }

           return currentMessages;
        });

        moveChatToTop(message.chatId , message , false);
      }else{
        moveChatToTop(message.chatId , message , true);
      }
     });

     // moveToTop()

     socket?.on("seenMessage" , (data) => {
       console.log("message seen by->" , data);

       if(currentChatId === data.chatId){
         setMessages((prev: any) => {
          if(!prev) return null;

          return prev.map((msg: any) => {
             if(msg.sender === loggedInUser?._id && data.messageIds && data.messageIds.includes(msg._id)){
                 return {
                  ...msg,
                  isSeen : true,
                  seenAt : new Date().toString()
                 }
             }else if(msg.sender === loggedInUser?._id && !data.messageIds){
                  return {
                  ...msg,
                  isSeen : true,
                  seenAt : new Date().toString()
                 }
             }
             return msg;
          })
         })
       }
     })
     return () => {
       socket?.off("newMessage");
       socket?.off("seenMessage");
     }


  },[socket , selectedUser , currentChatId , setChats, loggedInUser?._id])

  useEffect(() => {
    if (selectedUser) {
      fetchSingleChat();

      socket?.emit("joinChat", (currentChatId));

      return () => {
        socket?.emit("leaveChat", (currentChatId));
        setMessages(null);
      }
    }
  }, [selectedUser, currentChatId, socket])


  if (userLoading || (!userLoading && !isAuthenticated)) {
    return <SpinnerEmpty />
  }

  return (
    <div className='min-h-screen flex'>

      <div className=''>
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
            setCurrentChatId={setCurrentChatId}
            handleLogout={handleLogout}
            createChat={createChat}
            onlineUsers={onlineUsers}
          />
        </SidebarProvider>
      </div>

      <div className='w-full md:w-[calc(100vw-256px)] border-2  border-red-500'>
        <ChatContainer
          user={user}
          setSidebarOpen={setSideBarOpen}
          isTyping={isTyping}
          selectedUser={selectedUser}
          loggedInUser={loggedInUser}
          messages={messages}
          currentChatId={currentChatId}
          message={message}
          setMessage={handleTyping}
          handleSendMessage={handleSendMessage}
          onlineUsers={onlineUsers}
        />
      </div>
    </div>
  )
}

export default page
