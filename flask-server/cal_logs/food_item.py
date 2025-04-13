from db import db
from sqlalchemy.orm import mapped_column
from sqlalchemy import Integer, String


class FoodItem(db.Model):
    id = mapped_column(Integer, primary_key=True)
    cal_log_id = mapped_column(Integer, unique=False)
    meal_type = mapped_column(String)
    name = mapped_column(String)
    quantity = mapped_column(Integer)
    unit = mapped_column(String)
    calories = mapped_column(Integer)
    carbs = mapped_column(Integer)
    protein = mapped_column(Integer)
    fat = mapped_column(Integer)

    def to_dict(self):
        return {
            "id": self.id,
            "cal_log_id": self.cal_log_id,
            "meal_type": self.meal_type,
            "name": self.name,
            "calories": self.calories,
            "carbs": self.carbs,
            "protein": self.protein,
            "fat": self.fat
        }
