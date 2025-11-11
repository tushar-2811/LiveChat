"use client"
import { useContext,createContext, useState, useEffect } from 'react';
import {io, Socket} from 'socket.io-client'
import { useAppData } from './appContext';
import { config } from '@/config/config';


interface SocketContextType{
    socket: Socket | null;
    onlineUsers : string[]
}

interface ProviderProps{
    children : React.ReactNode
}

const socketContext = createContext<SocketContextType>({
    socket : null,
    onlineUsers : []
});


export const SocketProvider = ({children} : ProviderProps) => {
    const [socket , setSocket] = useState<Socket | null>(null);
    const [onlineUsers , setOnlineUsers] = useState<string[]>([]);
    const {user} = useAppData();


    useEffect(() => {
        if(!user?._id){
            return;
        }

        const newSocket = io(config.CHAT_SERVICE.URL , {
            query : {
                userId : user._id
            }
        });
        setSocket(newSocket);

        newSocket.on("getOnlineUser" , (users: string[]) => {
            setOnlineUsers(users);
        })


        return () => {
            socket?.disconnect();
        }
    },[user?._id]);

    return (
        <socketContext.Provider value={{socket , onlineUsers}}>
            {children}
        </socketContext.Provider>
    )
}

export const useSocket = () : SocketContextType => {
    const context = useContext(socketContext);
    return context;
}

