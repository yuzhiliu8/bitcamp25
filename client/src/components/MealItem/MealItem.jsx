import React from 'react'
import "./MealItem.css"

export default function MealItem({ name, cals }) {
    return (
        <div className="meal-item">
            <div className="mi-container">

            <div className="name">{name}</div>
            <div className="space"> </div>
            <div className="cals"> {cals}</div>
            </div>
            
        </div>
    )
}
