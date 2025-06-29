import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAggregationService } from '../../services/aggregationService';
import { aggregationApi } from '../../api/aggregationApi';

vi.mock('../../api/aggregationApi', () => ({
    aggregationApi: {
        streamAggregation: vi.fn(),
    },
}));

vi.mock('../../services/historyService', () => ({
    useHistoryService: vi.fn(),
}));

vi.mock('../../store/useUploadStore', () => ({
    useUploadStore: vi.fn(),
}));

vi.mock('../../store/useAggregationStore', () => ({
    useAggregationStore: vi.fn(),
}));

import { useHistoryService } from '../../services/historyService';
import { useUploadStore } from '../../store/useUploadStore';
import { useAggregationStore } from '../../store/useAggregationStore';


describe('useAggregationService', () => {
    const setMetrics = vi.fn();
    const setLoading = vi.fn();
    const setError = vi.fn();
    const setUploadState = vi.fn();
    const setFile = vi.fn();
    const clearUpload = vi.fn();
    const clearAggregation = vi.fn();
    const addItem = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        (useHistoryService as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            addItem,
        });

        (useAggregationStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(
            (sel: any) => sel({ setMetrics, setLoading, setError, clear: clearAggregation })
        );

        (useUploadStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(
            (sel: any) => sel({ setUploadState, setFile, clear: clearUpload })
        );
    });

    it('загружает корректный CSV', () => {
        const { handleFile } = useAggregationService();
        const file = new File(['content'], 'data.csv', { type: 'text/csv' });

        handleFile(file);

        expect(setFile).toHaveBeenCalledWith(file);
        expect(setUploadState).toHaveBeenCalledWith('uploaded');
        expect(setError).not.toHaveBeenCalled();
    });

    it('загружает неправильный файл', () => {
        const { handleFile } = useAggregationService();
        const file = new File(['content'], 'wrong.txt', { type: 'text/plain' });

        handleFile(file);

        expect(setFile).toHaveBeenCalledWith(file);
        expect(setUploadState).toHaveBeenCalledWith('error');
        expect(setError).toHaveBeenCalledWith(expect.stringMatching(/csv/i));
    });

    it('очищает стейт и инпут', () => {
        const { handleClear } = useAggregationService();
        const ref = { current: { value: 'some' } } as React.RefObject<HTMLInputElement>;

        handleClear(ref);

        expect(clearUpload).toHaveBeenCalled();
        expect(clearAggregation).toHaveBeenCalled();
        expect(ref.current!.value).toBe('');
    });

    it('загружает файл и вызывает стрим + сохраняет в localStorage', async () => {
        const { handleUpload } = useAggregationService();
        const file = new File(['content'], 'test.csv', { type: 'text/csv' });

        (aggregationApi.streamAggregation as any).mockImplementation(async (_: any, onChunk: (arg0: { metric: number; }) => void, onDone: (arg0: { metric: number; }) => void) => {
            onChunk({ metric: 123 });
            onDone({ metric: 456 });
        });

        await handleUpload(file);

        expect(setLoading).toHaveBeenCalledWith(true);
        expect(setUploadState).toHaveBeenCalledWith('parsing');
        expect(setError).toHaveBeenCalledWith(null);

        expect(setMetrics).toHaveBeenCalled();
        expect(setUploadState).toHaveBeenCalledWith('done');
        expect(addItem).toHaveBeenCalledWith('test.csv', 'success', expect.anything());

        expect(setLoading).toHaveBeenCalledWith(false);
    });

    it('отрабатывает ошибку', async () => {
        const { handleUpload } = useAggregationService();
        const file = new File(['bad'], 'fail.csv', { type: 'text/csv' });

        (aggregationApi.streamAggregation as any).mockRejectedValue(new Error('fail'));

        await handleUpload(file);

        expect(setUploadState).toHaveBeenCalledWith('error');
        expect(setError).toHaveBeenCalledWith(expect.stringMatching(/ошибка/i));
        expect(addItem).toHaveBeenCalledWith('fail.csv', 'fail', undefined);
        expect(setLoading).toHaveBeenCalledWith(false);
    });
});
