import { TaskResult } from "./maincontent";
import { TaskResultCard } from "./task-results";
interface OutputContentProps {
  taskResults: TaskResult[];
  isGenerating: boolean;
  onCancel: () => void;
}

export const OutputContent = ({
  taskResults,
  isGenerating,
  onCancel,
}: OutputContentProps) => {
  console.log("OutputContent rendering with:", { taskResults, isGenerating });

  const completedCount = taskResults.filter(
    (r) => r.status === "success" || r.status === "error"
  ).length;
  const successCount = taskResults.filter((r) => r.status === "success").length;
  const errorCount = taskResults.filter((r) => r.status === "error").length;

  return (
    <div className=" flex  flex-col">
      <div className="flex-shrink-0 p-6 pb-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium">
              Progress: {completedCount}/{taskResults.length}
            </div>
            {successCount > 0 && (
              <div className="text-sm text-green-600 font-medium">
                ✓ {successCount} successful
              </div>
            )}
            {errorCount > 0 && (
              <div className="text-sm text-red-600 font-medium">
                ✗ {errorCount} errors
              </div>
            )}
          </div>

          {isGenerating && (
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium"
            >
              Cancel Generation
            </button>
          )}
        </div>
      </div>

      <div className="flex-1  px-6 pb-6">
        <div className="space-y-4 overflow-scroll">
          {taskResults.map((result, index) => (
            <TaskResultCard key={result.id} result={result} index={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};
