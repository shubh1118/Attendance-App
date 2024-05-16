import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      errors.phoneNumber = "Phone Number is invalid";
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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    if (errors.phoneNumber) {
      setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: "" }));
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Check if user already exists
      const existingUserData = JSON.parse(localStorage.getItem("userData"));
      if (existingUserData && existingUserData.username === username) {
        window.alert("User already exists. Please login.");
        navigate("/login");
        return;
      }

      // Store user data including the password
      localStorage.setItem(
        "userData",
        JSON.stringify({ username, password, email, phoneNumber })
      );

      navigate("/");
    } else {
      window.alert("Please fill in all the required fields correctly.");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="form-group">
        <h1>Registration Form</h1>
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
      <div className="form-group">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          className={`input-field ${errors.email ? 'error' : ''}`}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div className="form-group">
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="Phone Number"
          className={`input-field ${errors.phoneNumber ? 'error' : ''}`}
        />
        {errors.phoneNumber && (
          <div className="error">{errors.phoneNumber}</div>
        )}
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

export default Register;
