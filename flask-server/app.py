from flask import Flask
from dotenv import load_dotenv
from db import db
from users.users import User
import os
from users.user_controller import user_controller
from auth.auth_controller import auth_controller


def create_app():
    app = Flask(__name__)
    app.register_blueprint(user_controller, url_prefix="/api/users")
    app.register_blueprint(auth_controller, url_prefix="/api/auth")

    conn_string = os.getenv("DATABASE_URL")
    app.config["SQLALCHEMY_DATABASE_URI"] = conn_string
    db.init_app(app)
    
    with app.app_context():
        db.drop_all()
        db.create_all()

    return app

if __name__ == "__main__":
    load_dotenv()
    app = create_app()
    app.run(port=5000, debug=True)
