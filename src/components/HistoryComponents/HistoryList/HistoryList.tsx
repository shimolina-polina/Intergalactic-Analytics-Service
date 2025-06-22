import { useHistoryService } from '../../../services/historyService';
import HistoryItem from './HistoryItem/HistoryItem';
import styles from './HistoryList.module.css';

export default function HistoryList() {
    const { history, removeItem } = useHistoryService();

    return (
        <div className={styles.container}>
            {history.map((item) => (
                <HistoryItem item={item} key={item.id} onDelete={removeItem} />
            ))}
        </div>
    );
}
