import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { useInstructor } from "../context/InstructorContext";

const Home = () => {
  const { id } = useParams();
  const { instructor, getInstructor } = useInstructor();
  const [show, setShow] = useState(false);

  const noEmail = () => {};
  useEffect(() => {
    getInstructor(id, noEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div onClick={() => setShow(!show)}>Register</div>
      {show ? (
        <div>
          <Login email={instructor.email} />
        </div>
      ) : (
        <div>
          <Signup email={instructor.email} />
        </div>
      )}
    </div>
  );
};

export default Home;
