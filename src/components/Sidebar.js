import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useInstructor } from "../context/InstructorContext";

const Sidebar = () => {
  const { logOut, instructor, getInstructorDash, User } = useInstructor();
  const navigate = useNavigate();
  const location = useLocation();
  const isDash = location.pathname.includes("dashboard");
  const onLogOut = () => {
    logOut();
    navigate(`/auth/${instructor.uid}`);
  };

  useEffect(() => {
    getInstructorDash(User?.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isDash ? (
        <div className="w-72 bg-green-500 bg-opacity-20">
          <p onClick={onLogOut}>Sidebar</p>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
