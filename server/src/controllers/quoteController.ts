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

    // Required fields
    if (!name || !email || !service) {
        return res.status(400).json({
            message: "Name, email, and service are required.",
        });
    }

    try {
        // Save the quote request to PostgreSQL / Neon
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

        /*
          The quote is already safely stored in Neon.

          Now we try to send Wendy an email notification.
          If the email fails, we still keep the quote.
        */
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

    } catch (error) {
        console.error("Error creating quote:", error);

        return res.status(500).json({
            message: "Unable to submit quote request.",
        });
    }
};