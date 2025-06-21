import styles from './Layout.module.css'
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className={styles.layoutContainer}>
            <Header />
            <div className={styles.childrenContainer}>
                <Outlet />
            </div>
            
        </div>
    )
}