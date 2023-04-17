import React from "react";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      <p>Sidebar</p>
    </div>
  );
};

export default Sidebar;
