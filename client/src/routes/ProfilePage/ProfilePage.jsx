import React, { useState } from "react";
import "./ProfilePage.css";
import { useNavigate } from "react-router";

function ProfilePage() {
  const navigate = useNavigate();

  const [goals, updateGoals]=useState({
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateGoals(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
  }

  const user = {
    name: "Andrew Guo",
    email: "andrewguo108.dog@gmail.com",
  };

  return (
    <div className="account-wrapper">
      <div className="account-box">
        <h2>My Profile</h2>

        <div className="account-field">
          <label>Name</label>
          <div className="account-value">{user.name}</div>
        </div>

        <div className="account-field">
          <label>Email</label>
          <div className="account-value">{user.email}</div>
        </div>

        <form>
          {/* write each goal */}
        </form>

        <div className="button-group">
          {/* add a button for update goals */}
          <button className="back-button" onClick={() => navigate("/home")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
