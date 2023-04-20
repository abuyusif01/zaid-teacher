import React, { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const InstructorContext = createContext();
export const useInstructor = () => useContext(InstructorContext);

const InstructorProvider = ({ children }) => {
  const [instructor, setInstructor] = useState(null);
  const [error, setError] = useState();
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
    }
  };

  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const logIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const getInstructorDash = async (email) => {
    const q = query(collection(db, "instructors"), where("email", "==", email));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setInstructor(doc.data());
    });
  };

  const logOut = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <InstructorContext.Provider
      value={{
        error,
        User,
        instructor,
        loading,
        getInstructor,
        getInstructorDash,
        signUp,
        logIn,
        logOut,
      }}
    >
      {loading ? null : children}
    </InstructorContext.Provider>
  );
};

export default InstructorProvider;
