import { useDownloadStore } from '../../../store/useDownloadStore';
import UploadButton, { type DownloadState } from '../../UI/UploadButton/UploadButton';
import styles from './Generator.module.css';
import { useGenerationService } from '../../../services/generationService';
import { useGenerationStore } from '../../../store/useGenerationStore';
import { useEffect } from 'react';

type InfoObject = {
    text: string;
    hintText: string | null;
};

type InfoMap = Map<DownloadState, InfoObject>;

export default function Generator() {
    const downloadState = useDownloadStore((s) => s.downloadState);
    const clear = useDownloadStore((s) => s.clear);
    const { handleStartGeneration, handleClear } = useGenerationService();
    const error = useGenerationStore((s) => s.error);
    const map: InfoMap = new Map([
        [
            'start',
            {
                text: 'Начать генерацию',
                hintText: '',
            },
        ],
        [
            'parsing',
            {
                text: '',
                hintText: 'идёт процесс генерации',
            },
        ],
        [
            'done',
            {
                text: 'Done!',
                hintText: 'файл сгенерирован!',
            },
        ],
        [
            'error',
            {
                text: 'Ошибка',
                hintText: error,
            },
        ],
    ]);

    useEffect(() => {
        return () => {
            clear();
        };
    }, [clear]);

    return (
        <div className={styles.container}>
            <p className={styles.instruction}>
                Сгенерируйте готовый csv-файл нажатием одной кнопки
            </p>
            <UploadButton
                state={downloadState}
                text={map.get(downloadState)?.text ?? ''}
                hintText={map.get(downloadState)?.hintText ?? ''}
                onClick={() => handleStartGeneration()}
                onClear={() => handleClear()}
            />
        </div>
    );
}
