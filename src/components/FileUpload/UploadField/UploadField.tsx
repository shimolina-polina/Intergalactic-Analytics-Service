import { useEffect, useRef, useState } from 'react';
import styles from './UploadField.module.css';
import UploadButton from '../../UI/UploadButton/UploadButton';
import { useUpload as useUploadState } from '../../../context/UploadContext/UploadContext';
import type { UploadState } from '../../UI/UploadButton/UploadButton';
import { useAggregationStore } from '../../../store/useAggregationStore';

type InfoObject = {
    text: string;
    hintText: string | null;
};

type InfoMap = Map<UploadState, InfoObject>;

export default function UploadField({ setFile }: { setFile: (file: File | undefined) => void }) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState<string>('');
    const { uploadState, setUploadState } = useUploadState();

    const error = useAggregationStore((s) => s.error);
    const isLoading = useAggregationStore((s) => s.isLoading);
    const setMetrics = useAggregationStore((s) => s.setMetrics);
    const setError = useAggregationStore((s) => s.setError);
    const inputDisabled =
        !!fileName.length ||
        uploadState === 'done' ||
        uploadState === 'error' ||
        uploadState === 'uploaded' ||
        uploadState === 'parsing';

    useEffect(() => {
        if (error?.length) setUploadState('error');
    }, [error]);

    useEffect(() => {
        if (isLoading) setUploadState('parsing');
    }, [isLoading]);

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
                text: fileName,
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
                text: fileName,
                hintText: 'готово!',
            },
        ],
        [
            'error',
            {
                text: fileName,
                hintText: error,
            },
        ],
    ]);

    const handleFile = (file: File) => {
        if (file.type === 'text/csv') {
            setFile(file);
            setUploadState('uploaded');
            setFileName(file.name);
            console.log('Загружен файл:', file.name);
        } else {
            alert('Пожалуйста, загрузите CSV файл.');
        }
    };

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

    const handleClear = () => {
        setFile(undefined);
        setUploadState('primary');
        setFileName('')

        setMetrics(null);
        setError('')

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
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
                onClear={() => handleClear()}
            />
        </div>
    );
}
