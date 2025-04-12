from flask import Flask
from dotenv import load_dotenv
from db import db
from users.users import User
import os
from users.user_controller import user_controller
from auth.auth_controller import auth_controller
from goals.goals_controller import goals_controller

from users.user_service import UserService
from auth.auth_service import AuthService
from cal_logs.cal_log_service import CalorieLogService
from goals.goals_service import GoalsService



def create_app():
    app = Flask(__name__)
    app.register_blueprint(user_controller, url_prefix="/api/users")
    app.register_blueprint(auth_controller, url_prefix="/api/auth")
    app.register_blueprint(goals_controller, url_prefix = "/api/goal")

    conn_string = os.getenv("DATABASE_URL")
    app.config["SQLALCHEMY_DATABASE_URI"] = conn_string
    db.init_app(app)
    
    dev_mode = os.getenv("DEVELOPMENT_MODE")
    with app.app_context():
        if dev_mode == "True":
            db.drop_all()
            db.create_all()

            u = UserService()
            a = AuthService()
            c = CalorieLogService()
            g = GoalsService()
            
            
            u.init_db()
            g.init_db()
            a.init_db()
            c.init_db()
        else:
            db.create_all()
    return app

if __name__ == "__main__":
    load_dotenv()
    app = create_app()
    app.run(port=5000, debug=True)
