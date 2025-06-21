import { create } from 'zustand';
import type { UploadState } from '../components/UI/UploadButton/UploadButton';

interface UploadStore {
    uploadState: UploadState;
    setUploadState: (state: UploadState) => void;
    file: File | undefined;
    setFile: (file: File | undefined) => void;
    clear: () => void;
}

export const useUploadStore = create<UploadStore>((set) => ({
    uploadState: 'primary' as UploadState,
    setUploadState: (state) => set({ uploadState: state }),
    file: undefined,
    setFile: (f) => set({ file: f }),
    clear: () => set({ uploadState: 'primary', file: undefined }),
}));
