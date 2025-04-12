from db import db
from sqlalchemy.orm import mapped_column
from sqlalchemy import Integer, DateTime

class Session(db.Model):
    session_id = mapped_column(Integer, primary_key=True) 
    user_id = mapped_column(Integer, unique=False)
    expiry_date = mapped_column(DateTime)

    def to_dict(self):
        return {
            "session_id": self.session_id,
            "user_id": self.user_id,
            "expiry_date": self.expiry_date.isoformat()
        }

    def __str__(self):
        return f'{self.session_id} {self.user_id} {self.expiry_date}'
