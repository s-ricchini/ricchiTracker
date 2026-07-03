import jwt from "jsonwebtoken";
import type { Request,Response,NextFunction } from "express";
import type { TokenPayload } from "../types/allTypes.js";

export default function protectedRoute(req:Request, res:Response, next:NextFunction) {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!);
        req.session = payload as TokenPayload;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
}