import type { Request, Response } from "express";
import { sendNewQuoteEmail } from "../services/emailService";

type QuoteRequestBody = {
    name: string;
    email: string;
    phone?: string;
    message: string;
};

export const createQuote = async (
    req: Request<{}, {}, QuoteRequestBody>,
    res: Response
) => {
    const {
        name,
        email,
        phone,
        message,
    } = req.body;

    if (
        !name?.trim() ||
        !email?.trim() ||
        !message?.trim()
    ) {
        return res.status(400).json({
            message: "Name, email, and message are required.",
        });
    }

    try {
        await sendNewQuoteEmail({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone?.trim() || null,
            message: message.trim(),
        });

        return res.status(201).json({
            message: "Your request has been sent to Wendy.",
        });

    } catch (error) {
        console.error(
            "Unable to send cleaning request:",
            error
        );

        return res.status(500).json({
            message:
                "We couldn't send your request right now. Please try again.",
        });
    }
};