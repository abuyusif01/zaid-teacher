import React, { useEffect } from "react";
import { useStudent } from "../context/StudentContext";
import { useInstructor } from "../context/InstructorContext";
import Student from "../components/Student";

const Students = () => {
  const { students, getStudents } = useStudent();
  const { instructor } = useInstructor();

  useEffect(() => {
    if (instructor) getStudents(instructor.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instructor]);

  return (
    <div className="px-5 pt-12 pb-20">
      <h1 className="px-4 font-semibold ">Students</h1>
      <div className="flex flex-wrap">
        {[...students].map((stud) => (
          <div
            key={stud.uid}
            className="p-4 w-full sm:w-1/2 md:w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4"
          >
            <Student student={stud} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
