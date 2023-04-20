import React from "react";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const isDash = location.pathname.includes("dashboard");
  console.log(isDash);
  return (
    <>
      {isDash ? (
        <div className="w-72 bg-green-500 bg-opacity-20">
          <p>Sidebar</p>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
