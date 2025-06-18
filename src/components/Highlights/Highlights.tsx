import HighlightItem from './HighlightItem/HighlightItem';
import styles from './Highlights.module.css';

const metrics = [
    { value: '1000', label: 'общие расходы в галактических кредитах' },
    { value: '45056', label: 'количество обработанных записей' },
    { value: '1 апреля', label: 'день года с минимальными расходами' },
    { value: 'humans', label: 'цивилизация с максимальными расходами' },
    { value: 'blobs', label: 'цивилизация с минимальными расходами' },
    { value: '2 апреля', label: 'день года с максимальными расходами' },
    { value: '678899', label: 'максимальная сумма расходов за день' },
    { value: '876', label: 'средние расходы в галактических кредитах' }
];

export default function Highlights({ dataExists }: { dataExists: boolean }) {
    return (
        <div className={styles.container}>
            {!dataExists ? (
                <p className={styles.placeholder}>
                    Здесь <br /> появятся хайлайты
                </p>
            ) : (
                <div className={styles.grid}>
                    {metrics.map((metric, index) => (
                        <HighlightItem key={index} value={metric.value} label={metric.label}/>
                    ))}
                </div>
            )}
        </div>
    );
}
