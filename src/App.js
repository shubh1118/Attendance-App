import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Userreport from "./components/Userreport";
import Homeattendance from "./components/Homeattendance";
import Adminpage from "./components/Adminpage";
import Userdetails from "./components/Userdetails";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/userreport" element={<Userreport />} />
                  <Route path="/homeattendance" element={<Homeattendance />} />
                  <Route path="/adminpage" element={<Adminpage />} />
                  <Route path="/userdetails/:userId" element={<Userdetails />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
