import "dotenv/config";
import { env } from "node:process";
import { Resend } from "resend";

const resendApiKey = env.RESEND_API_KEY;

if (!resendApiKey) {
    throw new Error(
        "RESEND_API_KEY is missing. Check the server/.env file."
    );
}

const resend = new Resend(resendApiKey);

type QuoteEmailData = {
    name: string;
    email: string;
    phone?: string | null;
    serviceType: string;
    bedrooms?: string | null;
    bathrooms?: string | null;
    message?: string | null;
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
            "WENDY_EMAIL is missing. Check the server/.env file."
        );
    }

    const result = await resend.emails.send({
        from: `Cleaning With Wendy <${fromEmail}>`,
        to: [wendyEmail],
        subject: `New Cleaning Quote Request - ${quote.name}`,
        replyTo: quote.email,

        html: `
            <h2>New Cleaning Quote Request</h2>

            <p>
                A customer submitted a new quote request
                through the Cleaning With Wendy website.
            </p>

            <hr />

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

            <p>
                <strong>Service:</strong>
                ${escapeHtml(quote.serviceType)}
            </p>

            <p>
                <strong>Bedrooms:</strong>
                ${escapeHtml(quote.bedrooms) || "Not provided"}
            </p>

            <p>
                <strong>Bathrooms:</strong>
                ${escapeHtml(quote.bathrooms) || "Not provided"}
            </p>

            <p>
                <strong>Message:</strong>
                ${escapeHtml(quote.message) || "No message provided"}
            </p>

            <hr />

            <p>
                This quote request was submitted through
                Cleaning With Wendy.
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