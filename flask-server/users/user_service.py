from users.users import User
import hashlib
import random
import string
from db import db
from sqlalchemy import select
from util import hash_string

class UserService:
    def __init__(self):
        pass
    
    def user_by_id(self,id):
        try: 
            user = User.query.get(id)
            return user
        except:
            return None
        
    
    def create_user(self,email,pword,firstname,lastname):
        characters = string.ascii_letters + string.digits  # Includes uppercase, lowercase letters and digits
        salt = ''.join(random.choice(characters) for i in range(12))
        
        hashed = hash_string(pword + salt) 

        emails = db.session.execute(
            select(
                User.email
            )
        ).scalars().all()
        
        if email in emails:
            return None
        
        user = User(email = email ,password = hashed,first_name = firstname,last_name = lastname, salt = salt)
        
        db.session.add(user)
        db.session.commit()
        return user
    
    def init_db(self):
        salt = "h"
        pword = "password"
        user = User(
            email = "yliu08@gmail.com",
            password = hash_string(pword + salt),
            first_name = "Yuzhi",
            last_name = "Liu",
            salt = salt
        )

        db.session.add(user)
        db.session.commit()
        return user
        
    