from db import db
import hashlib
from auth.session import Session
from datetime import datetime, timedelta

class AuthService:

    def __init__(self):
        self.db = db

    def authenticate_user(self, email, password, salt):
        #if email not exist, raise error
        #if password doesn't match, raise error
        hashed_password = hash_string(password + salt)

        user_id = 2 # fix when users is done

        session = Session(
            user_id=user_id,
            expiry_date=datetime.now() + timedelta(days=5))
        
        db.session.add(session)
        db.session.commit()

        return session

    def authenticate_session(self, session_id):
        stmt = db.select(Session).where(Session.session_id == session_id)
        resp = db.session.execute(stmt).scalars().first()
        return resp


def hash_string(string):
    encoded_string = string.encode('utf-8')
    hashed = hashlib.sha256(encoded_string).hexdigest()
    return hashed 
