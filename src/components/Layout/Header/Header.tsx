import styles from './Header.module.css';
import Logo from './Logo/Logo';
import Menu from './Menu/Menu';
import Name from './Name/Name';

export default function Header() {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.logoAndName}>
                <Logo />
                <Name />
            </div>
            <Menu />
        </div>
    );
}
