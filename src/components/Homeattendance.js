// Homeattendance.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Homeattendance.css";

function Homeattendance() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  const navigate = useNavigate();

  useEffect(() => {
    const attendance = JSON.parse(localStorage.getItem("attendanceRecords")) || {};
    if (attendance[currentDate] && attendance[currentDate].signIn) {
      setIsSignedIn(true);
    }
  }, [currentDate]);

  const handleSignIn = () => {
    setIsSignedIn(true);
    updateAttendanceRecord(currentDate, "signIn");
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    updateAttendanceRecord(currentDate, "signOut");
  };

  const updateAttendanceRecord = (date, action) => {
    const attendance = JSON.parse(localStorage.getItem("attendanceRecords")) || {};
    if (!attendance[date]) {
      attendance[date] = {};
    }
    attendance[date][action] = new Date().toLocaleTimeString();
    localStorage.setItem("attendanceRecords", JSON.stringify(attendance));
  };

  const handleViewReport = () => {
    navigate("/userreport");
  };

  return (
    <div className="home-attendance">
      <h1>Home Attendance Page</h1>
      <p>Welcome! Today is {currentDate}.</p>
      {!isSignedIn ? (
        <button onClick={handleSignIn}>Sign In</button>
      ) : (
        <button onClick={handleSignOut}>Sign Out</button>
      )}
      <button onClick={handleViewReport}>View Report</button>
    </div>
  );
}

export default Homeattendance;
