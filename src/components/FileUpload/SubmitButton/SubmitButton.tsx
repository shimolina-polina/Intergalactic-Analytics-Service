import Button from '../../UI/Button/Button';
import styles from './SubmitButton.module.css';
import { useUpload as useUploadState } from '../../../context/UploadContext/UploadContext';

export default function SubmitButton() {

  const { uploadState, setUploadState } = useUploadState();
  const enabled = uploadState === 'uploaded'
  
  return (
    <div className={`${styles.container} ${uploadState === 'parsing'? styles.hidden : ''}`}>
      {uploadState !== 'parsing' && <Button
        text="Отправить"
        variant={enabled ? 'primary' : 'disabled'}
        onClick={() => setUploadState('parsing')}
      />}
    </div>
  );
}
