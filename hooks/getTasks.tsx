import { useTaskStore } from "@/store/task";

export function useGetTasks() {
  const { getAllTasks } = useTaskStore();

  return getAllTasks();
}

export function useGetTaskInputs() {
  const { getTaskInputs } = useTaskStore();
  return getTaskInputs();
}
