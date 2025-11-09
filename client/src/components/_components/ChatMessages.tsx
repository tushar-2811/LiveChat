'use client'
import { Message } from '@/app/chat/page';
import { User } from '@/context/appContext';
import { IconMessage } from '@tabler/icons-react';
import React, { useRef, useMemo, useEffect } from 'react'
import moment from 'moment'
import { Check, CheckCheck } from 'lucide-react';

interface ChatMessagesProps {
    selectedUser: string | null;
    messages: Message[] | null;
    loggedInUser: User | null;
    currentChatId: string | null;
}

const ChatMessages = ({
    selectedUser,
    messages,
    loggedInUser,
    currentChatId
}: ChatMessagesProps) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    // seen feature
    const uniqueMessage = useMemo(() => {
        if (!messages) return [];

        const seen = new Set();
        return messages.filter((message) => {
            if (seen.has(message._id)) {
                return false;
            }

            seen.add(message._id);
            return true;
        })

    }, [messages]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages, uniqueMessage])

    return (
        <div className='flex-1 overflow-hidden'>
            <div className='h-full min-h-[calc(100vh-215px)] overflow-y-auto p-2 space-y-2 custom-scroll'>
                {
                    !selectedUser ? (
                        <div className='flex justify-center gap-2 items-center mt-20'>
                            <p className='text-neutral-400 text-lg text-center '>
                                Select a user to start chat
                            </p>
                            <IconMessage />
                        </div>
                    ) : (
                        <>
                        {
                            uniqueMessage.map((e , index) => {
                                const isSentByMe = e.sender === loggedInUser?._id;
                                const uniqueKey = `${e._id}-${index}`;

                                return (
                                    <div 
                                    key={uniqueKey}
                                    className={`flex flex-col gap-1 mt-2 ${
                                        isSentByMe ? "items-end" : "items-start"
                                    }`}>
                                        <div className={`rounded-lg p-3 max-w-xm text-white ${
                                            isSentByMe ? "bg-sky-500" : "bg-pink-500"
                                        }`}>
                                             {
                                                e.messageType === "image" && e.image && (
                                                     <div className='relative group'>
                                                        <img src={e.image.url} alt="shared image" className='max-w-full h-auto rounded-lg' />
                                
                                                    </div>
                                                )
                                             }
                                             {
                                                e.messageType === "text" && e.text && (
                                                    <p className='mt-1'>
                                                        {e.text}
                                                    </p>
                                                )
                                             }
                                        </div>

                                        <div className={`flex items-center gap-1 text-xs text-neutral-400 ${
                                            isSentByMe ? "pr-2 flex-row-reverse" : "pl-2"
                                        }`}>
                                            <span>{moment(e.createdAt).format("hh:mm A . MMM D")}</span>

                                        {
                                          isSentByMe && 
                                          <div className='flex items-center ml-1'>
                                               {
                                                 e.isSeen ? <div className='flex items-center gap-1 text-black'>
                                                    <CheckCheck  className='w-3 h-3 text-neutral-600'/>
                                                    {
                                                        e.seenAt && <span>{moment(e.seenAt).format("hh:mm A")}</span>
                                                    }
                                                 </div> : <Check className='w-3 h-3 text-neutral-400'/>
                                               }   
                                          </div>
                                        }
                                        </div>
            
                                    </div>
                                )
                            })
                        }

                        <div ref={bottomRef} />
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default ChatMessages
