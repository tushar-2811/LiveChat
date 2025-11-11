import React, { useState } from 'react'

import { Calendar, ChevronUp, CornerDownRight, CornerUpLeft, Home, Inbox, LogOutIcon, MessageCircle, Plus, Search, SearchIcon, Settings, TextSearchIcon, User2, UserRoundSearchIcon, X } from "lucide-react"

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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent
} from "@/components/ui/dropdown-menu"
import { User } from '@/context/appContext'
import AvatarComponent from './AvatarComponent'
import { Input } from '../ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'
import { Field, FieldGroup, FieldLabel } from '../ui/field'
import { Button } from '../ui/button'


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
  setCurrentChatId: (chatId: string | null) => void;
  handleLogout: () => void;
  createChat: (user: User) => void;
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
  setCurrentChatId,
  handleLogout,
  createChat
}: AppSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchedUsers, setSearchedUsers] = useState<User[] | null>(null);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [showNewDialog, setShowNewDialog] = useState<boolean>(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState<boolean>(false);

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
            {showSearchBar && <X
              onClick={() => setShowSearchBar(prev => !prev)}
              className='text-red-500 ml-8' />}

          </div>

          <div className='my-4'>
            {
              showSearchBar ? (
                <div className='flex flex-col h-8'>
                  <div className='flex justify-center items-center'>
                    {/* <UserRoundSearchIcon size={24} />
                    <Input
                      type='text'
                      placeholder='Search Users...'
                      value={searchQuery}
                      onChange={handleChange}
                    /> */}
                    <InputGroup>
                      <InputGroupInput
                        placeholder="Search Users..."
                        type='text'
                        onClick={() => setShowNewDialog(true)}
                      />
                      <InputGroupAddon>
                        <SearchIcon />
                      </InputGroupAddon>
                    </InputGroup>
                  </div>

                  <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Start New Chat</DialogTitle>
                        <DialogDescription>
                          Search user and start texting right away.
                        </DialogDescription>
                      </DialogHeader>
                      <FieldGroup className="pb-3">
                        <Field>
                          <FieldLabel htmlFor="search">Search User</FieldLabel>
                          <Input
                            id="search"
                            name="search"
                            placeholder="Enter Name..."
                            value={searchQuery}
                            onChange={handleChange}
                          />
                        </Field>
                      </FieldGroup>
                      <div className="w-full h-auto">
                        {searchedUsers && searchedUsers.length > 0 ? (
                          <div className=" bg-white  max-h-48 overflow-y-auto">
                            {searchedUsers.map((user) => (
                              <div
                                key={user._id}
                                className={`flex border-px rounded-2xl border-black shadow items-center p-2 cursor-pointer ${selectedUser === user._id ? 'bg-black text-white' : ''
                                  }`}
                                onClick={() => {
                                  createChat(user)
                                  setSearchQuery("");
                                  setSearchedUsers(null);
                                  setShowNewDialog(false);
                                }}
                              >
                                <div className='mr-4'>
                                  <AvatarComponent />
                                </div>
                                <span className="text-lg">{user.name}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          searchedUsers && (
                            <div className="mt-2 z-50 w-full border rounded-2xl bg-white border-black shadow p-2 text-md text-white">
                              No users found.
                            </div>
                          )
                        )}
                      </div>
                      {/* <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Create</Button>
                      </DialogFooter> */}
                    </DialogContent>
                  </Dialog>

                </div>
              ) : (
                <div className='flex justify-between items-center h-8'>
                  <p className='text-sm text-neutral-500'>Start Texting</p>
                  <button
                    className='ml-4'
                    onClick={() => setShowSearchBar(prev => !prev)}
                  >
                    {
                      !showSearchBar && (
                        <Plus className='text-green-500' />
                      )
                    }
                  </button>
                </div>
              )
            }
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                chats && chats.length > 0 && (
                  <div className='mt-2 flex flex-col gap-4 overflow-y-auto'>
                    {chats.map((chat: any) => {
                      const latestMessage = chat.chat.latestMessage;
                      const isSelected = selectedUser === chat.user.user._id;
                      const isSentByMe = latestMessage?.sender === loggedInUser?._id;
                      const unSeenCount = chat.chat.unSeenCount || 0;
                      return <div
                        key={chat.chat._id}
                        className={`flex border border-black shadow max-h-48 rounded-2xl items-center gap-4 p-2 cursor-pointer  ${isSelected ? 'bg-black text-white' : ''}`}
                        onClick={() => {
                          setSelectedUser(chat.user.user._id);
                          setCurrentChatId(chat.chat._id);
                        }}
                      >
                        <div className='z-10'>
                          <AvatarComponent />
                        </div>
                        <div>
                          <span className='text-lg'>{chat.user.user.name}</span>
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

              {/* logout dialog box */}
              <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Sign Out</DialogTitle>
                    <DialogDescription>
                      Do you really want to Sign Out ?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" className='cursor-pointer'>Cancel</Button>
                    </DialogClose>
                    <Button
                      variant={'destructive'}
                      type="submit"
                      className='cursor-pointer'
                      onClick={handleLogout}
                    >Sign Out
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

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
                  <span
                    onClick={() => setShowLogoutDialog(true)}
                    className='text-md text-red-500 flex gap-2 items-center'>
                    <LogOutIcon className='text-red-500' /> Sign out
                  </span>
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
