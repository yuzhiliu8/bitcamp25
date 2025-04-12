from db import db
from flask import Flask, jsonify # type: ignore
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, ForeignKey
from flask_cors import CORS #type: ignore
from users.users import User


class Goal(db.Model):
    __tablename__ = "goals"
    id: Mapped[int] = mapped_column(primary_key=True)
    calorie_goal: Mapped[int] = mapped_column(Integer,nullable = False)
    protein_goal: Mapped[float] = mapped_column(Integer,nullable = False)
    carb_goal: Mapped[int] = mapped_column(Integer,nullable = False)
    fat_goal: Mapped[int] = mapped_column(Integer,nullable = False)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    
    def to_json(self):
        return{
            "calorieGoal": self.calorie_goal,
            "proteinGoal": self.protein_goal,
            "carbGoal": self.carb_goal,
            "fatGoal": self.fat_goal,
            "user_id": self.user_id
        }