from db import db
from sqlalchemy.orm import mapped_column
from sqlalchemy import Integer

class InferenceLog(db.Model):
    inference_id = mapped_column(Integer)