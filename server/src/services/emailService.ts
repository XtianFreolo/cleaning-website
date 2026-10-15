import "dotenv/config";

import { env } from "node:process";
import { Resend } from "resend";

const resendApiKey = env.RESEND_API_KEY;

if (!resendApiKey) {
    throw new Error(
        "RESEND_API_KEY is missing. Check server/.env."
    );
}

const resend = new Resend(resendApiKey);

type QuoteEmailData = {
    name: string;
    email: string;
    phone?: string | null;
    message: string;
};

const escapeHtml = (value?: string | null) =>
    (value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

export const sendNewQuoteEmail = async (
    quote: QuoteEmailData
) => {
    const wendyEmail = env.WENDY_EMAIL;

    const fromEmail =
        env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    if (!wendyEmail) {
        throw new Error(
            "WENDY_EMAIL is missing. Check server/.env."
        );
    }

    const result = await resend.emails.send({
        from: `Cleaning With Wendy <${fromEmail}>`,

        to: [wendyEmail],

        subject: `New Cleaning Request - ${quote.name}`,

   
        replyTo: quote.email,

        html: `
            <h2>New Cleaning Request</h2>

            <p>
                Someone submitted a request through
                the Cleaning With Wendy website.
            </p>

            <hr>

            <p>
                <strong>Name:</strong>
                ${escapeHtml(quote.name)}
            </p>

            <p>
                <strong>Email:</strong>
                ${escapeHtml(quote.email)}
            </p>

            <p>
                <strong>Phone:</strong>
                ${escapeHtml(quote.phone) || "Not provided"}
            </p>

            <h3>What they need:</h3>

            <p>
                ${escapeHtml(quote.message).replace(/\n/g, "<br>")}
            </p>

            <hr>

            <p>
                Simply click <strong>Reply</strong>
                to respond directly to this customer.
            </p>
        `,
    });

    if (result.error) {
        throw new Error(
            `Resend email failed: ${result.error.message}`
        );
    }

    return result;
};