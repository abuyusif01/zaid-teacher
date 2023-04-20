import React from "react";
import * as yup from "yup";
import Bg from "./Bg";
import TextField from "./TextField";
import { Form, Formik } from "formik";
import { useInstructor } from "../context/InstructorContext";
import { useNavigate } from "react-router-dom";

const Signup = ({ email, toggle }) => {
  const { signUp } = useInstructor();
  const navigate = useNavigate();

  return (
    <div className="h-screen flex">
      <div className="w-full md:w-1/2 bg-white relative">
        <div className="flex h-full items-center justify-center w-full">
          <div className="w-10/12 sm:w-7/12 xl:w-5/12 space-y-4">
            <h1 className="text-xl text-left font-semibold leading-loose">
              Welcome to Zaid Instructor Portal <br />
              Register Here
            </h1>
            <p className="text-sm text-gray-500">Please Enter your details</p>
            <Formik
              initialValues={{
                email: email,
                password: "",
                confirmPassword: "",
              }}
              validationSchema={signUpSchema}
              onSubmit={(value) => {
                signUp(value.email, value.password);
                navigate("/dashboard/profile");
              }}
            >
              {(formik) => (
                <Form className="space-y-4">
                  <TextField label="Email" name="email" type="text" disabled />
                  <TextField label="Password" name="password" type="password" />
                  <TextField
                    label="Confirm Passord"
                    name="confirmPassword"
                    type="password"
                  />
                  <button className="w-full font-semibold text-white mt-4 py-2 rounded bg-indigo-500">
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
            <p>
              Already registered?{" "}
              <span onClick={toggle} className="text-indigo-500 cursor-pointer">
                Login here{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:block w-1/2">
        <Bg />
      </div>
    </div>
  );
};

const signUpSchema = yup.object().shape({
  email: yup.string().required("Email is Required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

export default Signup;
