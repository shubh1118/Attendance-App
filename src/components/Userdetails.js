// Userdetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/Userdetails.css";

function Userdetails() {
  const { userId } = useParams();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    const records = JSON.parse(localStorage.getItem("attendanceRecords")) || {};
    const userRecords = records[userId] || {};
    setAttendanceRecords(
      Object.entries(userRecords).map(([date, record]) => ({ date, ...record }))
    );
  }, [userId]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = attendanceRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(attendanceRecords.length / recordsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="user-details">
      <h1>Attendance Details for User {userId}</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Sign In</th>
            <th>Sign Out</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map(({ date, signIn, signOut }) => (
            <tr key={date}>
              <td>{date}</td>
              <td>{signIn || "Absent"}</td>
              <td>{signOut || "Absent"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Userdetails;
