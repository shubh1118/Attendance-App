import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Logo from "../Assets/Attendicon.png"
import "../Styles/Navbar.css";


function Navbar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false);
    navigate("/login");
  };

  const handleProfile = () => {
    if (isDropdownOpen) {
      navigate("/profile");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
      <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="navbar-menu">
        <div className="navbar-burger" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        {isDropdownOpen && (
          <div className="dropdown">
            {/* Only render My Profile button when dropdown is open */}
            <div className="dropdown-item my-profile" onClick={handleProfile}>My Profile</div>
            <div className="dropdown-item logout" onClick={handleLogout}>Logout</div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
