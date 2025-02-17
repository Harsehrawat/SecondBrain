import { Request , Response , NextFunction } from "express";
import  jwt  from "jsonwebtoken";
import { JWT_SECRET_KEY } from "./config";

export const userMiddleware = (req: Request,res: Response,next: NextFunction)=>{
    const receivedToken = req.headers["authorization"];
    const decodedToken = jwt.verify(receivedToken as string,JWT_SECRET_KEY);
    if(decodedToken){
        // @ts-ignore
        req.userId = decodedToken.id;
        next(); 
    }
    else{
        res.status(401).json({message : "Invalid Token"});
    }
}