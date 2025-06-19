import { createContext, useContext, useState, type ReactNode } from 'react';
import type { UploadState } from '../../components/AnalyticsComponents/FileUpload/UploadField/UploadButton/UploadButton';

interface UploadContextType {
    uploadState: UploadState;
    setUploadState: (state: UploadState) => void;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [uploadState, setUploadState] = useState<UploadState>('primary');

    return (
        <UploadContext.Provider value={{ uploadState, setUploadState }}>
            {children}
        </UploadContext.Provider>
    );
};

export const useUpload = () => {
    const context = useContext(UploadContext);
    if (!context) {
        throw new Error('useUpload must be used within an UploadProvider');
    }
    return context;
};
