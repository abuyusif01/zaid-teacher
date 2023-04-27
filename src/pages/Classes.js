import React from "react";
import { useStudent } from "../context/StudentContext";
import Class from "../components/Class";

const Classes = () => {
  const { students } = useStudent();

  const today = students
    .map((stud) => stud.classes)
    .flat()
    .filter(
      (dat) => (new Date(dat.classDate) < new Date()) & (dat.attended === null)
    );

  return (
    <div className="px-5 pt-12 pb-20 space-y-4">
      <p className="font-semibold">Due Classes Today</p>
      {today.length === 0 ? (
        <p className="text-gray-400 text-center font-semibold">
          No Due Classes
        </p>
      ) : (
        <div>
          {students.map((stud) => (
            <div key={stud.uid} className="space-y-2">
              {stud.classes.map((cla) => (
                <div key={cla.id}>
                  {(new Date(cla.classDate) < new Date()) &
                  (cla.attended === null) ? (
                    <div>
                      <Class data={cla} student={stud} />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Classes;
