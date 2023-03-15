import styles from "./Layout.module.scss";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
const Layout = () => {
    return (
        <main className={styles.layout}>
            <Header />
            <Outlet />
        </main>
    );
};

export default Layout;
