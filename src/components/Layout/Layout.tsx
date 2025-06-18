import type { ReactNode } from "react";
import styles from './Layout.module.css'
import Header from "./Header/Header";

export default function Layout({children}: {children: ReactNode}) {
    return (
        <div className={styles.layoutContainer}>
            <Header />
            <div className={styles.childrenContainer}>
                {children}
            </div>
            
        </div>
    )
}