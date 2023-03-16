import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
    const [username, setUserName] = useState(null);

    useEffect(() => {
        fetch("http://localhost:4000/profile", {
            credentials: "include",
        }).then((response) => {
            response.json().then((userInfo) => {
                setUserName(userInfo.username);
            });
        });
    }, []);

    const handleLogout = () => {
        fetch("http://localhost:4000/logout", {
            credentials: "include",
            method: "POST",
        });
        setUserName(null);
    };

    return (
        <header className={styles.header}>
            <Link
                to="/"
                className={styles.header__logo}
            >
                MyBlog
            </Link>
            <nav className={styles.header__navbar}>
                {username && (
                    <>
                        <Link to="/create">Create new post</Link>
                        <a onClick={handleLogout}>Logout</a>
                    </>
                )}
                {!username && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
