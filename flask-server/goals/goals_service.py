from goals.goals import Goal
from db import db
from sqlalchemy import select
from users.user_service import UserService

class GoalsService:
    def __init__(self):
        pass
    
    def goal_by_id(self,user_id):
        try: 
            goal = Goal.query.get(user_id)
            return goal
        except:
            return None
        
    
    def create_goal(self,calorie, protein, carb, fat, userId):
        
        Ids = db.session.execute(
            select(
                Goal.user_id
            )
        ).scalars().all()
        
        if userId in Ids:
            return None
        
        goal = Goal(calorie_goal = calorie, protein_goal = protein, carb_goal = carb, fat_goal = fat, user_id = userId)
        
        db.session.add(goal)
        db.session.commit()
        return goal
        
    def update_goal(self,user_id,calorie,protein,carb,fat):
        goal = Goal.query.get(user_id)
        goal.calorie_goal= (calorie)
        goal.protein_goal= (protein)
        goal.carb_goal= carb
        goal.fat_goal= fat
        
        db.session.commit()
        return goal
    
    def init_db(self):
        calorie = 50
        protein = 50
        carb = 50
        fat = 50
        goal = Goal(
            calorie_goal = calorie,
            protein_goal = protein,
            carb_goal = carb,
            fat_goal = fat,
            user_id = 1
        )

        db.session.add(goal)
        db.session.commit()
        return goal