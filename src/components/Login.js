// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!username.trim()) {
      errors.username = "Username is required";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (errors.username) {
      setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Retrieve user data from local storage
      const storedUserData = JSON.parse(localStorage.getItem("userData"));
      
      // Check if user exists and credentials match
      if (!storedUserData || storedUserData.username !== username || storedUserData.password !== password) {
        window.alert("Invalid username or password. Please try again.");
        return;
      }

      localStorage.setItem("isLoggedIn", true);
      navigate("/homeattendance");
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="container">
      <div className="form-group">
        <h1>Login Form</h1>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
          className={`input-field ${errors.username ? 'error' : ''}`}
        />
        {errors.username && <div className="error">{errors.username}</div>}
      </div>
      <div className="form-group">
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          className={`input-field ${errors.password ? 'error' : ''}`}
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      <div className="btn-group">
        <button id="login" onClick={handleLoginClick} className="btn">
          Login
        </button>
        <button id="register" onClick={handleRegisterClick} className="btn">
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;
