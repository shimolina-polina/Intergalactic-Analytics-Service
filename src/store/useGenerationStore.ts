import { create } from 'zustand';

type GenerationStore = {
    isLoading: boolean;
    error: string | null;
    setLoading: (loading: boolean) => void;
    setError: (message: string | null) => void;
    clear: () => void;
};

export const useGenerationStore = create<GenerationStore>((set) => ({
    isLoading: false,
    error: null,
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (message) => set({ error: message }),
    clear: () => set({ isLoading: false, error: null }),
}));
