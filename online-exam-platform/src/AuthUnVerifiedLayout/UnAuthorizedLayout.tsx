import React from "react";
import { Outlet } from "react-router-dom";

const UnauthorizedLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left half */}
      <div className="w-1/2 bg-gray-100 flex flex-col items-center justify-center p-10"></div>

      {/* Right half with nested routes */}
      <div className="w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedLayout;
