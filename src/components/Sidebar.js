import React, { useEffect } from "react";
import { BsHouseFill, BsPersonFill } from "react-icons/bs";
import { MdOutlineClass } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useInstructor } from "../context/InstructorContext";
import { useStudent } from "../context/StudentContext";

const Sidebar = () => {
  const { logOut, instructor, getInstructorDash, User } = useInstructor();
  const { getStudents } = useStudent();
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

  useEffect(() => {
    if (instructor) {
      getStudents(instructor.uid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instructor]);

  const dashLink = (link) => {
    return location.pathname.split("/").includes(link);
  };

  return (
    <>
      {isDash ? (
        <div className="relative hidden md:block w-72 bg-white border-r border-r-gray-200 border-r-1 bg-opacity-20 py-12 px-4 space-y-6">
          <div>
            <p className="font-semibold text-xl text-center py-4 bg-gray-300 bg-opacity-20 rounded">
              Zaid Instructor Portal
            </p>
          </div>
          <Link
            to="/dashboard/students"
            className={`${
              dashLink("students")
                ? "bg-indigo-500 text-white"
                : "text-gray-500"
            } rounded font-semibold flex items-center space-x-8 px-4 py-3 cursor-pointer`}
          >
            <BsHouseFill className="text-lg" />
            <p>Students</p>
          </Link>
          <Link
            to="/dashboard/classes"
            className={`${
              dashLink("classes") ? "bg-indigo-500 text-white" : "text-gray-500"
            } rounded font-semibold flex items-center space-x-8 px-4 py-3 cursor-pointer`}
          >
            <MdOutlineClass className="text-lg" />
            <p>Classes</p>
          </Link>
          <Link
            to="/dashboard/profile"
            className={`${
              dashLink("profile") ? "bg-indigo-500 text-white" : "text-gray-500"
            } rounded font-semibold flex items-center space-x-8 px-4 py-3 cursor-pointer`}
          >
            <BsPersonFill className="text-lg" />
            <p>Profile</p>
          </Link>
          <div className="absolute right-0 p-4 bottom-12 w-full">
            <button
              onClick={onLogOut}
              className="bg-indigo-500 w-full text-center text-white rounded font-semibold flex justify-center items-center space-x-8 px-4 py-3"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
