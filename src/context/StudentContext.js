import { collection, getDocs, query, where } from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";
import { db } from "../firebase.config";

const StudentContext = createContext();
export const useStudent = () => useContext(StudentContext);

const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  const getStudents = async (uid) => {
    const q = query(collection(db, "students"), where("instructor", "==", uid));

    const querySnapshot = await getDocs(q);
    let stud = [];
    querySnapshot.forEach((doc) => {
      stud.push(doc.data());
    });
    setStudents(stud);
  };
  return (
    <StudentContext.Provider value={{ students, getStudents }}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
