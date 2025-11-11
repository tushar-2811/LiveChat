import { Loader2, Paperclip, Send } from 'lucide-react';
import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import Image from 'next/image';

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
    const [showNewDialog, setShowNewDialog] = useState<boolean>(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            if (!message.trim() && !imageFile) return;

            setIsUploading(true);
           await handleSendMessage(e, imageFile);

            setImageFile(null);
            
        } catch (error) {
           console.log("error-->" , error);
        } finally{
            setIsUploading(false);
        }
    }

    if (!selectedUser) return null;
    return (
        <div className='border-t-2 py-3 border-neutral-400 w-full'>
            <form onSubmit={handleSubmit}>
                <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Selected Image</DialogTitle>
                            {/* <DialogDescription>
                            Do you really want to Sign Out ?
                        </DialogDescription> */}
                        </DialogHeader>
                        <div>
                            {imageFile && <img src={URL.createObjectURL(imageFile)} alt="preview" />}
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant={"secondary"} className='cursor-pointer'>Cancel</Button>
                            </DialogClose>
                            <Button
                                variant={'default'}
                                type="submit"
                                className='cursor-pointer'
                                onClick={(e: any) => {
                                    handleSubmit(e);
                                    setShowNewDialog(false);
                                }}

                            >
                                Continue
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
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
                                    setShowNewDialog(true);
                                };
                            }}
                        />
                    </label>

                    <div className="flex w-full  items-center gap-2">
                        <Input
                            type="text"
                            placeholder="Enter Text..."
                            value={message}
                            onChange={(e: any) => setMessage(e.target.value)}
                            className='hover:border-px hover:border-black'
                        />
                        <Button
                            type="submit"
                            variant="outline"
                            disabled={(!imageFile && !message) || isUploading}
                        >
                            {
                                isUploading ? <Loader2 className='w-4 h-4 animate-spin' /> : <Send className='w-4 h-4 text-black' />
                            }
                        </Button>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default MessageInput
