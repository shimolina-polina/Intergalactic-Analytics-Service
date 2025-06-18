import MenuButton from "./MenuButton/MenuButton";
import analystIcon from '/analystIcon.svg'
import historyIcon from '/historyIcon.png'
import generatorIcon from '/generatorIcon.svg'
import styles from './Menu.module.css'

export default function Menu() {
    return (
        <div className={styles.menuContainer}>
            <MenuButton title="CSV Аналитик" link="/analytics" svg={analystIcon}/>
            <MenuButton title="CSV Генератор" link="/generator" svg={generatorIcon}/>
            <MenuButton title="История" link="/history" svg={historyIcon}/>
        </div>
    )
}