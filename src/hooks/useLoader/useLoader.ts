import { create } from 'zustand';

type LoaderState = {
    isLoading: boolean;
    start: () => void;
    stop: () => void;
};

export const useLoader = create<LoaderState>(set => ({
    isLoading: false,
    start: () => set(() => ({ isLoading: true })),
    stop: () => set(() => ({ isLoading: false })),
}));
