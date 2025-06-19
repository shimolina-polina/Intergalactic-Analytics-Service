import { useAggregationStore } from '../../store/useAggregationStore';
import styles from './FileUpload.module.css';
import SubmitButton from './SubmitButton/SubmitButton';
import UploadField from './UploadField/UploadField';
import { aggregateService } from '../../services/aggregateService';
import { useState } from 'react';
import { normalizeMetrics } from '../../utils/normalizeMetrics';
import { useUpload as useUploadState } from '../../context/UploadContext/UploadContext'

export default function FileUploadField() {
    const setMetrics = useAggregationStore((state) => state.setMetrics);
    const setLoading = useAggregationStore((state) => state.setLoading);
    const setError = useAggregationStore((state) => state.setError);

    const [file, setFile] = useState<File | undefined>(undefined);
    const { setUploadState } = useUploadState();

    const handleFileUpload = async () => {
        console.log('started');
        setLoading(true);
        setError(null);

        try {
            if (file) {
                await aggregateService.streamAggregation(file, (data) => {
                    setMetrics(normalizeMetrics(data));
                    console.log(data);
                }, () => {setUploadState('done')});
            }
        } catch (err) {
            setError(`Произошла ошибка при обработке файла: ${err}`);
        } finally {
            setLoading(false);
        }
    };

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
            <UploadField setFile={setFile} />
            <SubmitButton onClick={() => handleFileUpload()} />
        </div>
    );
}
