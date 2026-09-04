import type { Request, Response } from "express";
import pool from "../db/pool";


type QuoteRequestBody = {
    name: string;
    email: string;
    phone?: string;
    service: string;
    bedrooms?: string;
    bathrooms?: string;
    message?: string;
};


export const createQuote = async (
    req: Request<{}, {}, QuoteRequestBody>,
    res: Response
) => {
    const {
        name,
        email,
        phone,
        service,
        bedrooms,
        bathrooms,
        message,
    } = req.body;


    if (!name || !email || !service) {
        return res.status(400).json({
            message: "Name, email, and service are required.",
        });
    }


    try {

        const result = await pool.query(
            `
            INSERT INTO quotes (
                name,
                email,
                phone,
                service_type,
                bedrooms,
                bathrooms,
                message
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
            `,
            [
                name,
                email,
                phone || null,
                service,
                bedrooms || null,
                bathrooms || null,
                message || null,
            ]
        );


        const createdQuote = result.rows[0];


        return res.status(201).json({
            message: "Quote request received successfully.",
            quote: createdQuote,
        });

    } catch (error) {

        console.error("Error creating quote:", error);


        return res.status(500).json({
            message: "Unable to submit quote request.",
        });
    }
};