import styles from "./Layout.module.scss";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
const Layout = () => {
    return (
        <main className={styles.layout}>
            <div className={styles.layout__wrapper}>
                <Header />
                <Outlet />
            </div>
        </main>
    );
};

export default Layout;
