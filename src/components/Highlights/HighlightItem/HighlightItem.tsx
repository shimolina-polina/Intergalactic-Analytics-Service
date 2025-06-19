import styles from './HighlightItem.module.css';


export default function HighlightItem ({value, label} : {value: string | number, label: string}) {
  return (
    <div className={styles.container}>
        <p className={styles.value}>{value}</p>
        <p className={styles.label}>{label}</p>
    </div>
  );
};