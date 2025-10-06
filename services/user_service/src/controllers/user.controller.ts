import { asyncHandler } from "../utils/asyncHandler.js";


export const loginUserController = asyncHandler(async(req , res) => {
    const {email} = req.body;
    
})