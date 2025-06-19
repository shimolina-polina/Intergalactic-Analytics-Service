import { create } from 'zustand';
import type { AggregatedResult } from '../services/aggregateService';

type AggregationStore = {
  metrics: AggregatedResult | null;
  isLoading: boolean;
  error: string | null;
  setMetrics: (data: AggregatedResult | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (message: string | null) => void;
  clear: () => void;
};

export const useAggregationStore = create<AggregationStore>((set) => ({
  metrics: null,
  isLoading: false,
  error: null,
  setMetrics: (data) => set({ metrics: data? data : null} ),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (message) => set({ error: message }),
  clear: () => set({ metrics: null, isLoading: false, error: null }),
}));
