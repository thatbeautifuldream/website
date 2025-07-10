import { create } from "zustand";

interface LayoutDebugState {
  isDebugMode: boolean;
  toggleDebugMode: () => void;
  setDebugMode: (enabled: boolean) => void;
}

export const useLayoutDebugStore = create<LayoutDebugState>((set) => ({
  isDebugMode: false,
  toggleDebugMode: () => set((state) => ({ isDebugMode: !state.isDebugMode })),
  setDebugMode: (enabled: boolean) => set({ isDebugMode: enabled }),
}));
