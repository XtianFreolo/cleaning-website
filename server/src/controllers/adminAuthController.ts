import "dotenv/config";

import type { Request, Response } from "express";
import { env } from "node:process";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import pool from "../db/pool";

type LoginRequestBody = {
    email: string;
    password: string;
};

const jwtSecret = env.JWT_SECRET;

if (!jwtSecret) {
    throw new Error(
        "JWT_SECRET is missing. Check the server/.env file."
    );
}

const COOKIE_NAME = "admin_session";

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 8;



export const loginAdmin = async (
    req: Request<{}, {}, LoginRequestBody>,
    res: Response
) => {
    const { email, password } = req.body;


    if (
        typeof email !== "string" ||
        typeof password !== "string" ||
        !email.trim() ||
        !password
    ) {
        return res.status(400).json({
            message: "Email and password are required.",
        });
    }


    const normalizedEmail = email
        .trim()
        .toLowerCase();


    try {

        const result = await pool.query(
            `
            SELECT
                id,
                email,
                password_hash
            FROM admin_users
            WHERE LOWER(email) = $1
            LIMIT 1;
            `,
            [normalizedEmail]
        );


        const admin = result.rows[0];

        if (!admin) {
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            admin.password_hash
        );


        if (!passwordMatches) {
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }

        const token = jwt.sign(
            {
                email: admin.email,
                role: "admin",
            },
            jwtSecret,
            {
                subject: String(admin.id),
                expiresIn: "8h",
            }
        );


        res.cookie(
            COOKIE_NAME,
            token,
            {
                httpOnly: true,

                secure: env.NODE_ENV === "production",

                sameSite: "lax",

                maxAge: COOKIE_MAX_AGE,

                path: "/",
            }
        );


        return res.status(200).json({
            message: "Login successful.",

            admin: {
                id: admin.id,
                email: admin.email,
            },
        });

    } catch (error) {

        console.error(
            "Admin login error:",
            error
        );


        return res.status(500).json({
            message: "Unable to log in.",
        });
    }
};



export const logoutAdmin = (
    _req: Request,
    res: Response
) => {


    res.clearCookie(
        COOKIE_NAME,
        {
            httpOnly: true,

            secure:
                env.NODE_ENV === "production",

            sameSite: "lax",

            path: "/",
        }
    );


    return res.status(200).json({
        message: "Logged out successfully.",
    });
};