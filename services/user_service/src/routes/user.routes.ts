import { Router } from "express";
import { loginUserController, verifyUserController } from "../controllers/user.controller.js";

const UserRouter = Router();

UserRouter.post('/login',loginUserController);
UserRouter.post('/verify-user',verifyUserController);

export default UserRouter;