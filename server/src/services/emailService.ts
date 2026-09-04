import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

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

export const sendNewQuoteEmail = async (
    quote: QuoteEmailData
) => {

    const wendyEmail = process.env.WENDY_EMAIL;
    const fromEmail =
        process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";


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
                ${quote.name}
            </p>

            <p>
                <strong>Email:</strong>
                ${quote.email}
            </p>

            <p>
                <strong>Phone:</strong>
                ${quote.phone || "Not provided"}
            </p>

            <p>
                <strong>Service:</strong>
                ${quote.serviceType}
            </p>

            <p>
                <strong>Bedrooms:</strong>
                ${quote.bedrooms || "Not provided"}
            </p>

            <p>
                <strong>Bathrooms:</strong>
                ${quote.bathrooms || "Not provided"}
            </p>

            <p>
                <strong>Message:</strong>
                ${quote.message || "No message provided"}
            </p>

            <hr />

            <p>
                This quote request was submitted through
                Cleaning With Wendy.
            </p>
        `,
    });

    return result;
};