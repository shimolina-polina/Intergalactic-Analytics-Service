import { useAggregationStore } from '../../store/useAggregationStore';
import HighlightItem from './HighlightItem/HighlightItem';
import styles from './Highlights.module.css';
import type { AggregatedResult } from '../../services/aggregateService';
import { useEffect } from 'react';

const metricsMap: { key: keyof AggregatedResult; label: string }[] = [
    { key: 'total_spend_galactic', label: 'общие расходы в галактических кредитах' },
    { key: 'rows_affected', label: 'количество обработанных записей' },
    { key: 'less_spent_at', label: 'день года с минимальными расходами' },
    { key: 'big_spent_at', label: 'день года с максимальными расходами' },
    //{ key: 'less_spent_value', label: 'минимальная сумма расходов за день' },
    { key: 'big_spent_value', label: 'максимальная сумма расходов за день' },
    { key: 'average_spend_galactic', label: 'средние расходы в галактических кредитах' },
    { key: 'less_spent_civ', label: 'цивилизация с минимальными расходами' },
    { key: 'big_spent_civ', label: 'цивилизация с максимальными расходами' },
];

export default function Highlights() {
    const metrics = useAggregationStore((s) => s.metrics);

    useEffect(() => {
        console.log('metrics changed', metrics);
    }, [metrics]);

    return (
        <div className={styles.container}>
            {!metrics ? (
                <p className={styles.placeholder}>
                    Здесь <br /> появятся хайлайты
                </p>
            ) : (
                <div className={styles.grid}>
                    {metricsMap.map(({ key, label }) => (
                        <HighlightItem key={key} value={metrics[key]} label={label} />
                    ))}
                </div>
            )}
        </div>
    );
}
