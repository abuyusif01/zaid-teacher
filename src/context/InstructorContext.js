import React, { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";

const InstructorContext = createContext();
export const useInstructor = () => useContext(InstructorContext);

const InstructorProvider = ({ children }) => {
  const [instructor, setInstructor] = useState({});
  const [loading, setLoading] = useState(true);
  const [User, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
        console.log(user);
      } else setUser(null);
      setLoading(false);
    });
  }, []);

  const getInstructor = async (uid, noEmail) => {
    const instructorRef = doc(db, "instructors", uid);
    const docSnap = await getDoc(instructorRef);

    if (docSnap.exists()) {
      setInstructor(docSnap.data());
    } else {
      noEmail();
      console.log("No such document!");
    }
  };

  const logOut = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <InstructorContext.Provider
      value={{ User, instructor, loading, getInstructor, logOut }}
    >
      {loading ? null : children}
      {/* {children} */}
    </InstructorContext.Provider>
  );
};

export default InstructorProvider;
