from db import db
from sqlalchemy.orm import mapped_column
from sqlalchemy import Integer, Date, JSON


class CalorieLogs(db.Model):
    id = mapped_column(Integer, primary_key=True)
    user_id = mapped_column(Integer, unique=False)
    date = mapped_column(Date)

    diary = mapped_column(JSON)

    total_calories = mapped_column(Integer)
    total_protein = mapped_column(Integer)
    total_fat = mapped_column(Integer)
    total_carbs = mapped_column(Integer)

    breakfast_calories = mapped_column(Integer)
    breakfast_protein = mapped_column(Integer)
    breakfast_fat = mapped_column(Integer)
    breakfast_carbs = mapped_column(Integer)

    lunch_calories = mapped_column(Integer)
    lunch_protein = mapped_column(Integer)
    lunch_fat = mapped_column(Integer)
    lunch_carbs = mapped_column(Integer)

    dinner_calories = mapped_column(Integer)
    dinner_protein = mapped_column(Integer)
    dinner_fat = mapped_column(Integer)
    dinner_carbs = mapped_column(Integer)


    def to_dict(self):
        return {
            "user_id": self.user_id,
            "date": self.date.isoformat(),
            "diary": self.diary,

            "total_calories": self.total_calories,
            "total_protein": self.total_protein,
            "total_fat": self.total_fat,
            "total_carbs": self.total_carbs,

            "breakfast_calories": self.breakfast_calories,
            "breakfast_protein": self.breakfast_protein,
            "breakfast_fat": self.breakfast_fat,
            "breakfast_carbs": self.breakfast_carbs,

            "lunch_calories": self.lunch_calories,
            "lunch_protein": self.lunch_protein,
            "lunch_fat": self.lunch_fat,
            "lunch_carbs": self.lunch_carbs,

            "dinner_calories": self.dinner_calories,
            "dinner_protein": self.dinner_protein,
            "dinner_fat": self.dinner_fat,
            "dinner_carbs": self.dinner_carbs
        }

    def __str__(self):
        return f'''
        user_id: {self.user_id}
        date: {self.date}
        diary: {self.diary}

        total_calories: {self.total_calories}
        total_protein: {self.total_protein}
        total_fat: {self.total_fat}
        total_carbs: {self.total_carbs}

        breakfast_calories: {self.breakfast_calories}
        breakfast_protein: {self.breakfast_protein}
        breakfast_fat: {self.breakfast_fat}
        breakfast_carbs: {self.breakfast_carbs}

        lunch_calories: {self.lunch_calories}
        lunch_protein: {self.lunch_protein}
        lunch_fat: {self.lunch_fat}
        lunch_carbs: {self.lunch_carbs}

        dinner_calories: {self.dinner_calories}
        dinner_protein: {self.dinner_protein}
        dinner_fat: {self.dinner_fat}
        dinner_cars bs: {self.dinner_carbs}
        '''
    
    @classmethod
    def new_log(cls, user_id, date):
        new_log = cls(
            user_id=user_id,
            date=date,

            diary={
                "breakfast": [],
                "lunch": [],
                "dinner": []
            },

            total_calories=0,
            total_protein=0,
            total_fat=0,
            total_carbs=0,

            breakfast_calories=0,
            breakfast_protein=0,
            breakfast_fat=0,
            breakfast_carbs=0,

            lunch_calories=0,
            lunch_protein=0,
            lunch_fat=0,
            lunch_carbs=0,

            dinner_calories=0,
            dinner_protein=0,
            dinner_fat=0,
            dinner_carbs=0
        )
        return new_log

    def update_breakfast(self, calories, carbs, protein, fat):
        self.total_calories += calories
        self.total_carbs += carbs
        self.total_protein += protein
        self.total_fat += fat

        self.breakfast_calories += calories
        self.breakfast_carbs += carbs
        self.breakfast_protein += protein
        self.breakfast_fat += fat

    def update_lunch(self, calories, carbs, protein, fat):
        self.total_calories += calories
        self.total_carbs += carbs
        self.total_protein += protein
        self.total_fat += fat

        self.lunch_calories += calories
        self.lunch_carbs += carbs
        self.lunch_protein += protein
        self.lunch_fat += fat

    def update_dinner(self, calories, carbs, protein, fat):
        self.total_calories += calories
        self.total_carbs += carbs
        self.total_protein += protein
        self.total_fat += fat
    
        self.dinner_calories += calories
        self.dinner_carbs += carbs
        self.dinner_protein += protein
        self.dinner_fat += fat