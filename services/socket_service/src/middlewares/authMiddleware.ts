import type {Request, NextFunction, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import jwt from 'jsonwebtoken'
import type { Document } from "mongoose";



interface IUser extends Document{
    _id : string;
    name : string;
    email : string;
}

export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}

export const isAuthMiddleware = async(req: AuthenticatedRequest , res: Response , next: NextFunction):Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        console.log("authHeader",authHeader);

        if(!authHeader || !authHeader.startsWith("Bearer ")){
           res.status(401).json({
            success : false,
            message : "Please login - No auth headers"
           });
           return;
        }

        const token = authHeader.split(" ")[1] || "";
        const decodedValue = jwt.verify(token , process.env.JWT_SECRET as string) as JwtPayload;

        if(!decodedValue || !decodedValue.user){
            res.status(401).json({
                success : false,
                message : "Invalid Token"
            });
            return;
        }

        req.user = decodedValue.user;
        next();

    } catch (error) {
        res.status(401).json({
            success : false,
            message : "JWT error"
        })
        return;
    }

}