import type { AuthenticatedRequest } from "../middlewares/authMiddleware.js";
import { Chat } from "../models/chat.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createChatController = asyncHandler(async (req:AuthenticatedRequest , res) =>{
     const userId = req.user?._id;
     const {otherUserId} = req.body;

     if(!otherUserId){
        res.status(400).json({
            success : false,
            message : "Other user Id is requried"
        });
        return;
     }

     const existingChat = await Chat.findOne({
        users : {
            $all : [userId , otherUserId],
            $size : 2
        }
     });

     if(existingChat){
        res.status(200).json({
            success : true,
            message : "chat already exist",
            chatId : existingChat._id
        });
        return;
     }

     // otherwise create new chat
     const newChat = await Chat.create({
        users : [userId , otherUserId]
     });

     res.status(200).json({
        success : true,
        message : "new chat created",
        chatId : newChat._id
     });
     return;
     
})