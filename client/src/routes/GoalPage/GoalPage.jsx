import React, { useState } from "react";
import "./GoalPage.css";
import { useNavigate } from 'react-router';
import { API_URL } from "../../util/Constants";

export default function GoalPage(){
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(goals);
    

        const formData = new FormData();
        formData.append('calorie_goal', goals.calories);
        formData.append('carbs_goal', goals.carbs);
        formData.append('protein_goal', goals.protein);
        formData.append('fat_goal', goals.fat);
        
        const user_input = {
            "calorie_goal": goals.calories,
            "carb_goal": goals.carbs,
            "protein_goal": goals.protein,
            "fat_goal":goals.fat
        }

        const response = await fetch(`${API_URL}/api/goal/create-goal`, {
            method: 'POST',
            body: JSON.stringify(user_input),
            credentials: 'include',
            headers: {
            "Content-Type": "application/json",
            },
        });
        console.log(response)
        navigate("/home")

    }
    

    return(
    <div className="goal-wrapper">
        <div className="goal-box">
            <h2>Set Your Macro Goals!</h2>
            <p>Enter your daily goals for each category!</p>
            <form onSubmit={handleSubmit} className="goal-field">
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
            
            <button className="set-goals-btn" type="submit">Set Goals</button>
            </form>
        </div>
    </div>
    )
}