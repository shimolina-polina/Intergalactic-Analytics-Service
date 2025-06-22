import { NavLink } from 'react-router-dom';
import styles from './MenuButton.module.css';

export default function MenuButton({
    title,
    link,
    svg,
}: {
    title: string;
    link: string;
    svg: string;
}) {
    return (
        <NavLink
            end
            to={link}
            className={({ isActive }) => `${styles.link} ${isActive ? styles.selected : ''}`}
        >
            <div className={styles.buttonContainer}>
                <img src={svg} alt={title} className={styles.buttonLogo} />
                <span>{title}</span>
            </div>
        </NavLink>
    );
}
