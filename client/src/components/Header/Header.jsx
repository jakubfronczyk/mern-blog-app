import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className={styles.header}>
            <Link
                to="/"
                className={styles.header__logo}
            >
                MyBlog
            </Link>
            <nav className={styles.header__navbar}>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </header>
    );
};

export default Header;
