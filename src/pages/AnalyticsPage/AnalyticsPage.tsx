import FileUploadField from '../../components/FileUpload/FileUpload';
import Highlights from '../../components/Highlights/Highlights';
import { UploadProvider } from '../../context/UploadContext/UploadContext';
import styles from './AnalyticsPage.module.css';

export default function AnalyticsPage () {
  return (
    <UploadProvider>
      <div className={styles.container}>
        <FileUploadField />
        <Highlights />
      </div>
    </UploadProvider>
    
  );
};