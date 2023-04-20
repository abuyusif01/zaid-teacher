import React from "react";
import { useInstructor } from "../context/InstructorContext";

const Signup = ({ email }) => {
  const { logOut } = useInstructor();
  return (
    <div>
      <p onClick={() => logOut()}>Sign up: {email}</p>
    </div>
  );
};

export default Signup;
