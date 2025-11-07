"use client";

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { config } from "@/config/config";
import { useTheme } from "next-themes";
import useToast from "@/components/_components/useToast";

export interface User {
    _id: string;
    name: string;
    email: string;
}

export interface Chat {
    _id: string;
    users: string[];
    latestMessage: {
        text: string;
        sender: string;
    };
    createdAt: string;
    updatedAt: string;
    unSeenCount?: number;
}

export interface Chats {
    _id: string;
    user: User;
    chat: Chat;
}

interface AppContextInterface {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    logoutUser: () => Promise<void>;
    fetchUsers: () => Promise<void>;
    fetchChats: () => Promise<void>;
    chats: Chats[] | null;
    users: User[] | null;
    setChats: React.Dispatch<React.SetStateAction<Chats[] | null>>;
}

interface AppContextProps {
    children: ReactNode
}


const AppContext = createContext<AppContextInterface | undefined>(undefined);

export const AppProvider: React.FC<AppContextProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [chats, setChats] = useState<Chats[] | null>(null);
    const [users, setUsers] = useState<User[] | null>(null);

    const fetchUser = async () => {
        try {
            const token = Cookies.get("token");
            const { data } = await axios.get(`${config.USER_SERVICE.GET_MY_PROFILE}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(data.user);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const logoutUser = async () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
        useToast("Logout", "Please Sign In Again to Chat");
    }

    const fetchChats = async () => {
        try {
            const token = Cookies.get("token");
            const { data } = await axios.get(`${config.CHAT_SERVICE.GET_ALL_CHATS}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setChats(data.chats);

        } catch (error) {
            console.log(error);
        }
    }

    const fetchUsers = async () => {
        try {
            const token = Cookies.get("token");
            const { data } = await axios.get(`${config.USER_SERVICE.GET_ALL_USERS}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(data.users);
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        fetchUser();
        fetchChats();
        fetchUsers();
    }, [])

    return <AppContext.Provider 
            value={{ 
                user, 
                setUser, 
                loading, 
                isAuthenticated, 
                setIsAuthenticated, 
                logoutUser, 
                fetchChats, 
                fetchUsers, 
                users, 
                chats, 
                setChats 
            }}>
        {children}
    </AppContext.Provider>
};


export const useAppData = (): AppContextInterface => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppData must be used within Provider");
    }
    return context;
}