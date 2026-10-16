const escapeHtml = (value: string = "") =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

export default async (req: Request) => {
    if (req.method !== "POST") {
        return Response.json(
            { message: "Method not allowed." },
            { status: 405 }
        );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const wendyEmail = process.env.WENDY_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!resendApiKey || !wendyEmail || !fromEmail) {
        console.error("Missing email environment variables.");

        return Response.json(
            { message: "Email service is not configured correctly." },
            { status: 500 }
        );
    }

    try {
        const body = await req.json();

        const name =
            typeof body.name === "string"
                ? body.name.trim()
                : "";

        const email =
            typeof body.email === "string"
                ? body.email.trim().toLowerCase()
                : "";

        const phone =
            typeof body.phone === "string"
                ? body.phone.trim()
                : "";

        const message =
            typeof body.message === "string"
                ? body.message.trim()
                : "";

        if (!name || !email || !message) {
            return Response.json(
                {
                    message:
                        "Name, email, and message are required.",
                },
                { status: 400 }
            );
        }

        const resendResponse = await fetch(
            "https://api.resend.com/emails",
            {
                method: "POST",

                headers: {
                    Authorization: `Bearer ${resendApiKey}`,
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    from: `Cleaning With Wendy <${fromEmail}>`,
                    to: [wendyEmail],
                    subject: `New Cleaning Request - ${name}`,
                    reply_to: email,

                    html: `
                        <h2>New Cleaning Request</h2>

                        <p>
                            Someone submitted a request
                            through we-premium.com.
                        </p>

                        <hr>

                        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                        <p><strong>Phone:</strong> ${escapeHtml(phone) || "Not provided"}</p>

                        <h3>What they need:</h3>

                        <p>
                            ${escapeHtml(message).replace(/\n/g, "<br>")}
                        </p>

                        <hr>

                        <p>
                            Click Reply to respond directly
                            to the customer.
                        </p>
                    `,
                }),
            }
        );

        const resendData = await resendResponse.json();

        if (!resendResponse.ok) {
            console.error("Resend error:", resendData);

            return Response.json(
                {
                    message:
                        "We couldn't send your request right now. Please try again.",
                },
                { status: 500 }
            );
        }

        return Response.json(
            {
                message:
                    "Your request has been sent successfully.",
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Quote function error:", error);

        return Response.json(
            {
                message:
                    "We couldn't send your request right now. Please try again.",
            },
            { status: 500 }
        );
    }
};

export const config = {
    path: "/api/send-quote",
};