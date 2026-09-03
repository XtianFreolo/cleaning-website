import styles from "./WhyChooseUs.module.css";

type Reason = {
    title: string;
    description: string;
};

const reasons: Reason[] = [
    {
        title: "Reliable Service",
        description:
            "Dependable scheduling and consistent cleaning you can count on.",
    },
    {
        title: "Detailed Cleaning",
        description:
            "We pay attention to the small details that make your home feel truly clean.",
    },
    {
        title: "Personalized Care",
        description:
            "Every home is different, so your cleaning service is tailored to your needs.",
    },
    {
        title: "Friendly & Professional",
        description:
            "Respectful, trustworthy service with clear communication from start to finish.",
    },
];

function WhyChooseUs() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.heading}>
                    <p className={styles.eyebrow}>Why Choose Us</p>

                    <h2>A Cleaning Service You Can Feel Good About</h2>

                    <p>
                        We believe a great cleaning service should give you more than a
                        clean home — it should give you peace of mind.
                    </p>
                </div>

                <div className={styles.grid}>
                    {reasons.map((reason, index) => (
                        <article className={styles.card} key={reason.title}>
                            <span className={styles.number}>
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            <h3>{reason.title}</h3>

                            <p>{reason.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WhyChooseUs;