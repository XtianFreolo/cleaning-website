import styles from "./Testimonials.module.css";

type Testimonial = {
    quote: string;
    name: string;
    location: string;
};

const testimonials: Testimonial[] = [
    {
        quote:
            "Wendy is dependable, thorough, and always leaves our home feeling fresh and comfortable.",
        name: "Client Name",
        location: "Maryland",
    },
    {
        quote:
            "The attention to detail is what stands out the most. Everything feels noticeably cleaner after every visit.",
        name: "Client Name",
        location: "Washington, DC",
    },
    {
        quote:
            "Professional, friendly, and easy to work with. I would absolutely recommend Cleaning With Wendy.",
        name: "Client Name",
        location: "Northern Virginia",
    },
];

function Testimonials() {
    return (
        <section className={styles.testimonials}>
            <div className={styles.container}>
                <div className={styles.heading}>
                    <p className={styles.eyebrow}>Kind Words</p>

                    <h2>What Our Clients Are Saying</h2>

                    <p>
                        A clean home is important, but earning our clients' trust is what
                        matters most.
                    </p>
                </div>

                <div className={styles.grid}>
                    {testimonials.map((testimonial) => (
                        <article className={styles.card} key={testimonial.quote}>
                            <div className={styles.stars}>★★★★★</div>

                            <blockquote>
                                “{testimonial.quote}”
                            </blockquote>

                            <div className={styles.client}>
                                <strong>{testimonial.name}</strong>
                                <span>{testimonial.location}</span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;