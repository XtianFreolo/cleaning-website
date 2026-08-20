import styles from "./About.module.css";

function About() {
    return (
        <section id="about" className={styles.about}>
            <div className={styles.container}>
                <div className={styles.imageSide}>
                    <div className={styles.imageWrapper}>
                        <img
                            src="/images/wendy-about.jpg"
                            alt="Wendy from Cleaning With Wendy"
                            className={styles.image}
                        />
                    </div>
                </div>

                <div className={styles.content}>
                    <p className={styles.eyebrow}>Meet Wendy</p>

                    <h2>
                        Cleaning Your Home With Care, Detail, and Respect
                    </h2>

                    <p className={styles.description}>
                        Cleaning With Wendy is built around a simple idea: your home
                        deserves the same attention and care that we would give our own.
                    </p>

                    <p className={styles.description}>
                        We provide dependable residential cleaning with a focus on
                        consistency, attention to detail, and making every space feel
                        fresh, comfortable, and welcoming.
                    </p>

                    <div className={styles.highlights}>
                        <div className={styles.highlight}>
                            <span className={styles.check}>✓</span>

                            <div>
                                <h3>Personal Service</h3>
                                <p>
                                    Every home is different, so we take the time to understand
                                    what matters most to you.
                                </p>
                            </div>
                        </div>

                        <div className={styles.highlight}>
                            <span className={styles.check}>✓</span>

                            <div>
                                <h3>Attention to Detail</h3>
                                <p>
                                    We focus on the small things that help make your entire
                                    home feel cleaner.
                                </p>
                            </div>
                        </div>

                        <div className={styles.highlight}>
                            <span className={styles.check}>✓</span>

                            <div>
                                <h3>Reliable & Dependable</h3>
                                <p>
                                    Clear communication and consistent service are part of
                                    every visit.
                                </p>
                            </div>
                        </div>
                    </div>

                    <a href="#contact" className={styles.button}>
                        Get to Know Us
                    </a>
                </div>
            </div>
        </section>
    );
}

export default About;