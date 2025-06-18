import { useRef, useState } from 'react';
import styles from './UploadField.module.css';
import UploadButton from '../../UI/UploadButton/UploadButton';
import { useUpload as useUploadState } from '../../../context/UploadContext/UploadContext';
import type { UploadState } from '../../UI/UploadButton/UploadButton';

type InfoObject = {
    text: string;
    hintText: string;
};

type InfoMap = Map<UploadState, InfoObject>;

export default function UploadField() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [fileName, setFileName] = useState<string>('');
    const { uploadState, setUploadState } = useUploadState();

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
                hintText: 'упс, не то...',
            },
        ],
    ]);

    const handleFile = (file: File) => {
        if (file.type === 'text/csv') {
            // TODO: Обработка CSV файла
            setFileUploaded(true);
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
        if (e.dataTransfer.files.length > 0) {
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
            className={`${styles.container} ${isDragging ? styles.dragOver : ''} ${fileUploaded ? styles.uploaded : ''}`}
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
                onClick={fileUploaded ? () => {} : () => fileInputRef.current?.click()}
            />
        </div>
    );
}
