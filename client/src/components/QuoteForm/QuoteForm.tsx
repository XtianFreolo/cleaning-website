import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import styles from "./QuoteForm.module.css";

type QuoteFormData = {
    name: string;
    email: string;
    phone: string;
    service: string;
    bedrooms: string;
    bathrooms: string;
    message: string;
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

function QuoteForm() {
    // Stores everything the customer types/selects in the form.
    const [formData, setFormData] = useState<QuoteFormData>({
        name: "",
        email: "",
        phone: "",
        service: "",
        bedrooms: "",
        bathrooms: "",
        message: "",
    });

    // Keeps track of what the form is currently doing.
    const [submitStatus, setSubmitStatus] =
        useState<SubmitStatus>("idle");

    // Stores the message we want to show underneath the button.
    const [submitMessage, setSubmitMessage] = useState("");

    const handleChange = (
        event:
            | ChangeEvent<HTMLInputElement>
            | ChangeEvent<HTMLSelectElement>
            | ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));

        // If the customer starts filling out another quote after
        // previously submitting one, remove the old success/error message.
        if (submitStatus === "success" || submitStatus === "error") {
            setSubmitStatus("idle");
            setSubmitMessage("");
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        // Prevent the browser from refreshing when the form is submitted.
        event.preventDefault();

        // Immediately change the button to "Sending..."
        setSubmitStatus("submitting");
        setSubmitMessage("");

        try {
            // Send the quote information to our Express backend.
            const response = await fetch(
                "http://localhost:5000/api/quotes",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(formData),
                }
            );

            // Convert the JSON response from Express into JavaScript.
            const data = await response.json();

            // fetch() does not automatically throw an error for
            // HTTP errors such as 400 or 500, so we check manually.
            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Something went wrong while submitting your quote."
                );
            }

            console.log("Quote submitted successfully:", data);

            // Tell React that the submission succeeded.
            setSubmitStatus("success");

            setSubmitMessage(
                "Thank you! We received your quote request and will be in touch soon."
            );

            // Clear the form after a successful submission.
            setFormData({
                name: "",
                email: "",
                phone: "",
                service: "",
                bedrooms: "",
                bathrooms: "",
                message: "",
            });
        } catch (error) {
            console.error("Error submitting quote:", error);

            // Tell React that something went wrong.
            setSubmitStatus("error");

            if (error instanceof Error) {
                setSubmitMessage(error.message);
            } else {
                setSubmitMessage(
                    "We couldn't submit your quote right now. Please try again."
                );
            }
        }
    };

    return (
        <section id="quote" className={styles.quoteSection}>
            <div className={styles.container}>
                <div className={styles.heading}>
                    <p className={styles.eyebrow}>Request a Quote</p>

                    <h2>Ready for a Cleaner Home?</h2>

                    <p>
                        Tell us a little about your home and the type of cleaning you need.
                        Cleaning With Wendy will get back to you with more information.
                    </p>
                </div>

                <div className={styles.quoteBox}>
                    <div className={styles.infoSide}>
                        <p className={styles.infoEyebrow}>
                            Cleaning With Wendy
                        </p>

                        <h3>
                            Let&apos;s Make Your Space Feel Fresh Again.
                        </h3>

                        <p>
                            Whether you need recurring cleaning, a deep clean, or help before
                            or after a move, tell us what you need and we&apos;ll help you get
                            started.
                        </p>

                        <div className={styles.infoList}>
                            <div>
                                <span>01</span>
                                <p>Tell us about your home.</p>
                            </div>

                            <div>
                                <span>02</span>
                                <p>Choose the cleaning service you need.</p>
                            </div>

                            <div>
                                <span>03</span>
                                <p>We&apos;ll follow up about your quote.</p>
                            </div>
                        </div>
                    </div>

                    <form
                        className={styles.form}
                        onSubmit={handleSubmit}
                    >
                        <div className={styles.formGrid}>
                            <div className={styles.field}>
                                <label htmlFor="name">
                                    Name *
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="email">
                                    Email *
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="phone">
                                    Phone
                                </label>

                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="(555) 555-5555"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="service">
                                    Cleaning Service *
                                </label>

                                <select
                                    id="service"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Select a service
                                    </option>

                                    <option value="standard">
                                        Standard Cleaning
                                    </option>

                                    <option value="deep">
                                        Deep Cleaning
                                    </option>

                                    <option value="move">
                                        Move-In / Move-Out
                                    </option>

                                    <option value="other">
                                        Other
                                    </option>
                                </select>
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="bedrooms">
                                    Bedrooms
                                </label>

                                <select
                                    id="bedrooms"
                                    name="bedrooms"
                                    value={formData.bedrooms}
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        Select
                                    </option>

                                    <option value="studio">
                                        Studio
                                    </option>

                                    <option value="1">
                                        1 Bedroom
                                    </option>

                                    <option value="2">
                                        2 Bedrooms
                                    </option>

                                    <option value="3">
                                        3 Bedrooms
                                    </option>

                                    <option value="4">
                                        4 Bedrooms
                                    </option>

                                    <option value="5+">
                                        5+ Bedrooms
                                    </option>
                                </select>
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="bathrooms">
                                    Bathrooms
                                </label>

                                <select
                                    id="bathrooms"
                                    name="bathrooms"
                                    value={formData.bathrooms}
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        Select
                                    </option>

                                    <option value="1">
                                        1 Bathroom
                                    </option>

                                    <option value="2">
                                        2 Bathrooms
                                    </option>

                                    <option value="3">
                                        3 Bathrooms
                                    </option>

                                    <option value="4+">
                                        4+ Bathrooms
                                    </option>
                                </select>
                            </div>

                            <div
                                className={`${styles.field} ${styles.fullWidth}`}
                            >
                                <label htmlFor="message">
                                    Anything else we should know?
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    placeholder="Tell us about your space, schedule, or any areas that need extra attention..."
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={submitStatus === "submitting"}
                        >
                            {submitStatus === "submitting"
                                ? "Sending..."
                                : "Request My Quote"}
                        </button>

                        {submitStatus === "success" && (
                            <p
                                className={styles.successMessage}
                                role="status"
                                aria-live="polite"
                            >
                                {submitMessage}
                            </p>
                        )}

                        {submitStatus === "error" && (
                            <p
                                className={styles.errorMessage}
                                role="alert"
                            >
                                {submitMessage}
                            </p>
                        )}

                        <p className={styles.formNote}>
                            We&apos;ll only use your information to respond to your cleaning
                            request.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default QuoteForm;