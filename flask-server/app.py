from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from db import db
import os
from users.user_controller import user_controller
from auth.auth_controller import auth_controller
from cal_logs.cal_log_controller import cal_log_controller
from goals.goals_controller import goals_controller
from model.model_controller import model_controller

from users.user_service import UserService
from auth.auth_service import AuthService
from cal_logs.cal_log_service import CalorieLogService
from goals.goals_service import GoalsService



def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True)
    app.register_blueprint(user_controller, url_prefix="/api/users")
    app.register_blueprint(auth_controller, url_prefix="/api/auth")
    app.register_blueprint(cal_log_controller, url_prefix="/api/callogs")
    app.register_blueprint(goals_controller, url_prefix = "/api/goal")


    run_model = os.getenv("RUN_MODEL", "false").strip().lower() in ("true", "1", "yes")
    if run_model:
        # print("registered blueprint")
        app.register_blueprint(model_controller, url_prefix = "/api/model")

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
