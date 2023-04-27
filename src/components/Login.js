import React from "react";
import * as yup from "yup";
import Bg from "./Bg";
import { Form, Formik } from "formik";
import TextField from "./TextField";
import { useInstructor } from "../context/InstructorContext";
import { useNavigate } from "react-router-dom";

const Login = ({ email, toggle }) => {
  const { logIn } = useInstructor();
  const navigate = useNavigate();

  return (
    <div className="h-screen flex">
      <div className="hidden md:block w-1/2">
        <Bg />
      </div>
      <div className="w-full md:w-1/2 bg-white relative">
        <div className="flex h-full items-center justify-center w-full">
          <div className="w-10/12 sm:w-7/12 xl:w-5/12 space-y-4">
            <h1 className="text-xl text-left font-semibold leading-loose">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500">Please Enter your details</p>
            <Formik
              initialValues={{ email: email, password: "" }}
              validationSchema={loginSchema}
              onSubmit={(value) => {
                logIn(value.email, value.password);
                navigate("/dashboard/profile", { replace: true });
              }}
            >
              {(formik) => (
                <Form className="space-y-4">
                  <TextField label="Email" name="email" type="text" disabled />
                  <TextField label="Password" name="password" type="password" />
                  <button className="w-full font-semibold text-white mt-4 py-2 rounded bg-indigo-500">
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
            <p>
              Not registered yet?{" "}
              <span onClick={toggle} className="text-indigo-500 cursor-pointer">
                Sign up here{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const loginSchema = yup.object().shape({
  email: yup.string().required("Email is Required"),
  password: yup.string().required("Password is required"),
});

export default Login;
