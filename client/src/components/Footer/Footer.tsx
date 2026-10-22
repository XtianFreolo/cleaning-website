import styles from "./Footer.module.css";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.main}>
                    <div className={styles.brand}>
                        <a href="#home" className={styles.logo}>
                            Cleaning With Wendy
                        </a>

                        <p>
                            Reliable, consistent cleaning service designed to give you time and a peace of mind.
                        </p>
                    </div>

                    <div className={styles.column}>
                        <h3>Explore</h3>

                        <nav className={styles.links}>
                            <a href="#home">Home</a>
                            <a href="#services">Services</a>
                            <a href="#about">About</a>
                            <a href="#quote">Get a Quote</a>
                        </nav>
                    </div>

                    <div className={styles.column}>
                        <h3>Services</h3>

                        <div className={styles.links}>
                            <a href="#services">Standard Cleaning</a>
                            <a href="#services">Deep Cleaning</a>
                            <a href="#services">Move-In / Move-Out</a>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h3>Contact</h3>

                        <div className={styles.contact}>
                            <p>
                                <span>Phone</span>
                                352-213-1926
                            </p>

                            <p>
                                <span>Email</span>
                                WePremiumService@yahoo.com
                            </p>

                            <p>
                                <span>Service Area</span>
                                D.M.V.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>
                        © {currentYear} Cleaning With Wendy. All rights reserved.
                    </p>

                    <p className={styles.credit}>
                        Professional cleaning services you can count on.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;