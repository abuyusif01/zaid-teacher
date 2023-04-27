import moment from "moment";
import React from "react";
import { BsCalendar2Event, BsClock } from "react-icons/bs";
import { Link } from "react-router-dom";

const Class = ({ data, student }) => {
  return (
    <Link to={`/dashboard/students/${student.uid}`}>
      <div className="px-4 py-4 rounded bg-gray-200 bg-opacity-50 hover:bg-opacity-90 space-y-2">
        <p className="text-sm">{student.fullName}</p>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center space-x-4">
            <BsClock className="text-sm md:text-xl" />
            <p className="text-sm">{data.classTime}</p>
          </div>
          <div className="flex items-center space-x-4">
            <BsCalendar2Event className="text-sm md:text-xl" />
            <p className="text-sm">
              {moment(data.classDate).format("MMMM Do YYYY")}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Class;
