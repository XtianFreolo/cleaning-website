import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import styles from "./QuoteForm.module.css";


type QuoteFormData = {
    name: string;
    email: string;
    phone: string;
    message: string;
};


type SubmitStatus =
    | "idle"
    | "submitting"
    | "success"
    | "error";


function QuoteForm() {
    const [formData, setFormData] = useState<QuoteFormData>({
        name: "",
        email: "",
        phone: "",
        message: "",
    });


    const [submitStatus, setSubmitStatus] =
        useState<SubmitStatus>("idle");


    const [submitMessage, setSubmitMessage] =
        useState("");


    const handleChange = (
        event:
            | ChangeEvent<HTMLInputElement>
            | ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;


        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));


        if (
            submitStatus === "success" ||
            submitStatus === "error"
        ) {
            setSubmitStatus("idle");
            setSubmitMessage("");
        }
    };


    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();


        setSubmitStatus("submitting");
        setSubmitMessage("");


        try {
            const response = await fetch(
                "http://localhost:5000/api/quotes",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        message: formData.message,
                    }),
                }
            );


            const data = await response.json();


            if (!response.ok) {
                throw new Error(
                    data.message ||
                        "Something went wrong while sending your request."
                );
            }


            setSubmitStatus("success");

            setSubmitMessage(
                "Thank you! Wendy received your request and will be in touch soon."
            );


            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
            });

        } catch (error) {
            console.error(
                "Error submitting cleaning request:",
                error
            );


            setSubmitStatus("error");


            if (error instanceof Error) {
                setSubmitMessage(error.message);
            } else {
                setSubmitMessage(
                    "We couldn't send your request right now. Please try again."
                );
            }
        }
    };


    return (
        <section
            id="quote"
            className={styles.quoteSection}
        >
            <div className={styles.container}>

                <div className={styles.heading}>
                    <p className={styles.eyebrow}>
                        Get a Free Quote
                    </p>

                    <h2>
                        Tell Wendy What You Need
                    </h2>

                    <p>
                        Send us a few details about the cleaning
                        you&apos;re looking for and Wendy will
                        contact you directly.
                    </p>
                </div>


                <div className={styles.quoteBox}>

                    <div className={styles.infoSide}>

                        <p className={styles.infoEyebrow}>
                            Cleaning With Wendy
                        </p>

                        <h3>
                            A Cleaner Space Starts Here.
                        </h3>

                        <p>
                            Tell Wendy what you need and she&apos;ll
                            follow up with you personally to discuss
                            your cleaning and quote.
                        </p>


                        <div className={styles.infoList}>

                            <div>
                                <span>01</span>
                                <p>
                                    Tell us how to reach you.
                                </p>
                            </div>

                            <div>
                                <span>02</span>
                                <p>
                                    Describe the cleaning you need.
                                </p>
                            </div>

                            <div>
                                <span>03</span>
                                <p>
                                    Wendy will contact you directly.
                                </p>
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


                            <div
                                className={`${styles.field} ${styles.fullWidth}`}
                            >
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


                            <div
                                className={`${styles.field} ${styles.fullWidth}`}
                            >
                                <label htmlFor="message">
                                    Tell Wendy what you need *
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    placeholder="For example: I have a 3-bedroom townhouse and I'm interested in biweekly cleaning. I'd like help with the kitchen, bathrooms, floors, and general cleaning."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>


                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={
                                submitStatus === "submitting"
                            }
                        >
                            {submitStatus === "submitting"
                                ? "Sending..."
                                : "Request a Quote"}
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
                            We&apos;ll only use your information
                            to respond to your cleaning request.
                        </p>

                    </form>

                </div>

            </div>
        </section>
    );
}


export default QuoteForm;