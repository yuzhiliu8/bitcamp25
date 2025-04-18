from goals.goals import Goal
from db import db
from sqlalchemy import select
from users.user_service import UserService

class GoalsService:
    def __init__(self):
        pass
    
    def goal_by_id(self,user_id):
        print(f"in here now {user_id}")
        try: 
            goal = db.session.execute(
                db.select(Goal).where(Goal.user_id == user_id)
            ).scalar_one_or_none()
            print(f"DFJKDSLFJSKLFJDSKF {goal}")
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
        print(goal.to_json())
        
        db.session.add(goal)
        db.session.commit()
        return goal
        
    def update_goal(self,user_id,calorie,protein,carb,fat):
        goal = db.session.execute(
            db.select(Goal).where(Goal.user_id == user_id)
        ).scalar_one_or_none()
        print(f"DJFKLS {carb}")
        goal.calorie_goal= calorie
        goal.protein_goal= protein
        goal.carb_goal= carb
        goal.fat_goal= fat
        
        db.session.commit()
        return goal
    
    def init_db(self):
        # calorie = 50
        # protein = 50
        # carb = 50
        # fat = 50
        # goal = Goal(
        #     calorie_goal = calorie,
        #     protein_goal = protein,
        #     carb_goal = carb,
        #     fat_goal = fat,
        #     user_id = 1
        # )

        # db.session.add(goal)
        # db.session.commit()
        # return goal
        pass