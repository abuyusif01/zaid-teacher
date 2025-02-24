import React from "react";

const NotFound = () => {
  return (
    <div className="relative flex items-center justify-center bg-gray-200 h-full w-full">
      <div className="w-48 h-48 rounded-full bg-indigo-500"></div>
      <div className="h-1/2 w-full bg-indigo-200 bg-opacity-50 blur-md absolute bottom-0"></div>
      <div className="h-1/2 w-full bg-purple-200 bg-opacity-60 absolute top-0">
        <div className="flex h-full items-center justify-center">
          <p className="text-5xl font-semibold text-white">Not found</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
