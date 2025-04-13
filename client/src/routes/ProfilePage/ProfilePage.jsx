import React, { useState, useEffect} from "react";
import "./ProfilePage.css";
import { useNavigate } from "react-router";
import { API_URL } from "../../util/Constants";

function ProfilePage({ session }) {
  const navigate = useNavigate();

  const [goals, updateGoals]=useState({
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0
  });
  
  const fetchGoal = async () => {
    const response = await fetch(`${API_URL}/api/goal/show-goal`,{
      credentials: 'include'
    })
    console.log(response);

    const data = await response.json();

    updateGoals(prev => ({
      calories:data.calorieGoal,
      carbs:data.carbGoal,
      protein:data.proteinGoal,
      fat:data.fatGoal
    }));
    
}

useEffect(()=>{
    fetchGoal()
},[])


  const handleChange = (event) => {
    const { name, value } = event.target;
    updateGoals(prev => ({ ...prev, [name]: value }));
    console.log(goals);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(goals);
    //fix later

    const formData = new FormData();
    formData.append('calorie_goal', goals.calories);
    formData.append('carb_goal', goals.carbs);
    formData.append('protein_goal', goals.protein);
    formData.append('fat_goal', goals.fat);
    
    const user_input = {
      "calorie_goal": goals.calories,
      "carb_goal": goals.carbs,
      "protein_goal": goals.protein,
      "fat_goal":goals.fat
    }
    console.log(user_input)

    const response = await fetch(`${API_URL}/api/goal/update-goal/`, {
      method: 'PATCH',
      body: JSON.stringify(user_input),
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },    
    });
    
    console.log(response)
    navigate("/home")
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
          <button style={{width:"340px"}} onClick={() => navigate("/home")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
