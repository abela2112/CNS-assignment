import React from "react";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
const UnAuthorizedUserError = ({ error, resetErrorBoundary }) => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <div>
          <h2 className="text-2xl text-red-600">Error</h2>
          <h3>{error.message}</h3>
          <button
            className="px-3 py-2 bg-gray-400"
            onClick={resetErrorBoundary}
          >
            reload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnAuthorizedUserError;
