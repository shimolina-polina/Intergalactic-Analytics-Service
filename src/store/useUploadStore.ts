import { create } from 'zustand';
import type { UploadState } from '../components/UI/UploadButton/UploadButton';

interface UploadStore {
    uploadState: UploadState;
    setUploadState: (state: UploadState) => void;
}

export const useUploadStore = create<UploadStore>((set) => ({
    uploadState: 'primary',
    setUploadState: (state) => set({ uploadState: state }),
}));
