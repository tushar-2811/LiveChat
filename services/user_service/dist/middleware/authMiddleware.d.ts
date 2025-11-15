import type { NextFunction, Request, Response } from "express";
import type { IUser } from "../types/index.js";
export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}
export declare const isAuthMiddleware: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=authMiddleware.d.ts.map