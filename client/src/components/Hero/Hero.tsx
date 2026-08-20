import styles from "./Hero.module.css";

function Hero() {
    return (
        <section id="home" className={styles.hero}>
            {/* 
        Overlay keeps white text readable even when
        we use a bright cleaning photograph.
      */}
            <div className={styles.overlay}></div>

            <div className={styles.content}>
                <p className={styles.eyebrow}>
                    Professional Cleaning Services
                </p>

                <h1>
                    A Cleaner Home, A Cleaner Business, A Cleaner Office.
                    <span>A Happier You.</span>
                </h1>

                <p className={styles.description}>
                    Reliable, detailed cleaning services designed to give you
                    more time to enjoy the things that matter most.
                </p>

                <div className={styles.buttons}>
                    <a href="#quote" className={styles.primaryButton}>
                        Get a Free Quote
                    </a>

                    <a href="#services" className={styles.secondaryButton}>
                        View Our Services
                    </a>
                </div>

                {/* Trust indicators */}
                <div className={styles.trustRow}>
                    <span>✓ Reliable</span>
                    <span>✓ Detailed</span>
                    <span>✓ Local</span>
                </div>
            </div>
        </section>
    );
}

export default Hero;