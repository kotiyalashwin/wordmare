import { create } from "zustand";

interface FlowNameStore {
  name: string;
  getName: () => string;
  setName: (input: string) => void;
}
const useFlowNameStore = create<FlowNameStore>((set, get) => ({
  name: "Flow Name",
  getName: () => get().name,
  setName: (value: string) => set({ name: value }),
}));

export default useFlowNameStore;
