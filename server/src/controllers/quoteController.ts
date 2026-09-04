import type { Request, Response } from "express";
import pool from "../db/pool";
import { sendNewQuoteEmail } from "../services/emailService";

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

        try {
            await sendNewQuoteEmail({
                name: createdQuote.name,
                email: createdQuote.email,
                phone: createdQuote.phone,
                serviceType: createdQuote.service_type,
                bedrooms: createdQuote.bedrooms,
                bathrooms: createdQuote.bathrooms,
                message: createdQuote.message,
            });

        } catch (emailError) {

            console.error(
                "Quote saved, but email notification failed:",
                emailError
            );
        }


        return res.status(201).json({
            message: "Quote request received successfully.",
            quote: createdQuote,
        });