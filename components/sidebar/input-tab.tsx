"use client";
import { Textarea } from "../ui/textarea";
import { CornerRightDown, Keyboard } from "lucide-react";
import { useGetTaskInputs } from "@/hooks/getTasks";

export const InputTab = () => {
  const inputs = useGetTaskInputs();
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
              <form className="flex flex-col justify-evenly gap-4 mt-4">
                {inputs.map((input, idx) => (
                  <div>
                    <label className="flex items-center">
                      <span className="">{input?.content}</span>
                      <CornerRightDown className="mt-2" size={15} />
                    </label>
                    <Textarea className="mt-2 focus-visible:ring-0 focus-visible:border-teal-600 transition-all ease-in-out duration-550 border-teal-400/25" />
                  </div>
                ))}
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
