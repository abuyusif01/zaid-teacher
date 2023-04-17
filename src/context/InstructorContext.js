import React, { createContext, useContext } from "react";

const InstructorContext = createContext();
export const useInstructor = () => useContext(InstructorContext);

const InstructorProvider = ({ children }) => {
  return (
    <InstructorContext.Provider value={{}}>
      {children}
    </InstructorContext.Provider>
  );
};

export default InstructorProvider;
