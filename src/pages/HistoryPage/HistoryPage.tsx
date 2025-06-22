import ClearAllButton from '../../components/HistoryComponents/ClearAllButton/ClearAllButton';
import GenerateButton from '../../components/HistoryComponents/GenerateButton/GenerateButton';
import HistoryList from '../../components/HistoryComponents/HistoryList/HistoryList';
import styles from './HistoryPage.module.css';

const HistoryPage = () => {
    return (
        <div className={styles.container}>
            <HistoryList />
            <div className={styles.buttons}>
                <GenerateButton />
                <ClearAllButton />
            </div>
        </div>
    );
};

export default HistoryPage;
