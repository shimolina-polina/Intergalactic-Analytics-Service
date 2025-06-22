import { useAggregationService } from '../../../services/aggregationService';
import { useUploadStore } from '../../../store/useUploadStore';
import styles from './FileUpload.module.css';
import SubmitButton from './SubmitButton/SubmitButton';
import UploadField from './UploadField/UploadField';

export default function FileUploadField() {
    const file = useUploadStore((s) => s.file);
    const { handleUpload } = useAggregationService();

    return (
        <div className={styles.container}>
            <p className={styles.instruction}>
                Загрузите{' '}
                <span>
                    <strong>csv</strong>
                </span>{' '}
                файл и получите{' '}
                <span>
                    <strong>полную информацию</strong>
                </span>{' '}
                о нём за сверхнизкое время
            </p>
            <UploadField />
            <SubmitButton onClick={() => handleUpload(file)} />
        </div>
    );
}
