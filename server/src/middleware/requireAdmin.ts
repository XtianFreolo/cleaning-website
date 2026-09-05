import "dotenv/config";

import type {
    Request,
    Response,
    NextFunction,
} from "express";

import { env } from "node:process";
import jwt from "jsonwebtoken";


const jwtSecret = env.JWT_SECRET;

if (!jwtSecret) {
    throw new Error(
        "JWT_SECRET is missing. Check the server/.env file."
    );
}


type AdminTokenPayload = {
    email: string;
    role: string;
};


export const requireAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {


    const token = req.cookies?.admin_session;


    if (!token) {
        return res.status(401).json({
            message: "Admin authentication required.",
        });
    }


    try {

        const decoded = jwt.verify(
            token,
            jwtSecret
        ) as jwt.JwtPayload & AdminTokenPayload;


        if (decoded.role !== "admin") {
            return res.status(403).json({
                message: "Admin access required.",
            });
        }


        next();

    } catch {
        return res.status(401).json({
            message: "Invalid or expired admin session.",
        });
    }
};