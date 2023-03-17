import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const Header = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);

    useEffect(() => {
        fetch("http://localhost:4000/profile", {
            credentials: "include",
        }).then((response) => {
            response.json().then((userInfo) => {
                setUserInfo(userInfo);
            });
        });
    }, []);

    const handleLogout = () => {
        fetch("http://localhost:4000/logout", {
            credentials: "include",
            method: "POST",
        });
        setUserInfo(null);
    };

    const username = userInfo?.username;

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
