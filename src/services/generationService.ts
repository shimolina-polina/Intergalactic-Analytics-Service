import { useDownloadStore } from '../store/useDownloadStore';
import { generationApi } from '../api/generationApi';
import { useGenerationStore } from '../store/useGenerationStore';

export const useGenerationService = () => {
    const setDownloadState = useDownloadStore((s) => s.setDownloadState);
    const setLoading = useGenerationStore((state) => state.setLoading);
    const setError = useGenerationStore((state) => state.setError);
    const clear = useDownloadStore((s) => s.clear);

    const handleStartGeneration = async () => {
        setDownloadState('parsing');
        try {
            const blob = await generationApi.getReport();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'input.csv';
            a.click();
            URL.revokeObjectURL(url);
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
