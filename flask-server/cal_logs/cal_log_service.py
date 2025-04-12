from db import db
from datetime import datetime
from cal_logs.cal_logs import CalorieLogs

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

        resp = db.session.execute(stmt).scalars().first()
        if resp is None:
            new_log = CalorieLogs.new_log(user_id, date_obj)
            db.session.add(new_log)
            db.session.commit()
            return new_log
        
        return resp
    

    def init_db(self):
        pass