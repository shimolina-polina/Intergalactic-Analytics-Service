import type { NormalizedResult } from '../utils/normalizeMetrics';

const HISTORY_KEY = 'history';

export type HistoryItem = {
    id: string;
    title: string;
    createdAt: string;
    result: 'success' | 'fail';
    metrics: NormalizedResult | undefined;
};

export const historyApi = {
    getAll(): HistoryItem[] {
        const raw = localStorage.getItem(HISTORY_KEY);
        return raw ? JSON.parse(raw) : [];
    },
    add(item: HistoryItem) {
        const existing = historyApi.getAll();
        localStorage.setItem(HISTORY_KEY, JSON.stringify([item, ...existing]));
    },
    remove(id: string) {
        const filtered = historyApi.getAll().filter((item) => item.id !== id);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
    },
    clear() {
        localStorage.removeItem(HISTORY_KEY);
    },
};
