import type { Request, NextFunction, Response } from "express";
import type { Document } from "mongoose";
interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
}
export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}
export declare const isAuthMiddleware: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=authMiddleware.d.ts.map