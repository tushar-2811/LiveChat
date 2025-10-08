import { Router } from "express";
import { createChatController } from "../controllers/chat.js";
import { isAuthMiddleware } from "../middlewares/authMiddleware.js";

const chatRouter = Router();

chatRouter.post('/create-chat', isAuthMiddleware, createChatController);

export default chatRouter;