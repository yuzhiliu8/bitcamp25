import React, { useState } from "react";
import "./AccountPage.css";
import { useNavigate } from "react-router";

function AccountPage() {
  const navigate = useNavigate();

  const user = {
    name: "Andrew Guo",
    email: "andrewguo108.dog@gmail.com",
    password: "hihi",
  };

  const handlePasswordChange = () => {
    alert("Password change placeholder");
  };

  return (
    <div className="account-wrapper">
      <div className="account-box">
        <h2>Account Settings</h2>

        <div className="account-field">
          <label>Name</label>
          <div className="account-value">{user.name}</div>
        </div>

        <div className="account-field">
          <label>Email</label>
          <div className="account-value">{user.email}</div>
        </div>

        <div className="account-field">
          <label>Password</label>
          <div className="account-value">{user.password}</div>
        </div>

        <div className="button-group">
          <button onClick={handlePasswordChange}>Change Password</button>
          <button className="back-button" onClick={() => navigate("/home")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
