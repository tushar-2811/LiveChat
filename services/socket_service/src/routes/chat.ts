import { Router } from "express";
import { createChatController, getAllChatsController, getMessagesByChatController, sendMessageController } from "../controllers/chat.js";
import { isAuthMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multer.js";

const chatRouter = Router();

chatRouter.post('/create-new-chat', isAuthMiddleware, createChatController);
chatRouter.get('/get-all-chats', isAuthMiddleware, getAllChatsController);

chatRouter.post('/message' , isAuthMiddleware , upload.single('image') , sendMessageController);
chatRouter.get('/message/:chatId' , isAuthMiddleware , getMessagesByChatController);

export default chatRouter;