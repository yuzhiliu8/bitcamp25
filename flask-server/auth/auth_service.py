from db import db
from auth.session import Session
from users.users import User
from datetime import datetime, timedelta
from util import hash_string

class AuthService:

    def __init__(self):
        self.db = db

    def authenticate_user(self, email, password):
        stmt = db.select(User).where(User.email == email)
        resp = db.session.execute(stmt).scalars().first()
        if resp is None:
            return "user_not_found"
        
        salt = resp.salt
        print(salt)

        hashed_password = hash_string(password + salt)
        print(hashed_password)

        if hashed_password != resp.password:
            return "invalid_password"

        session = Session(
            user_id=resp.id,
            expiry_date=datetime.now() + timedelta(days=5))
        
        db.session.add(session)
        db.session.commit()

        return session

    def authenticate_session(self, session_id):
        if session_id is None:
            return None
        stmt = db.select(Session).where(Session.session_id == session_id)
        resp = db.session.execute(stmt).scalars().first()
        return resp

    def init_db(self):
        session = Session(
            user_id=1,
            expiry_date=datetime.now() + timedelta(days=5))
        db.session.add(session)
        db.session.commit()
        return session
    


