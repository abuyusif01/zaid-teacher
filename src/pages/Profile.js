import React, { useEffect, useState } from "react";
import { useInstructor } from "../context/InstructorContext";
import {
  BsCashCoin,
  BsCashStack,
  BsClockHistory,
  BsPerson,
  BsPersonCheck,
  BsPersonX,
} from "react-icons/bs";
import moment from "moment";
import pricingData from "../utils/pricing.json";
import { useStudent } from "../context/StudentContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { instructor, logOut } = useInstructor();
  const { students, getStudents } = useStudent();
  const [paidTime, setPaidTime] = useState(0);
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  const onLogOut = () => {
    logOut();
    navigate(`/auth/${instructor.uid}`, { replace: true });
  };

  useEffect(() => {
    if (instructor) getStudents(instructor.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instructor]);

  const paymentData = students.map((stud) => {
    if (stud.classes) {
      return stud.classes;
    } else return [];
  });

  const presentTotal = paymentData
    .flat()
    .filter((stud) => stud.attended === "present")
    .reduce((acc, val) => acc + pricingData[val.plan], 0);

  const absentTotal = paymentData
    .flat()
    .filter((stud) => stud.attended === "absent")
    .reduce((acc, val) => acc + pricingData[val.plan], 0);

  const total = absentTotal + presentTotal;

  useEffect(() => {
    if (instructor) {
      setPaidTime(
        instructor.payments?.reduce((acc, val) => acc + val.payment * 1, 0) || 0
      );
      setPayments(instructor.payments || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instructor]);

  return (
    <>
      {instructor ? (
        <div className="space-y-8 px-5 pt-12 pb-20">
          <div className=" grid grid-cols-6 gap-8">
            <div className="col-span-6 lg:col-span-3 2xl:col-span-2 rounded-lg shadow-lg p-8 space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm md:text-xl">Profile</p>
                <div className="rounded-full bg-blue-300 bg-opacity-40 p-3 hidden md:block">
                  <BsPerson className="text-blue-700 text-lg md:text-xl" />
                </div>
                <button
                  className="md:hidden px-4 py-3 bg-red-500 rounded text-white text-xs"
                  onClick={onLogOut}
                >
                  Sign Out
                </button>
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm md:text-xl font-semibold">
                  {instructor?.fullName}
                </p>
                <p className="text-gray-500 text-sm md:text-sm">
                  {instructor?.email}
                </p>
              </div>
            </div>
            <div className="col-span-6 lg:col-span-3 2xl:col-span-2 rounded-lg shadow-lg p-8 space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-xl">Total Duration</p>
              </div>
              <div className="space-y-2 text-center">
                <p className="font-semibold text-sm md:text-xl">{total}</p>
                <p className="text-gray-500 text-sm md:text-sm">
                  Total Minutes
                </p>
              </div>
            </div>
            <div className="col-span-3 2xl:col-span-1 rounded-lg shadow-lg px-5 py-8 space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm md:text-xl">Present</p>
                <div className="rounded-full bg-purple-300 bg-opacity-40 p-3">
                  <BsPersonCheck className="text-purple-700 text-lg md:text-xl" />
                </div>
              </div>
              <div className="space-y-2 text-center">
                <p className="font-semibold text-sm md:text-xl">
                  {presentTotal}
                </p>
                <p className="text-gray-500 text-sm md:text-sm"> Minutes</p>
              </div>
            </div>
            <div className="col-span-3 2xl:col-span-1 rounded-lg shadow-lg px-5 py-8 space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm md:text-xl">No Show</p>
                <div className="rounded-full bg-indigo-300 bg-opacity-40 p-3">
                  <BsPersonX className="text-indigo-700 text-lg md:text-xl" />
                </div>
              </div>
              <div className="space-y-2 text-center">
                <p className="font-semibold text-sm md:text-xl">
                  {absentTotal}
                </p>
                <p className="text-gray-500 text-sm"> Minutes</p>
              </div>
            </div>
            <div className="col-span-3 2xl:col-span-2 rounded-lg shadow-lg p-8 space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm md:text-xl">Paid Time</p>
                <div className="rounded-full bg-red-300 bg-opacity-40 p-3">
                  <BsCashStack className="text-red-700 text-lg md:text-xl" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm md:text-xl font-semibold">{paidTime}</p>
                <p className="text-gray-500 text-sm md:text-sm">Minutes</p>
              </div>
            </div>
            <div className="col-span-3 2xl:col-span-1 rounded-lg shadow-lg px-5 py-8 space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm md:text-xl">Unpaid</p>
                <div className="rounded-full bg-slate-300 bg-opacity-40 p-3">
                  <BsCashCoin className="text-slate-700 text-lg md:text-xl" />
                </div>
              </div>
              <div className="space-y-2 text-center">
                <p className="font-semibold text-sm md:text-xl">
                  {total - paidTime}
                </p>
                <p className="text-gray-500 text-sm md:text-sm"> Minutes</p>
              </div>
            </div>
            <div className="col-span-6 2xl:col-span-3 max-h-48 rounded-lg shadow-lg p-8 space-y-4  overflow-y-auto">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm md:text-xl">
                  Payment History
                </p>
                <div className="rounded-full bg-orange-300 bg-opacity-40 p-3">
                  <BsClockHistory className="text-orange-700 text-lg md:text-xl" />
                </div>
              </div>
              <div className="text-center">
                {payments?.map((pay) => (
                  <div
                    key={pay.id}
                    className="flex items-center justify-between text-sm md:text-sm text-gray-500 space-y-2"
                  >
                    <p>{moment(pay.payDay).format("MMMM Do YYYY")}</p>
                    <p>{pay.payment} minutes</p>
                  </div>
                ))}
              </div>
              <div className="text-sm text-center text-gray-500">
                {payments.length === 0 ? <p>No Payment History</p> : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Profile;
