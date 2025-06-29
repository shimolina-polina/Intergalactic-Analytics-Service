import { useDownloadStore } from '../store/useDownloadStore';
import { generationApi } from '../api/generationApi';
import { useGenerationStore } from '../store/useGenerationStore';
import downloadFile from '../utils/downloadFile';

export const useGenerationService = (api = generationApi, downloader = downloadFile) => {
    const setDownloadState = useDownloadStore((s) => s.setDownloadState);
    const setLoading = useGenerationStore((state) => state.setLoading);
    const setError = useGenerationStore((state) => state.setError);
    const clear = useDownloadStore((s) => s.clear);

    const handleStartGeneration = async () => {
        setDownloadState('parsing');
        try {
            const blob = await api.getReport();
            downloader(blob, 'input.csv');
            setDownloadState('done');
        } catch (err) {
            setError(`Произошла ошибка при генерации файла: ${err}`);
            setDownloadState('error');
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        clear();
    };

    return {
        handleStartGeneration,
        handleClear,
    };
};
