import { create } from 'zustand';
import type { DownloadState } from '../components/UI/UploadButton/UploadButton';


interface DownloadStore {
    downloadState: DownloadState;
    setDownloadState: (state: DownloadState) => void;
    clear: () => void;
}

export const useDownloadStore = create<DownloadStore>((set) => ({
    downloadState: 'start',
    setDownloadState: (state) => set({ downloadState: state }),
    clear: () => set({downloadState: 'start'})
}));
