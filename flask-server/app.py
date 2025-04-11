from flask import Flask
from dotenv import load_dotenv
from db import db
import os

load_dotenv

def create_app():
    app = Flask(__name__)
    conn_string = os.getenv("DATABASE_URL")
    app.config["SQLALCHEMY_DATABASE_URI"] = conn_string
    db.init_app(app)

    return app

if __name__ == "__main__":
    load_dotenv()
    app = create_app()
    app.run(port=5000, debug=True)
