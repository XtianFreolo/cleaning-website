import type { Request, Response } from "express";

type QuoteRequestBody = {
    name: string;
    email: string;
    phone?: string;
    service: string;
    bedrooms?: string;
    bathrooms?: string;
    message?: string;
};

export const createQuote = (
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

    const quoteRequest = {
        name,
        email,
        phone,
        service,
        bedrooms,
        bathrooms,
        message,
    };

    /*
      Temporary development step.
  
      Later:
      - save this to PostgreSQL
      - send Wendy an email
      - possibly send the customer a confirmation email
    */
    console.log("New quote request:", quoteRequest);

    return res.status(201).json({
        message: "Quote request received successfully.",
        quote: quoteRequest,
    });
};