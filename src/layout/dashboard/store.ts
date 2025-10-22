import { create } from "zustand";

interface Client {
  selectedVersion: string;
  setSelectedVersion: (value: string) => void;
}

export const useClientStore = create<Client>((set) => ({
  selectedVersion: "",
  setSelectedVersion: (value: string) => set({ selectedVersion: value }),
}));
