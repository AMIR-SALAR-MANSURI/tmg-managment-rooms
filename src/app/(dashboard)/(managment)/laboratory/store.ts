import { create } from "zustand";

interface Lab {
  LabId: string;
  setLabId: (value: string) => void;

  LabDeleteId: string;
  setLabDeleteId: (value: string) => void;
}

export const useLabStore = create<Lab>((set) => ({
  LabId: "",
  setLabId: (value: string) => set({ LabId: value }),

  LabDeleteId: "",
  setLabDeleteId: (value: string) => set({ LabDeleteId: value }),
}));
