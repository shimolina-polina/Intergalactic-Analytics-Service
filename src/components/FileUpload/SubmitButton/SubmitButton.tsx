import Button from '../../UI/Button/Button';
import styles from './SubmitButton.module.css';
import { useUpload as useUploadState } from '../../../context/UploadContext/UploadContext';

export default function SubmitButton({onClick}: {onClick: () => void;}) {

  const { uploadState } = useUploadState();
  const enabled = uploadState === 'uploaded'
  
  return (
    <div className={`${styles.container} ${uploadState === 'parsing'? styles.hidden : ''}`}>
      {uploadState !== 'parsing' && uploadState !== 'done' && <Button
        text="Отправить"
        variant={enabled ? 'primary' : 'disabled'}
        onClick={onClick}
      />}
    </div>
  );
}
