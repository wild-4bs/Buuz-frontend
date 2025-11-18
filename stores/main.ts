import { create } from "zustand";

interface MainStore {
  baseUrl: string;
  smoothScrolling: boolean;
  pageContent: any;
  setPageContent: (data: any) => void;
  stopLenis: () => void;
  startLenis: () => void;
}

export const useMainStore = create<MainStore>((set) => ({
  baseUrl: "https://buuz-api.onrender.com",
  smoothScrolling: true,
  pageContent: {},
  setPageContent: (data) => set(() => ({ pageContent: data })),
  stopLenis: () => set(() => ({ smoothScrolling: false })),
  startLenis: () => set(() => ({ smoothScrolling: true })),
}));
