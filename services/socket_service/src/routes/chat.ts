import { Router } from "express";
import { createChatController, getAllChatsController } from "../controllers/chat.js";
import { isAuthMiddleware } from "../middlewares/authMiddleware.js";

const chatRouter = Router();

chatRouter.post('/create-chat', isAuthMiddleware, createChatController);
chatRouter.get('/get-all-chats', isAuthMiddleware, getAllChatsController);

export default chatRouter;