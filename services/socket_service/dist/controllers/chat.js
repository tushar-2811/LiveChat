import axios, { all } from "axios";
import { Chat } from "../models/chat.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Message } from "../models/message.model.js";
import { getRecieverSocketId, SocketManager } from "../config/socket.js";
import { server } from "../server.js";
const socketInstance = SocketManager.getInstance(server);
export const createChatController = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { otherUserId } = req.body;
    if (!otherUserId) {
        res.status(400).json({
            success: false,
            message: "Other user Id is requried"
        });
        return;
    }
    const existingChat = await Chat.findOne({
        users: {
            $all: [userId, otherUserId],
            $size: 2
        }
    });
    if (existingChat) {
        res.status(200).json({
            success: true,
            message: "chat already exist",
            chatId: existingChat._id
        });
        return;
    }
    // otherwise create new chat
    const newChat = await Chat.create({
        users: [userId, otherUserId]
    });
    res.status(200).json({
        success: true,
        message: "new chat created",
        chatId: newChat._id
    });
    return;
});
export const getAllChatsController = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    if (!userId) {
        res.status(400).json({
            success: false,
            message: "User id missing"
        });
        return;
    }
    const allChats = await Chat.find({
        users: userId
    }).sort({ updatedAt: -1 });
    const chatWithUserData = await Promise.all(allChats.map(async (chat) => {
        const otherUserId = chat.users.find((id) => id.toString() !== userId.toString());
        const unSeenCount = await Message.countDocuments({
            chatId: chat._id,
            sender: { $ne: userId },
            isSeen: false
        });
        try {
            const { data } = await axios.get(`${process.env.USER_SERVICE_URL}/api/v1/user/${otherUserId}`);
            return {
                user: data,
                chat: {
                    ...chat.toObject(),
                    latestMessage: chat.latestMessage || null,
                    unSeenCount
                }
            };
        }
        catch (error) {
            console.error("Error fetching user data: ", error);
            return {
                user: {
                    _id: otherUserId,
                    name: "Unknown User",
                },
                chat: {
                    ...chat.toObject(),
                    latestMessage: chat.latestMessage || null,
                    unSeenCount
                }
            };
        }
    }));
    res.status(200).json({
        success: true,
        chats: chatWithUserData
    });
    return;
});
export const sendMessageController = asyncHandler(async (req, res) => {
    const senderId = req.user?._id;
    const { chatId, text } = req.body;
    const imageFile = req.file; // Assuming you're using multer for file uploads
    if (!senderId) {
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
        return;
    }
    ;
    if (!chatId) {
        res.status(400).json({
            success: false,
            message: "chatId required",
        });
        return;
    }
    if (!text && !imageFile) {
        res.status(400).json({
            success: false,
            message: "Either text or image is required to send a message"
        });
        return;
    }
    ;
    const chat = await Chat.findById(chatId);
    console.log("char find", chat);
    if (!chat) {
        res.status(404).json({
            success: false,
            message: "Chat not found"
        });
        return;
    }
    ;
    const isUserInChat = chat.users.some((id) => id.toString() === senderId.toString());
    if (!isUserInChat) {
        res.status(403).json({
            success: false,
            message: "You are not a participant of this chat"
        });
        return;
    }
    ;
    const otherUserId = chat.users.find((id) => id.toString() !== senderId.toString());
    if (!otherUserId) {
        res.status(401).json({
            success: false,
            message: "Cannot determine the recipient of the message"
        });
        return;
    }
    ;
    // socket
    const recieverSocketId = getRecieverSocketId(otherUserId.toString());
    let isRecieverInChatRoom = false;
    if (recieverSocketId) {
        const recieverSocket = socketInstance.getSocket(recieverSocketId);
        if (recieverSocket && recieverSocket.rooms.has(chatId)) {
            isRecieverInChatRoom = true;
        }
    }
    let messageData = {
        chatId,
        sender: senderId,
        isSeen: isRecieverInChatRoom,
        seenAt: isRecieverInChatRoom ? new Date() : undefined,
    };
    if (imageFile) {
        messageData.image = {
            url: imageFile.path,
            publicId: imageFile.filename
        };
        messageData.messageType = "image";
    }
    else {
        messageData.text = text;
        messageData.messageType = "text";
    }
    const newMessage = await Message.create(messageData);
    const latestMessageText = imageFile ? "Image" : text;
    await Chat.findByIdAndUpdate(chatId, {
        latestMessage: {
            text: latestMessageText,
            sender: senderId
        },
        updateAt: new Date()
    }, { new: true });
    // emit socket event to other user
    socketInstance.emitToRoom(chatId, "newMessage", newMessage);
    if (recieverSocketId) {
        socketInstance.emitToRoom(recieverSocketId, "newMessage", newMessage);
    }
    const senderSocketId = getRecieverSocketId(senderId.toString());
    if (senderSocketId) {
        socketInstance.emitToRoom(senderSocketId, "newMessage", newMessage);
    }
    if (isRecieverInChatRoom && senderSocketId) {
        socketInstance.emitToRoom(senderSocketId, "seenMessage", {
            chatId: chatId,
            seenBy: otherUserId,
            messageIds: [newMessage._id]
        });
    }
    res.status(201).json({
        success: true,
        message: "Message sent successfully",
        sender: senderId,
        data: newMessage
    });
    return;
});
export const getMessagesByChatController = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { chatId } = req.params;
    if (!userId) {
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
        return;
    }
    ;
    if (!chatId) {
        res.status(400).json({
            success: false,
            message: "chatId is required"
        });
        return;
    }
    ;
    const chat = await Chat.findById(chatId);
    if (!chat) {
        res.status(404).json({
            success: false,
            message: "Chat not found"
        });
        return;
    }
    ;
    const isUserInChat = chat.users.some((id) => id.toString() === userId.toString());
    if (!isUserInChat) {
        res.status(403).json({
            success: false,
            message: "You are not a participant of this chat"
        });
        return;
    }
    ;
    const messagesToMarkSeen = await Message.find({
        chatId: chatId,
        sender: { $ne: userId },
        isSeen: false
    });
    await Message.updateMany({
        chatId: chatId,
        sender: { $ne: userId },
        isSeen: false
    }, {
        isSeen: true,
        seenAt: new Date()
    });
    const messages = await Message.find({ chatId: chatId }).sort({ createdAt: 1 });
    const otherUserId = chat.users.find((id) => id.toString() !== userId.toString());
    try {
        const { data } = await axios.get(`${process.env.USER_SERVICE_URL}/api/v1/user/${otherUserId}`);
        if (!otherUserId) {
            res.status(401).json({
                success: false,
                message: "Cannot determine the recipient of the message"
            });
            return;
        }
        // emit socket event to other user about messages being seen
        if (messagesToMarkSeen.length > 0) {
            const otherUserSocketId = getRecieverSocketId(otherUserId.toString());
            if (otherUserSocketId) {
                socketInstance.emitToRoom(otherUserSocketId, "seenMessage", {
                    chatId: chatId,
                    seenBy: userId,
                    messageIds: messagesToMarkSeen.map((message) => message._id)
                });
            }
        }
        res.status(200).json({
            success: true,
            message: "Messages fetched successfully",
            user: data,
            messagesData: messages,
        });
        return;
    }
    catch (error) {
        console.error("Error fetching user data: ", error);
        res.status(200).json({
            success: true,
            message: "Messages fetched successfully",
            user: {
                _id: otherUserId,
                name: "Unknown User",
            },
            messagesData: messages,
        });
        return;
    }
});
//# sourceMappingURL=chat.js.map