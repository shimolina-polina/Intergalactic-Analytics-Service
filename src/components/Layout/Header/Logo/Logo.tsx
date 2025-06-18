import logo from '/logo.svg'
import styles from './Logo.module.css'

export default function Logo () {
    return (
        <div className={styles.svgContainer}>
            <img 
                src={logo}
                alt="Лого летних школ" 
                className={styles.svgImage}
            />
        </div>
    )
}