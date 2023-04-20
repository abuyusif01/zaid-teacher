import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { useInstructor } from "../context/InstructorContext";
import Animation from "../components/Animation";

const Home = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { instructor, getInstructor } = useInstructor();
  const [show, setShow] = useState(false);

  const noEmail = () => {
    navigate("/notfound");
    console.log("No such document!");
  };
  useEffect(() => {
    getInstructor(id, noEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onToggle = () => {
    setShow(!show);
  };

  return (
    <>
      {instructor ? (
        <div>
          {show ? (
            <div>
              <Login email={instructor.email} toggle={onToggle} />
            </div>
          ) : (
            <div>
              <Signup email={instructor.email} toggle={onToggle} />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Animation />
        </div>
      )}
    </>
  );
};

export default Home;
