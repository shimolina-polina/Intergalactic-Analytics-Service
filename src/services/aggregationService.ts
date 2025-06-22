import { aggregationApi } from '../api/aggregationApi';
import { useAggregationStore } from '../store/useAggregationStore';
import { useUploadStore } from '../store/useUploadStore';
import { normalizeMetrics } from '../utils/normalizeMetrics';
import { useHistoryService } from './historyService';

export const useAggregationService = () => {
    const setMetrics = useAggregationStore((state) => state.setMetrics);
    const setLoading = useAggregationStore((state) => state.setLoading);
    const setError = useAggregationStore((state) => state.setError);
    const setUploadState = useUploadStore((s) => s.setUploadState);
    const setFile = useUploadStore((s) => s.setFile);
    const clearUpload = useUploadStore((s) => s.clear);
    const clearAggregation = useAggregationStore((s) => s.clear);
    const { addItem } = useHistoryService();

    const handleUpload = async (file: File | undefined) => {
        setLoading(true);
        setUploadState('parsing');
        setError(null);

        try {
            if (file) {
                await aggregationApi.streamAggregation(
                    file,
                    (data) => {
                        setMetrics(normalizeMetrics(data));
                    },
                    (data) => {
                        setUploadState('done');
                        addItem(file.name, 'success', normalizeMetrics(data));
                    },
                );
            }
        } catch (err) {
            setUploadState('error');
            setError(`Произошла ошибка при обработке файла: ${err}`);
            if (file) addItem(file.name, 'fail', undefined);
        } finally {
            setLoading(false);
        }
    };

    const handleFile = (file: File) => {
        if (file.type === 'text/csv') {
            setFile(file);
            setUploadState('uploaded');
        } else {
            setFile(file);
            setError(`загрузите csv файл!`);
            setUploadState('error');
        }
    };

    const handleClear = (fileInputRef: React.RefObject<HTMLInputElement | null>) => {
        clearUpload();
        clearAggregation();

        if (fileInputRef?.current) {
            fileInputRef.current.value = '';
        }
    };

    return {
        handleUpload,
        handleFile,
        handleClear,
    };
};
