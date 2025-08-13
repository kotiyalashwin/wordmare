// useTaskStore.ts
import { create } from "zustand";

export interface TaskContent {
  prompt?: string;
  input?: {
    id: string;
    type: "input";
    content: string;
  };
  tool?: any;
}

interface TaskStore {
  tasks: TaskContent[];
  setTasks: (tasks: TaskContent[]) => void;
  getAllTasks: () => TaskContent[];
  getTaskInputs: () => Array<TaskContent["input"]>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  getAllTasks: () => get().tasks,
  getTaskInputs: () => {
    return get()
      .tasks.filter((task) => task.input)
      .map((task) => task.input!);
  },
}));
