import { create } from "zustand";

interface Lab {
  LabId: string;
  setLabId: (value: string) => void;
}

export const useLabStore = create<Lab>((set) => ({
  LabId: "",
  setLabId: (value: string) => set({ LabId: value }),
}));
