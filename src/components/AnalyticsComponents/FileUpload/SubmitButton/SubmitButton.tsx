import Button from '../../../UI/Button/Button';
import styles from './SubmitButton.module.css';
import { useUploadStore } from '../../../../store/useUploadStore';

export default function SubmitButton({ onClick }: { onClick: () => void }) {
    const uploadState = useUploadStore((s) => s.uploadState);
    const enabled = uploadState === 'uploaded';

    return (
        <div className={`${styles.container} ${uploadState === 'parsing' ? styles.hidden : ''}`}>
            {uploadState !== 'parsing' && uploadState !== 'done' && (
                <Button
                    text="Отправить"
                    variant={enabled ? 'primary' : 'disabled'}
                    onClick={onClick}
                />
            )}
        </div>
    );
}
