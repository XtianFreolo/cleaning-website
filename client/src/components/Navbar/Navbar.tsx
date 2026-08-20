import styles from "./Navbar.module.css";

function Navbar() {
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>

                <a href="/" className={styles.logo}>
                    Cleaning With Wendy
                </a>

                <div className={styles.navLinks}>
                    <a href="#home">Home</a>
                    <a href="#services">Services</a>
                    <a href="#about">About</a>
                    <a href="#gallery">Gallery</a>
                    <a href="#contact">Contact</a>
                </div>

                <a href="#quote" className={styles.quoteButton}>
                    Get a Free Quote
                </a>

            </nav>
        </header>
    );
}

export default Navbar;