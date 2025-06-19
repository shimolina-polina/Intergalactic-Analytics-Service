import styles from './UploadButton.module.css';

export type UploadState = 'primary' | 'uploaded' | 'parsing' | 'done' | 'error';

export type DownloadState = 'start' | 'parsing' | 'done' | 'error';

interface UploadButtonProps {
    state: UploadState | DownloadState;
    text: string;
    hintText: string;
    onClick?: () => void;
    onClear?: () => void;
    disabled?: boolean;
}

export default function UploadButton({
    state,
    text,
    hintText,
    onClick,
    disabled = false,
    onClear,
}: UploadButtonProps) {
    return (
        <>
            <div className={styles.buttonContainer}>
                <button
                    className={`${styles.uploadButton} ${styles[state]}`}
                    onClick={onClick}
                    disabled={disabled}
                >
                    {state === 'parsing' ? (
                        <img src="/loader.svg" alt="Загрузка..." className={styles.loaderImg} />
                    ) : (
                        text
                    )}
                </button>
                <button
                    className={`${styles.clearButton} ${state === 'primary' || state === 'parsing' || state === 'start' ? styles.hidden : ''}`}
                    onClick={onClear}
                >
                    <img src="/close.svg" alt="Очистить поле" className={styles.crossImg} />
                </button>
            </div>

            <p className={`${styles.hint} ${state === 'error' ? styles.hintError : ''}`}>
                {hintText}
            </p>
        </>
    );
}
