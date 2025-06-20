import { create } from 'zustand';
import type { DownloadState } from '../components/UI/UploadButton/UploadButton';


interface DownloadStore {
    downloadState: DownloadState;
    setDownloadState: (state: DownloadState) => void;
}

export const useDownloadStore = create<DownloadStore>((set) => ({
    downloadState: 'start',
    setDownloadState: (state) => set({ downloadState: state }),
}));
