import type { NextFunction, Request, Response } from "express";
import type { IUser } from "../types/index.js";
import jwt, { type JwtPayload } from 'jsonwebtoken'

export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}

export const isAuthMiddleware = async(req: AuthenticatedRequest , res: Response , next: NextFunction):Promise<void> => {
    try {
        const authHeader = req.headers?.authorization;

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