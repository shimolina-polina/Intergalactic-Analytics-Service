import FileUploadField from '../../components/AnalyticsComponents/FileUpload/FileUpload';
import Highlights from '../../components/AnalyticsComponents/Highlights/Highlights';
import styles from './AnalyticsPage.module.css';

export default function AnalyticsPage() {
    return (
        <div className={styles.container}>
            <FileUploadField />
            <Highlights />
        </div>
    );
}
