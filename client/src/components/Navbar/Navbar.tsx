import styles from "./Navbar.module.css";

function Navbar() {
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                {/* 
          Temporary business name.
          Later we can replace this text with your actual logo image.
        */}
                <a href="/" className={styles.logo}>
                    WENDY CLEANING KOMPANY
                </a>

                {/* Main navigation */}
                <div className={styles.navLinks}>
                    <a href="#home">Home</a>
                    <a href="#services">Services</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </div>

                {/* Primary call-to-action */}
                <a href="#quote" className={styles.quoteButton}>
                    Get a Free Quote
                </a>
            </nav>
        </header>
    );
}

export default Navbar;