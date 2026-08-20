import styles from "./Services.module.css";

type Service = {
    title: string;
    description: string;
    image: string;
};

const services: Service[] = [
    {
        title: "Standard Cleaning",
        description:
            "Reliable routine cleaning to keep your home fresh, comfortable, and ready for everyday life.",
        image: "/images/standard-cleaning.jpg",
    },
    {
        title: "Deep Cleaning",
        description:
            "A detailed top-to-bottom clean for spaces that need a little extra care and attention.",
        image: "/images/deep-cleaning.jpg",
    },
    {
        title: "Move-In / Move-Out",
        description:
            "Thorough cleaning for empty homes, apartments, and properties before or after a move.",
        image: "/images/move-cleaning.jpg",
    },
];

function Services() {
    return (
        <section id="services" className={styles.services}>
            <div className={styles.container}>
                <div className={styles.heading}>
                    <p className={styles.eyebrow}>What We Do</p>

                    <h2>Cleaning Services Made for Your Home</h2>

                    <p className={styles.intro}>
                        Cleaning With Wendy provides dependable, detailed cleaning
                        services designed around your space and your schedule.
                    </p>
                </div>

                <div className={styles.grid}>
                    {services.map((service) => (
                        <article className={styles.card} key={service.title}>
                            <div className={styles.imageWrapper}>
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className={styles.image}
                                />
                            </div>

                            <div className={styles.cardContent}>
                                <h3>{service.title}</h3>

                                <p>{service.description}</p>

                                <a href="#quote" className={styles.learnMore}>
                                    Learn More →
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Services;