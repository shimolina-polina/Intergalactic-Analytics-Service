import styles from './UploadButton.module.css';

export type UploadState = 'primary' | 'uploaded' | 'parsing' | 'done' | 'error';

interface UploadButtonProps {
    state: UploadState;
    text: string;
    hintText: string;
    onClick?: () => void;
}

export default function UploadButton({ state, text, hintText, onClick }: UploadButtonProps) {
    return (
        <>
            <button className={`${styles.uploadButton} ${styles[state]}`} onClick={onClick}>
                {state === 'parsing' ? (
                    <img
                        src="/loader.svg"
                        alt="Загрузка..."
                        className={styles.loaderImg}
                    />
                ) : (
                    text
                )}
            </button>
            <p className={`${styles.hint} ${state === 'error' ? styles.hintError : ''}`}>
                {hintText}
            </p>
        </>
    );
}
