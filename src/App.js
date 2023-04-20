import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Students from "./pages/Students";
import Classes from "./pages/Classes";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-5">
          <Routes>
            <Route path="/auth/:id" element={<Home />} />
            <Route path="/dashboard">
              <Route path="students" element={<Students />} />
              <Route path="classes" element={<Classes />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
