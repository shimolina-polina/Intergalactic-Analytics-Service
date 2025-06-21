import { create } from 'zustand';
import { historyApi } from '../api/historyApi';
import type { HistoryItem } from '../api/historyApi';

interface HistoryStore {
    history: HistoryItem[];
    load: () => void;
    add: (item: HistoryItem) => void;
    remove: (id: string) => void;
    clear: () => void;
}

export const useHistoryStore = create<HistoryStore>((set) => ({
    history: historyApi.getAll(),

    load: () => {
        set({ history: historyApi.getAll() });
    },

    add: (item) => {
        historyApi.add(item);
        set({ history: historyApi.getAll() });
    },

    remove: (id) => {
        historyApi.remove(id);
        set({ history: historyApi.getAll() });
    },

    clear: () => {
        historyApi.clear();
        set({ history: [] });
    },
}));
