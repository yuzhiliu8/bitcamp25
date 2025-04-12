from db import db
from datetime import datetime
from cal_logs.cal_logs import CalorieLogs
from cal_logs.food_item import FoodItem
from sqlalchemy.orm.attributes import flag_modified

class CalorieLogService:

    def __init__(self):
        pass

    
    def get_cal_log_by_date(self, user_id, date_str):
        # Assuming date_str is in the format 'YYYY-MM-DD'
        date_obj = datetime.strptime(date_str, "%Y-%m-%d").date()

        stmt = db.select(CalorieLogs).where(
            CalorieLogs.user_id == user_id,
            CalorieLogs.date == date_obj
        )

        cal_log = db.session.execute(stmt).scalars().first()
        if cal_log is None:
            new_log = CalorieLogs.new_log(user_id, date_obj)
            db.session.add(new_log)
            db.session.commit()
            return new_log
        
        return cal_log
    
    def update_log_by_food_item(self, user_id, date_str, food_item_data):
        cal_log = self.get_cal_log_by_date(user_id, date_str)
        food_item = self.create_food_item(cal_log.id, food_item_data)

        cal_log = self.update_log_by_macros(
            cal_log,
            food_item.meal_type,
            food_item.calories,
            food_item.carbs,
            food_item.protein,
            food_item.fat)
        
        cal_log.diary[food_item.meal_type + "_ids"].append(food_item.id)
        flag_modified(cal_log, "diary")
        db.session.commit()
        return cal_log
    
    def create_food_item(self, cal_log_id, food_item_data):
        food_item = FoodItem(
            cal_log_id=cal_log_id,
            meal_type=food_item_data["meal_type"],
            name=food_item_data["name"],
            quantity=food_item_data["quantity"],
            unit=food_item_data["unit"],
            calories=food_item_data["calories"],
            carbs=food_item_data["carbs"],
            protein=food_item_data["protein"],
            fat=food_item_data["fat"]
        )

        db.session.add(food_item)
        db.session.commit()

        return food_item

    def update_log_by_macros(self, cal_log:CalorieLogs, meal_type, calories, carbs, protein, fat):
        cal_log.total_calories += calories
        cal_log.total_carbs += carbs
        cal_log.total_protein += protein
        cal_log.total_fat += fat

        if meal_type == "breakfast":
            cal_log.breakfast_calories += calories
            cal_log.breakfast_carbs += carbs
            cal_log.breakfast_protein += protein
            cal_log.breakfast_fat += fat
        elif meal_type == "lunch":
            cal_log.lunch_calories += calories
            cal_log.lunch_carbs += carbs
            cal_log.lunch_protein += protein
            cal_log.lunch_fat += fat
        else: #dinner
            cal_log.dinner_calories += calories
            cal_log.dinner_carbs += carbs
            cal_log.dinner_protein += protein
            cal_log.dinner_fat += fat
        
        return cal_log
    

    def init_db(self):
        pass