import React, { useState } from "react";
import "./ProfilePage.css";
import { useNavigate } from "react-router";

function ProfilePage() {
  const navigate = useNavigate();

  const [goals, updateGoals]=useState({
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateGoals(prev => ({ ...prev, [name]: value }));
    console.log(goals);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(goals);
    //fix later

    
    // add stuff to make this work can either make it update on the spot or display a success message
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

        {/* <div className="account-field">
          <label>Calories:</label>
          <input name="calories" className="acc-val2" value={"hh"}/>
        </div> */}
       

        <form onSubmit={handleSubmit} className="account-field">
          <label>Calories</label>
          <input 
            className="acc-val2"
            type="calories"
            placeholder={goals.calories}
            name="calories"
            onChange={handleChange}>
          </input>
          <label>Carbs</label>
          <input
            className="acc-val2"
            type="carbs"
            placeholder={goals.carbs}
            name="carbs"
            onChange={handleChange}>
          </input>
          <label>Protein</label>
          <input
            className="acc-val2"
            type="protein"
            placeholder={goals.protein}
            name="protein"
            onChange={handleChange}> 
          </input>
          <label>Fat</label>
          <input
            className="acc-val2"
            type="fat"
            placeholder={goals.fat}
            name="fat"
            onChange={handleChange}>
          </input>
          
          <button className="update-goals-btn" type="submit">Update Goals</button>
        </form>

        <div className="button-group">
          <button className="back-button" onClick={() => navigate("/home")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
