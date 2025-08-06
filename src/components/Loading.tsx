import React from "react";

interface LoadingProps {
  fullScreen?: boolean;
  message?: string;
  subMessage?: string;
}

const Loading: React.FC<LoadingProps> = ({
  fullScreen = true,
  message = "Loading...",
  subMessage = "Please wait",
}) => {
  const containerClasses = fullScreen
    ? "flex items-center justify-center min-h-screen bg-gray-50"
    : "flex items-center justify-center py-12";

  return (
    <div className={containerClasses}>
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="flex space-x-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <div
                className="h-3 w-3 rounded-full bg-green-500 animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="h-3 w-3 rounded-full bg-green-500 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-800">{message}</h2>
          {subMessage && (
            <p className="mt-1 text-sm text-gray-500">{subMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Loading;
