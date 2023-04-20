import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Students from "./pages/Students";
import Classes from "./pages/Classes";
import Profile from "./pages/Profile";
import { useInstructor } from "./context/InstructorContext";
import MobileNav from "./components/MobileNav";

const App = () => {
  const { User } = useInstructor();
  return (
    <BrowserRouter>
      <div className="relative flex h-screen">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/auth/:id" element={<Home />} />
            {User && (
              <Route path="/dashboard">
                <Route path="students" element={<Students />} />
                <Route path="classes" element={<Classes />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <MobileNav />
      </div>
    </BrowserRouter>
  );
};

export default App;
