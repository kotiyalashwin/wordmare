import { TaskResult } from "./maincontent";

interface TaskResultCardProps {
  result: TaskResult;
  index: number;
}
export const TaskResultCard = ({ result, index }: TaskResultCardProps) => {
  const getStatusColor = () => {
    switch (result.status) {
      case "loading":
        return "border-blue-200 bg-blue-50";
      case "success":
        return "border-green-200 bg-green-50";
      case "error":
        return "border-red-200 bg-red-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getStatusIcon = () => {
    switch (result.status) {
      case "loading":
        return (
          <div className="flex items-center space-x-2">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />
            <span className="text-blue-600 text-sm font-medium">
              Processing...
            </span>
          </div>
        );
      case "success":
        return (
          <div className="flex items-center space-x-2">
            <div className="text-green-500 text-lg">✓</div>
            <span className="text-green-600 text-sm font-medium">
              Completed
            </span>
          </div>
        );
      case "error":
        return (
          <div className="flex items-center space-x-2">
            <div className="text-red-500 text-lg">✗</div>
            <span className="text-red-600 text-sm font-medium">Failed</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-2">
            <div className="text-gray-400 text-lg">○</div>
            <span className="text-gray-500 text-sm font-medium">Waiting</span>
          </div>
        );
    }
  };

  return (
    <div
      className={`border rounded-lg p-5 ${getStatusColor()} transition-all duration-200`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            #{index}
          </div>
          <span className="font-medium text-gray-900">Task {result.id}</span>
        </div>
        {getStatusIcon()}
      </div>

      {result.prompt && (
        <div className="mb-3">
          <div className="text-sm font-medium text-gray-700 mb-2">
            Input Prompt:
          </div>
          <div className="text-sm bg-white p-3 rounded-md border shadow-sm">
            {result.prompt.length > 150
              ? `${result.prompt.substring(0, 150)}...`
              : result.prompt}
          </div>
        </div>
      )}

      {result.output && (
        <div>
          <div className="text-sm font-medium text-gray-700 mb-2">
            Generated Output:
          </div>
          <div className="text-sm bg-white p-3 rounded-md border shadow-sm">
            {result.output}
          </div>
        </div>
      )}

      {result.error && (
        <div>
          <div className="text-sm font-medium text-gray-700 mb-2">
            Error Details:
          </div>
          <div className="text-sm bg-red-50 p-3 rounded-md border border-red-200 text-red-700">
            {result.error}
          </div>
        </div>
      )}
    </div>
  );
};
