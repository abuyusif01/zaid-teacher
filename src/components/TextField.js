import { useField, ErrorMessage } from "formik";
import React from "react";

const TextField = ({ label, ...props }) => {
  // const { name, type } = props;
  const [field, meta] = useField(props);
  return (
    <div className="">
      <div className="w-full">
        <div className="flex flex-col space-y-3 flex-wrap">
          <div className="w-full">
            <label
              htmlFor={field.name}
              className="text-sm text-coolGray-800 font-semibold"
            >
              {label}
            </label>
          </div>
          <div className="w-full">
            <input
              className={`w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-indigo-500 border ${
                meta.touched && meta.error
                  ? "border-red-500"
                  : "border-coolGray-200"
              } border-coolGray-200 rounded-lg shadow-input`}
              {...props}
              {...field}
            />
            <div className="text-sm text-red-500">
              <ErrorMessage name={field.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextField;
