import { create } from 'zustand';
import type { NormalizedResult } from '../utils/normalizeMetrics';

type AggregationStore = {
    metrics: NormalizedResult | null;
    isLoading: boolean;
    error: string | null;
    setMetrics: (data: NormalizedResult | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (message: string | null) => void;
    clear: () => void;
};

export const useAggregationStore = create<AggregationStore>((set) => ({
    metrics: null,
    isLoading: false,
    error: null,
    setMetrics: (data) => set({ metrics: data }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (message) => set({ error: message }),
    clear: () => set({ metrics: null, isLoading: false, error: null }),
}));
