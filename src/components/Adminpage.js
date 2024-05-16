// Adminpage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Adminpage.css";

const users = [
  { id: 1, username: "user1" },
  { id: 2, username: "user2" },
  { id: 3, username: "user3" },
  { id: 4, username: "user4" },
];

function Adminpage() {
  const navigate = useNavigate();

  const handleUserClick = (userId) => {
    navigate(`/userdetails/${userId}`);
  };

  return (
    <div className="admin-page">
      <h1>Admin Report Page</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => handleUserClick(user.id)}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Adminpage;
