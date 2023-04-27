import React, { useEffect } from "react";
import { BsHouseFill, BsPersonFill } from "react-icons/bs";
import { MdOutlineClass } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useInstructor } from "../context/InstructorContext";
import { useStudent } from "../context/StudentContext";

const MobileNav = () => {
  const { getInstructorDash, User, instructor } = useInstructor();
  const { getStudents } = useStudent();
  const location = useLocation();
  const isDash = location.pathname.includes("dashboard");

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
      {isDash && (
        <div className="fixed bg-white w-full h-16 bottom-0 md:hidden border-t border-t-gray-600 text-xs">
          <div className="flex h-full justify-around items-center w-full">
            <Link
              to="/dashboard/students"
              className="cursor-pointer space-y-1 w-full flex flex-col items-center justify-center"
            >
              <BsHouseFill
                className={`text-2xl ${
                  dashLink("students") ? "text-indigo-500" : "text-gray-500"
                }`}
              />
              <p
                className={`text-xs font-semibold ${
                  dashLink("students") ? "text-indigo-500" : "text-gray-500"
                }`}
              >
                Students
              </p>
            </Link>
            <Link
              to="/dashboard/classes"
              className="cursor-pointer space-y-1 w-full flex flex-col items-center justify-center"
            >
              <MdOutlineClass
                className={`text-2xl ${
                  dashLink("classes") ? "text-indigo-500" : "text-gray-500"
                }`}
              />
              <p
                className={`text-xs font-semibold ${
                  dashLink("classes") ? "text-indigo-500" : "text-gray-500"
                }`}
              >
                Classes
              </p>
            </Link>
            <Link
              to="/dashboard/profile"
              className="cursor-pointer space-y-1 w-full flex flex-col items-center justify-center"
            >
              <BsPersonFill
                className={`text-2xl ${
                  dashLink("profile") ? "text-indigo-500" : "text-gray-500"
                }`}
              />
              <p
                className={`text-xs font-semibold text-2xl ${
                  dashLink("profile") ? "text-indigo-500" : "text-gray-500"
                }`}
              >
                Profile
              </p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;
