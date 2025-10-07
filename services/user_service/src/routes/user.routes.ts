import { Router } from "express";
import { getAllUsersController, getSingleUserController, loginUserController, updateNameController, userProfileController, verifyUserController } from "../controllers/user.controller.js";
import { isAuthMiddleware } from "../middleware/authMiddleware.js";
import { User } from "../model/user.js";

const UserRouter = Router();

UserRouter.post('/login',loginUserController);
UserRouter.post('/verify-user',verifyUserController);


UserRouter.get('/get-profile' , isAuthMiddleware , userProfileController);
UserRouter.put('/update-name' , isAuthMiddleware , updateNameController);

UserRouter.get('/users/all' , isAuthMiddleware, getAllUsersController);
UserRouter.get('/user/:id' , getSingleUserController);

export default UserRouter;