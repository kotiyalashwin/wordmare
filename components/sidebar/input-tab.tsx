"use client";
import { Textarea } from "../ui/textarea";
import { CornerRightDown, Keyboard } from "lucide-react";
import { useGetTaskInputs, useGetTasks } from "@/hooks/getTasks";
import { TaskContent } from "@/store/task";
import { FormEvent } from "react";
interface InputTabProps {
  onSubmit: (newTasks: TaskContent[]) => void;
  disabled?: boolean;
}

export const InputTab = ({ onSubmit, disabled }: InputTabProps) => {
  const tasks = useGetTasks();
  const inputs = tasks.filter((task) => task.input).map((task) => task.input!);

  const createUpdatedTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    //to map the inputs with the values
    const inputMap = new Map<string, string>();
    inputs.forEach((input) => {
      const value = formData.get(input.id) as string;
      if (value !== null && value.trim()) {
        inputMap.set(input.id, value);
      }
    });

    //update the tasks
    const updatedTasks = tasks.map((task) => {
      if (task.input && inputMap.has(task.input.id)) {
        return {
          ...task,
          prompt: `${task.prompt}:"${inputMap.get(task.input.id)}"`,
        };
      }
      return task;
    });

    onSubmit(updatedTasks);
  };

  return (
    <div className="w-full p-4">
      <p className="flex text-lg items-center gap-2 ">
        <Keyboard />
        Inputs
      </p>
      <div className="">
        <div className="py-2">
          {inputs.length > 0 ? (
            <>
              <form
                onSubmit={createUpdatedTask}
                className="flex flex-col justify-evenly gap-4 mt-4"
              >
                {inputs.map((input, idx) => (
                  <div>
                    <label className="flex items-center">
                      <span className="">{input?.content}</span>
                      <CornerRightDown className="mt-2" size={15} />
                    </label>
                    <Textarea
                      id={input.id}
                      name={input.id}
                      defaultValue={""}
                      className="mt-2 focus-visible:ring-0 focus-visible:border-teal-600 transition-all ease-in-out duration-550 border-teal-400/25"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
                >
                  Submit Tasks
                </button>
              </form>
            </>
          ) : (
            <p className="text-neutral-400 text-center text-xl">
              Please add inputs{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
