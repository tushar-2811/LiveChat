import React, { useState } from 'react'

import { Calendar, ChevronUp, CornerDownRight, CornerUpLeft, Home, Inbox, MessageCircle, Plus, Search, SearchIcon, Settings, TextSearchIcon, User2, UserRoundSearchIcon, X } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent
} from "@/components/ui/dropdown-menu"
import { User } from '@/context/appContext'
import AvatarComponent from './AvatarComponent'
import { Input } from '../ui/input'


interface AppSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  showAllUsers: boolean;
  setShowAllUsers: (show: boolean | ((prev: boolean) => boolean)) => void;
  users: User[] | null;
  loggedInUser: User | null;
  chats: any[] | null;
  selectedUser: string | null;
  setSelectedUser: (userId: string | null) => void;
  handleLogout: () => void;
}


const AppSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  showAllUsers,
  setShowAllUsers,
  users,
  loggedInUser,
  chats,
  selectedUser,
  setSelectedUser,
  handleLogout
}: AppSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchedUsers, setSearchedUsers] = useState<User[] | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (users && value.trim() !== "") {
      const tempUsers = users.filter(
        (u) => u._id !== loggedInUser?._id && u.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchedUsers(tempUsers);
    } else {
      setSearchedUsers(null);
    }
  }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='flex justify-center text-4xl bg-linear-to-r from-pink-600 via-pink-300 to-transparent bg-clip-text text-transparent'>ChatX</SidebarGroupLabel>
          <div className=' mt-5'></div>
          <div className='border-b-[0.2px] border-b-neutral-500 flex items-center gap-2 text-3xl font-medium text-black '>
            <MessageCircle className='h-6 w-6' />
            {"Messages"}
            {showAllUsers && <X
              onClick={() => setShowAllUsers(prev => !prev)}
              className='text-red-500 ml-8' />}

          </div>

          <div className='my-4'>
            {
              showAllUsers ? (
                <div className='flex flex-col gap-2'>
                  <div className='flex justify-center items-center gap-2'>
                    <UserRoundSearchIcon size={24} />
                    <Input
                      type='text'
                      placeholder='Search Users...'
                      value={searchQuery}
                      onChange={handleChange}
                    />
                  </div>

                </div>
              ) : (
                <div className='flex justify-between items-center'>
                  <p className='text-sm text-neutral-500'>Start Texting</p>
                  <button
                    className='ml-4'
                    onClick={() => setShowAllUsers(prev => !prev)}
                  >
                    {
                      !showAllUsers && (
                        <Plus className='text-green-500' />
                      )
                    }
                  </button>
                </div>
              )
            }
          </div>
          <SidebarGroupContent className=''>
            <SidebarMenu>
              {searchedUsers && searchedUsers.length > 0 && (
                <div className='mt-2 border rounded-2xl bg-white border-black shadow max-h-48 overflow-y-auto'>
                  {searchedUsers.map((user) => (
                    <div
                      key={user._id}
                      className={`flex items-center gap-4 p-2 cursor-pointer  ${selectedUser === user._id ? 'bg-black text-white' : ''}`}
                      onClick={() => setSelectedUser(user._id)}
                    >
                      <AvatarComponent />
                      <span className='text-lg'>{user.name}</span>
                    </div>
                  ))}
                  {searchedUsers.length === 0 && (
                    <div className='text-sm text-gray-500'>No users found.</div>
                  )}
                </div>
              )}

              {
                chats && chats.length > 0 && (
                  <div className='mt-2 border rounded-2xl bg-white border-black shadow max-h-48 overflow-y-auto'>
                    {chats.map((chat) => {
                      const latestMessage = chat.chat.latestMessage;
                      const isSelected = selectedUser === chat.chat._id;
                      const isSentByMe = latestMessage?.sender === loggedInUser?._id;
                      const unSeenCount = chat.chat.unSeenCount || 0;

                      console.log(latestMessage);

                      return <div
                        key={chat.chat._id}
                        className={`flex items-center gap-4 p-2 cursor-pointer  ${isSelected ? 'bg-black text-white' : ''}`}
                        onClick={() => setSelectedUser(chat.chat._id)}
                      >
                        <AvatarComponent />
                        <div>
                           <span className='text-lg'>{chat.user.name}</span>
                          {latestMessage && 
                           <div className='flex gap-1 items-center'>
                               {isSentByMe ? 
                               <CornerUpLeft size={14} className='text-pink-500' /> : 
                               <CornerDownRight size={14} className='text-sky-500' />
                               }
                               <span className='text-sm text-neutral-400 truncate flex-1'>{latestMessage?.text}</span>
                            </div>
                          }
                        </div>
                       
                        {
                          unSeenCount > 0 && <div className='bg-pink-500 text-white text-xs font-bold rounded-full min-w-[22px] h-5.5 flex items-center justify-center px-2'>
                            {unSeenCount > 99 ? "99+" : unSeenCount} 
                          </div>
                        }

                        {/* online user left */}
                      </div>
                    })}
                  </div>
                )
              }

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='border-t-[0.2px] border-neutral-400 pt-5'>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton >
                  <AvatarComponent /> <span className='text-2xl '>{loggedInUser?.name}</span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className='text-md text-red-500'>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
