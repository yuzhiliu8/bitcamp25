from db import db
from flask import Flask, jsonify # type: ignore
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, ForeignKey
from flask_cors import CORS #type: ignore
from users.users import User

class Goal(db.Model):
    __tablename__ = "goals"
    
    calorie_goal: Mapped[float] = mapped_column(float,nullable = False)
    protein_goal: Mapped[float] = mapped_column(float,nullable = False)
    carb_goal: Mapped[float] = mapped_column(float,nullable = False)
    fat_goal: Mapped[float] = mapped_column(float,nullable = False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True, nullable=False)

    user: Mapped[User] = relationship("User", back_populates="goal")
    
    def to_json(self):
        return{
            "calorieGoal": self.calorie_goal,
            "proteinGoal": self.protein_goal,
            "carbGoal": self.carb_goal,
            "fatGoal": self.fat_goal,
            "user_id": self.user_id
        }