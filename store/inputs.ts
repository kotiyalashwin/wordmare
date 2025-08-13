import { create } from 'zustand';

interface InputStore {
  // State
  inputs: string[];

  // Actions
  addInput: (input: string) => void;
  removeInput: (index: number) => void;
  updateInput: (index: number, newValue: string) => void;
  clearInputs: () => void;
  setInputs: (newInputs: string[]) => void;

  // Getters
  getInputCount: () => number;
  getInput: (index: number) => string | undefined;
  getAllInputs: () => string[];
}

const useInputStore = create<InputStore>((set, get) => ({
  // State
  inputs: ["task1", "task2"],

  // Actions
  addInput: (input: string) =>
    set((state) => ({
      inputs: [...state.inputs, input],
    })),

  removeInput: (index: number) =>
    set((state) => ({
      inputs: state.inputs.filter((_, i) => i !== index),
    })),

  updateInput: (index: number, newValue: string) =>
    set((state) => ({
      inputs: state.inputs.map((input, i) => (i === index ? newValue : input)),
    })),

  clearInputs: () => set({ inputs: [] }),

  setInputs: (newInputs: string[]) => set({ inputs: newInputs }),

  // Getters
  getInputCount: () => get().inputs.length,

  getInput: (index: number) => get().inputs[index],

  getAllInputs: () => get().inputs,
}));

export default useInputStore;