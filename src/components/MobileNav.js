import React, { useEffect } from "react";
import { BsHouseFill, BsPersonFill } from "react-icons/bs";
import { MdOutlineClass } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useInstructor } from "../context/InstructorContext";

const MobileNav = () => {
  const { getInstructorDash, User } = useInstructor();
  const navigate = useNavigate();
  const location = useLocation();
  const isDash = location.pathname.includes("dashboard");

  useEffect(() => {
    getInstructorDash(User?.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dashLink = (link) => {
    return location.pathname.split("/").includes(link);
  };

  return (
    <>
      {isDash && (
        <div className="absolute w-full h-16 bottom-0 md:hidden border-t border-t-gray-600">
          <div className="flex h-full justify-around items-center w-full">
            <div
              className="cursor-pointer space-y-1 w-full flex flex-col items-center justify-center"
              onClick={() => navigate("/dashboard/students")}
            >
              <BsHouseFill
                className={`text-2xl ${
                  dashLink("students") ? "text-indigo-500" : "text-gray-500"
                }`}
              />
              <p
                className={`text-xs text-2xl font-semibold ${
                  dashLink("students") ? "text-indigo-500" : "text-gray-500"
                }`}
              >
                Students
              </p>
            </div>
            <div
              className="cursor-pointer space-y-1 w-full flex flex-col items-center justify-center"
              onClick={() => navigate("/dashboard/classes")}
            >
              <MdOutlineClass
                className={`text-2xl ${
                  dashLink("classes") ? "text-indigo-500" : "text-gray-500"
                }`}
              />
              <p
                className={`text-xs text-2xl font-semibold ${
                  dashLink("classes") ? "text-indigo-500" : "text-gray-500"
                }`}
              >
                Classes
              </p>
            </div>
            <div
              className="cursor-pointer space-y-1 w-full flex flex-col items-center justify-center"
              onClick={() => navigate("/dashboard/profile")}
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;
