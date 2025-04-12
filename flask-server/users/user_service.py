from users.users import User
import hashlib
import random
import string
from db import db
from sqlalchemy import select

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
        
        encoded_string = (salt+pword).encode('utf-8')
        hashed = hashlib.sha256(encoded_string).hexdigest()
        
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
        
    