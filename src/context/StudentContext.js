import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";
import { db } from "../firebase.config";

const StudentContext = createContext();
export const useStudent = () => useContext(StudentContext);

const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({});

  const getStudents = async (uid) => {
    const q = query(collection(db, "students"), where("instructor", "==", uid));
    const querySnapshot = await getDocs(q);
    let stud = [];
    querySnapshot.forEach((doc) => {
      stud.push(doc.data());
    });
    setStudents(stud);
  };

  const getStudentById = async (id) => {
    const studentRef = doc(db, "students", id);
    const docSnap = await getDoc(studentRef);
    if (docSnap.exists()) {
      setStudent(docSnap.data());
    } else {
      console.log("Not a student");
    }
  };

  const addClass = async (uid, data) => {
    const studentRef = doc(db, "students", uid);
    await updateDoc(studentRef, {
      classes: arrayUnion(data),
    });
  };

  const removeClass = async (uid, data) => {
    const studentRef = doc(db, "students", uid);
    await updateDoc(studentRef, {
      classes: data,
    });
  };

  return (
    <StudentContext.Provider
      value={{
        student,
        students,
        getStudentById,
        getStudents,
        addClass,
        removeClass,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
