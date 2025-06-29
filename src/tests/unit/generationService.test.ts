import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useGenerationService } from '../../services/generationService';
import { generationApi } from '../../api/generationApi';
import { useDownloadStore } from '../../store/useDownloadStore';
import { useGenerationStore } from '../../store/useGenerationStore';
import downloadFile from '../../utils/downloadFile';

vi.mock('../../api/generationApi');
vi.mock('../../store/useDownloadStore');
vi.mock('../../store/useGenerationStore');
vi.mock('../../utils/downloadFile');

describe('generationService', () => {
    const fakeBlob = new Blob(['file content'], { type: 'text/csv' });

    const setDownloadStateMock = vi.fn();
    const setLoadingMock = vi.fn();
    const setErrorMock = vi.fn();
    const clearMock = vi.fn();

    beforeEach(() => {
        vi.resetAllMocks();

        (useDownloadStore as unknown as vi.Mock).mockImplementation((selector) =>
            selector({
                setDownloadState: setDownloadStateMock,
                clear: clearMock,
            }),
        );
        (useGenerationStore as unknown as vi.Mock).mockImplementation((selector) =>
            selector({
                setLoading: setLoadingMock,
                setError: setErrorMock,
            }),
        );

        (generationApi.getReport as vi.Mock).mockResolvedValue(fakeBlob);
    });

    it('устанавливает состояние "parsing" при старте генерации', async () => {
        const service = useGenerationService();
        await service.handleStartGeneration();
        expect(setDownloadStateMock).toHaveBeenCalledWith('parsing');
    });

    it('вызывает generationApi.getReport', async () => {
        const service = useGenerationService();
        await service.handleStartGeneration();
        expect(generationApi.getReport).toHaveBeenCalled();
    });

    it('вызывает downloadFile с правильными аргументами', async () => {
        const service = useGenerationService();
        await service.handleStartGeneration();

        const [[actualBlob, actualFilename]] = (downloadFile as vi.Mock).mock.calls;

        expect(actualBlob).toBeInstanceOf(Blob);
        expect(actualFilename).toBe('input.csv');
    });
    
    it('устанавливает состояние "done" после успешной генерации', async () => {
        const service = useGenerationService();
        await service.handleStartGeneration();
        expect(setDownloadStateMock).toHaveBeenCalledWith('done');
    });

    it('выключает лоадер после завершения', async () => {
        const service = useGenerationService();
        await service.handleStartGeneration();
        expect(setLoadingMock).toHaveBeenCalledWith(false);
    });

    it('устанавливает ошибку при неудачной генерации', async () => {
        const error = new Error('fail');
        (generationApi.getReport as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(error);

        const service = useGenerationService();
        await service.handleStartGeneration();

        expect(setErrorMock).toHaveBeenCalledWith(`Произошла ошибка при генерации файла: ${error}`);
    });

    it('устанавливает состояние "error" при неудачной генерации', async () => {
        const error = new Error('fail');
        (generationApi.getReport as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(error);

        const service = useGenerationService();
        await service.handleStartGeneration();

        expect(setDownloadStateMock).toHaveBeenCalledWith('error');
    });

    it('очищает стор при вызове handleClear', () => {
        const service = useGenerationService();
        service.handleClear();
        expect(clearMock).toHaveBeenCalled();
    });
});
