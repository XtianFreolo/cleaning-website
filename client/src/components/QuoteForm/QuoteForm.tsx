import { useState } from "react";
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

function QuoteForm() {
    const [formData, setFormData] = useState<QuoteFormData>({
        name: "",
        email: "",
        phone: "",
        service: "",
        bedrooms: "",
        bathrooms: "",
        message: "",
    });

    const handleChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        console.log("Quote request:", formData);
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
                        <p className={styles.infoEyebrow}>Cleaning With Wendy</p>

                        <h3>Let&apos;s Make Your Space Feel Fresh Again.</h3>

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

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formGrid}>
                            <div className={styles.field}>
                                <label htmlFor="name">Name *</label>

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
                                <label htmlFor="email">Email *</label>

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
                                <label htmlFor="phone">Phone</label>

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
                                <label htmlFor="service">Cleaning Service *</label>

                                <select
                                    id="service"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a service</option>
                                    <option value="standard">Standard Cleaning</option>
                                    <option value="deep">Deep Cleaning</option>
                                    <option value="move">Move-In / Move-Out</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="bedrooms">Bedrooms</label>

                                <select
                                    id="bedrooms"
                                    name="bedrooms"
                                    value={formData.bedrooms}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="studio">Studio</option>
                                    <option value="1">1 Bedroom</option>
                                    <option value="2">2 Bedrooms</option>
                                    <option value="3">3 Bedrooms</option>
                                    <option value="4">4 Bedrooms</option>
                                    <option value="5+">5+ Bedrooms</option>
                                </select>
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="bathrooms">Bathrooms</label>

                                <select
                                    id="bathrooms"
                                    name="bathrooms"
                                    value={formData.bathrooms}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="1">1 Bathroom</option>
                                    <option value="2">2 Bathrooms</option>
                                    <option value="3">3 Bathrooms</option>
                                    <option value="4+">4+ Bathrooms</option>
                                </select>
                            </div>

                            <div className={`${styles.field} ${styles.fullWidth}`}>
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

                        <button type="submit" className={styles.submitButton}>
                            Request My Quote
                        </button>

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