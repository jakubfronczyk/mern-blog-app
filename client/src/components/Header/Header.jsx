import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const Header = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/post`, {
            credentials: "include",
        }).then((response) => {
            response.json().then((userInfo) => {
                setUserInfo(userInfo);
            });
        });
    }, []);

    const handleLogout = () => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
            credentials: "include",
            method: "POST",
        })
            .then(() => {
                // Remove the JWT token from local storage
                localStorage.removeItem("jwt");
                // Update the user info state to null
                setUserInfo(null);
                // Redirect the user to the main page or login page
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const username = userInfo?.username;
    console.log(import.meta.env.VITE_API_BASE_URL);
    return (
        <header className={styles.header}>
            <Link
                to="/"
                className={styles.header__logo}
            >
                Dev Dairies
            </Link>
            <nav className={styles.header__navbar}>
                {username && (
                    <>
                        <Link
                            to="/create"
                            className={styles.header__navbar__link}
                        >
                            Create Post
                        </Link>
                        <a
                            onClick={handleLogout}
                            className={styles.header__navbar__link}
                        >
                            Logout
                        </a>
                    </>
                )}
                {!username && (
                    <>
                        <Link
                            to="/login"
                            className={styles.header__navbar__link}
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className={styles.header__navbar__link}
                        >
                            Register
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
