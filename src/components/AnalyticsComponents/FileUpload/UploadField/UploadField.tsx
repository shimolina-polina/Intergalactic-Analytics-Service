import { useEffect, useRef, useState } from 'react';
import styles from './UploadField.module.css';
import UploadButton from '../../../UI/UploadButton/UploadButton';
import type { UploadState } from '../../../UI/UploadButton/UploadButton';
import { useAggregationStore } from '../../../../store/useAggregationStore';
import { useUploadStore } from '../../../../store/useUploadStore';
import { useAggregationService } from '../../../../services/aggregationService';

type InfoObject = {
    text: string;
    hintText: string | null;
};

type InfoMap = Map<UploadState, InfoObject>;

export default function UploadField() {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const uploadState = useUploadStore((s) => s.uploadState);
    const file = useUploadStore((s) => s.file);
    const error = useAggregationStore((s) => s.error);
    const { handleFile, handleClear } = useAggregationService();

    const inputDisabled = ['uploaded', 'parsing', 'done', 'error'].includes(uploadState);

    const map: InfoMap = new Map([
        [
            'primary',
            {
                text: 'Загрузить файл',
                hintText: 'или перетащите сюда',
            },
        ],
        [
            'uploaded',
            {
                text: file?.name ?? '',
                hintText: 'файл загружен!',
            },
        ],
        [
            'parsing',
            {
                text: '',
                hintText: 'идёт парсинг файла',
            },
        ],
        [
            'done',
            {
                text: file?.name ?? '',
                hintText: 'готово!',
            },
        ],
        [
            'error',
            {
                text: file?.name ?? '',
                hintText: error,
            },
        ],
    ]);


    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files.length > 0 && !inputDisabled) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = () => {
        setIsDragging(false);
    };


    return (
        <div
            className={`${styles.container} ${isDragging ? styles.dragOver : ''} ${uploadState === 'uploaded' || inputDisabled ? styles.disabled : ''}`}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
        >
            <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={(e) => {
                    if (e.target.files?.[0]) {
                        handleFile(e.target.files[0]);
                    }
                }}
                className={styles.notDisplayed}
            />
            <UploadButton
                state={uploadState}
                text={map.get(uploadState)?.text ?? ''}
                hintText={map.get(uploadState)?.hintText ?? ''}
                disabled={inputDisabled}
                onClick={() => fileInputRef.current?.click()}
                onClear={() => handleClear(fileInputRef)}
            />
        </div>
    );
}
