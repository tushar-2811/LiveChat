import { Loader2, Paperclip, Send } from 'lucide-react';
import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface MessageInputProps {
    selectedUser: string | null;
    currentChatId: string | null;
    message: string;
    setMessage: (message: string) => void;
    handleSendMessage: (e: any, imageFile: File | null) => void
}

const MessageInput = ({
    selectedUser,
    currentChatId,
    message,
    setMessage,
    handleSendMessage
}: MessageInputProps) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!message.trim() && !imageFile) return;

        setIsUploading(true);
        handleSendMessage(e, imageFile);

        setImageFile(null);
        setIsUploading(false);
    }

    if (!selectedUser) return null;
    return (
        <div className='border-t-2 py-3 border-neutral-400 w-full'>
            <div className='flex items-center gap-2'>
                <label className='cursor-pointer rounded-lg px-3 py-2 '>
                    <Paperclip size={18} />
                    <input
                        type="file"
                        accept='image/*'
                        className='hidden'
                        onChange={(e: any) => {
                            const file = e.target?.files[0];
                            if (file && file.type.startsWith("image/")) {
                                setImageFile(file);
                            };
                        }}
                    />
                </label>

                <div className="flex w-full  items-center gap-2">
                    <Input 
                    type="text" 
                    placeholder="Enter Text..." 
                    value={message}
                    onChange={(e:any) => setMessage(e.target.value)}
                    className='hover:border-px hover:border-black'
                    />
                    <Button 
                    type="submit" 
                    variant="outline" 
                    disabled={(!imageFile && !message) || isUploading}
                    onClick={handleSubmit}
                    >
                        {
                            isUploading ? <Loader2 className='w-4 h-4 animate-spin' /> : <Send className='w-4 h-4 text-black' />
                        }
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default MessageInput
