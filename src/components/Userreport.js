import React, { useEffect, useState } from "react";
import "../Styles/Userreport.css";

function Userreport() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    const records = JSON.parse(localStorage.getItem("attendanceRecords")) || {};
    const formattedRecords = Object.entries(records).map(([date, record]) => ({ date, ...record }));
    setAttendanceRecords(formattedRecords);
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = attendanceRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(attendanceRecords.length / recordsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="user-report">
      <h1>Attendance Report</h1>
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
        <button className="prev" onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button className="next" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Userreport;
