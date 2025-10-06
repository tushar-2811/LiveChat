import type { NextFunction, Request, RequestHandler, Response } from "express";

export const asyncHandler = (requestHandler: RequestHandler): RequestHandler => {
       return async(req:Request , res:Response , next:NextFunction) => {
          try {
             await requestHandler(req,res,next);
          } catch (error:any) {
            console.log("Error",error);
            res.status(500).json({
                success : false,
                message : error.message || "Internal Server Error"
            })
          }
       }
}