from db import db
from flask import Flask, jsonify # type: ignore
from flask_sqlalchemy import SQLAlchemy# type: ignore
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column# type: ignore
from sqlalchemy import Integer, String, MetaData# type: ignore
from flask_cors import CORS #type: ignore

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key = True)
    first_name: Mapped[str] = mapped_column(String(100),nullable = False)
    last_name: Mapped[str] = mapped_column(String(100),nullable = False)
    email: Mapped[str] = mapped_column(String(100),nullable = False, unique = True)
    password: Mapped[str] = mapped_column(String(15000),nullable = False, unique = True)
    salt: Mapped[str] = mapped_column(String(150),nullable = False, unique = True)
    
    
    
    def to_json(self):
        return{
            "id": self.id,
            "email": self.email,
            "firstName": self.first_name,
            "lastName": self.last_name
        }