import { InputTab } from "./input-tab";
import { ArrowLeft } from "lucide-react";
import { TaskContent } from "@/store/task";
import { useCallback, useRef, useState } from "react";
import { OutputContent } from "./output-tab";

export interface TaskResult {
  id: string;
  status: "idle" | "loading" | "success" | "error";
  output?: string;
  error?: string;
  prompt?: string;
}

export const MainContentSidebar = () => {
  const [taskResults, setTaskResults] = useState<TaskResult[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Mock API call - replace with your actual API call
  const callAPI = async (
    prompt: string,
    signal: AbortSignal
  ): Promise<string> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (signal.aborted) {
      throw new Error("Request aborted");
    }

    // Simulate occasional errors for demo
    if (Math.random() < 0.1) {
      throw new Error("API Error: Something went wrong");
    }

    return `Generated response for: ${prompt.substring(0, 50)}...`;
  };

  const updateTaskResult = useCallback(
    (id: string, update: Partial<TaskResult>) => {
      setTaskResults((prev) =>
        prev.map((result) =>
          result.id === id ? { ...result, ...update } : result
        )
      );
    },
    []
  );

  const generate = useCallback(
    async (newTasks: TaskContent[]) => {
      console.log("Generate called with:", newTasks);

      // Filter tasks that have prompts and inputs
      const validTasks = newTasks.filter(
        (task) => task.prompt && task.input?.id
      );
      console.log("Valid tasks:", validTasks);

      if (validTasks.length === 0) {
        console.log("No valid tasks found");
        return;
      }

      // Initialize task results
      const initialResults: TaskResult[] = validTasks.map((task) => ({
        id: task.input!.id,
        status: "idle" as const,
        prompt: task.prompt,
      }));

      console.log("Initial results:", initialResults);
      setTaskResults(initialResults);
      setIsGenerating(true);
      setShowOutput(true); // Show output overlay

      // Create abort controller for cancellation
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        // Process tasks sequentially
        for (let i = 0; i < validTasks.length; i++) {
          const task = validTasks[i];
          const taskId = task.input!.id;

          console.log(`Processing task ${i + 1}/${validTasks.length}:`, taskId);

          // Check if operation was cancelled
          if (abortController.signal.aborted) break;

          // Update status to loading
          updateTaskResult(taskId, { status: "loading" });

          try {
            // Make API call
            const output = await callAPI(task.prompt!, abortController.signal);

            // Update with success
            updateTaskResult(taskId, {
              status: "success",
              output,
            });
          } catch (error) {
            // Update with error
            updateTaskResult(taskId, {
              status: "error",
              error: error instanceof Error ? error.message : "Unknown error",
            });
          }

          // Small delay between requests for better UX
          if (i < validTasks.length - 1 && !abortController.signal.aborted) {
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        }
      } finally {
        setIsGenerating(false);
        abortControllerRef.current = null;
      }
    },
    [updateTaskResult]
  );

  const cancelGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsGenerating(false);
    }
  }, []);

  const goBackToInputs = useCallback(() => {
    setShowOutput(false);
    setTaskResults([]);
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* Input Section - Always rendered but hidden when output is shown */}
      <div className={`w-full h-full ${showOutput ? "hidden" : "block"}`}>
        <div className="w-full py-6 border-b">
          <div className="flex-1">
            <InputTab onSubmit={generate} />
          </div>
        </div>
      </div>

      {/* Output Section - Renders over input when shown */}
      {showOutput && (
        <div className="absolute inset-0 w-full h-full bg-white z-10">
          {/* Header with back button */}
          <div className="w-full py-4 px-6 border-b bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={goBackToInputs}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                  disabled={isGenerating}
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span className="font-medium">Back to Inputs</span>
                </button>
                <div className="h-4 w-px bg-gray-300" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Generation Results
                </h2>
              </div>
            </div>
          </div>

          {/* Output Content */}
          {/* <div className="h-full overflow-hidden"> */}
          <OutputContent
            taskResults={taskResults}
            isGenerating={isGenerating}
            onCancel={cancelGeneration}
          />
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

// export const MainContentSidebar = () => {
//   const output = false;
//   return (
//     <Tabs defaultValue="account" className="w-full h-full">
//       <TabsList className="w-full  py-6">
//         <TabsTrigger
//           value="inputs"
//           className="text-teal-600 font-semibold p-4  data-[state=active]:border-teal-600 "
//         >
//           Inputs
//         </TabsTrigger>
//         <TabsTrigger
//           value="output"
//           className="text-teal-600 font-semibold p-4 data-[state=active]:border-teal-600"
//         >
//           Outputs
//         </TabsTrigger>
//       </TabsList>
//       <TabsContent value="inputs">
//         <InputTab />
//       </TabsContent>
//       <TabsContent value="output">
//         {output ? "Here is your output" : "Output not generated"}
//       </TabsContent>
//     </Tabs>
//   );
// };
