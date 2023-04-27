import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { useStudent } from "../context/StudentContext";
import moment from "moment";
import { BsCheck2, BsTrash, BsX } from "react-icons/bs";

const StudentPage = () => {
  const [showAttendance, setShowAttendance] = useState(false);
  const [classes, setClasses] = useState([]);
  const [classDate, setClassDate] = useState(new Date().getTime());
  const [classTime, setClassTime] = useState(new Date().getTime());
  const [expiresOn, setExpiresOn] = useState(null);
  const { id } = useParams();
  const { student, getStudentById, addClass, removeClass } = useStudent();

  useEffect(() => {
    getStudentById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setClasses(student.classes ? student.classes : []);
    setExpiresOn(student.expiry ? student.expiry : null);
  }, [student]);

  const saveClass = (data) => {
    addClass(id, data);
    setClasses([...classes, data]);
    setShowAttendance(false);
  };

  const markAttendance = (data, status) => {
    const remain = classes.filter((lec) => lec.id !== data.id);
    const target = classes.find((lec) => lec.id === data.id);
    const newData = [{ ...target, attended: status }, ...remain];
    setClasses(newData);
    removeClass(id, newData);
  };

  const deleteClass = (data) => {
    const remain = classes.filter((lec) => lec.id !== data.id);
    setClasses(remain);
    removeClass(id, remain);
  };

  const isexpired =
    new Date(expiresOn?.toDate).getTime() > new Date().getTime();

  return (
    <div className="grid grid-cols-6 gap-4 px-5 pt-12 pb-20">
      {/* TODO: Personal */}
      <div className="min-h-64 xl:col-span-3 col-span-6 bg-indigo-500 shadow rounded-lg bg-opacity-20 p-5 text-indigo-900 space-y-6">
        <div className="flex items-center justify-between">
          <p className="font-bold text-sm md:text-base">Personal Information</p>
          <p className="font-bold text-sm md:text-base">
            Expire :{" "}
            <span>
              {expiresOn?.toDate
                ? moment(expiresOn?.toDate || new Date()).format("MMMM Do YYYY")
                : "No Date"}
            </span>
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg md:text-2xl tracking-wide">
            {student.fullName}{" "}
          </p>
          <span className="py-2 px-4 text-sm bg-indigo-500 text-white rounded-full">
            {!isexpired ? "Inactive" : "Active"}
          </span>
        </div>
        <div className="flex justify-between text-sm md:text-base">
          <p>Email: {student.email}</p>
        </div>
        <div className="flex justify-between text-sm md:text-base">
          <p>Whatsapp: {student.whatsapp}</p>
          <p>Nationality: {student.nationality}</p>
        </div>
        <div className="flex justify-between text-sm md:text-base">
          <p>Phone: {student.phone}</p>
          <p>Language: {student.language}</p>
        </div>
      </div>
      {/* FIXME: */}
      <div className="xl:col-span-3 col-span-6 p-5 shadow min-h-64 rounded-lg relative space-y-4 text-sm md:text-base">
        <div className="flex justify-between items-center">
          <p className="font-bold">Attendance</p>
          <button
            className="bg-indigo-500 text-white py-3 px-4 rounded"
            onClick={() => setShowAttendance((prev) => !prev)}
          >
            {showAttendance ? "Close" : "Add Class"}
          </button>
        </div>
        {showAttendance && (
          <div className="absolute right-3 bg-white p-2 shadow-lg space-y-2">
            <div className="space-x-2">
              <input
                className="p-4 outline-none border rounded border-gray-500"
                type="date"
                value={classDate}
                onChange={(e) => setClassDate(e.target.value)}
              />
              <input
                className="p-4 outline-none border rounded border-gray-500"
                type="time"
                value={classTime}
                onChange={(e) => setClassTime(e.target.value)}
              />
            </div>
            <div className="align-right">
              <button
                onClick={() =>
                  saveClass({
                    classDate,
                    classTime,
                    id: uuidv4(),
                    attended: null,
                    plan: student.plan,
                  })
                }
                className="bg-indigo-500 text-white py-3 px-4 rounded"
              >
                Add
              </button>
            </div>
          </div>
        )}
        <div className="space-y-3">
          {classes.map((classData) => (
            <div
              key={classData.id}
              className={`flex justify-between items-center space-x-4 p-4 ${
                classData.attended === null && "bg-gray-500"
              }
                ${classData.attended === "absent" && "bg-red-500"} ${
                classData.attended === "present" && "bg-green-500"
              } rounded-lg bg-opacity-20`}
            >
              <p>{moment(classData.classDate).format("MMMM Do YYYY")}</p>
              <p>{classData.classTime}</p>
              {!classData.attended ? (
                <>
                  {new Date(classData.classDate) < new Date() && (
                    <div className="flex space-x-6 items-center">
                      <BsCheck2
                        className="text-xl cursor-pointer"
                        onClick={() => markAttendance(classData, "present")}
                      />
                      <BsX
                        className="text-2xl cursor-pointer"
                        onClick={() => markAttendance(classData, "absent")}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div></div>
              )}
              <BsTrash
                className="text-xl cursor-pointer "
                onClick={() => deleteClass(classData)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
