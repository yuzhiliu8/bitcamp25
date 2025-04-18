from flask import Blueprint, request, make_response
from auth.auth_service import AuthService
from auth.session import Session
from datetime import datetime, timedelta
import json

auth_controller = Blueprint('auth_controller', __name__)
auth_service = AuthService()

@auth_controller.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    resp = make_response()

    session = auth_service.authenticate_user(email, password) #get salt from users table

    if session == "user_not_found" or session == "invalid_password":
        resp.status_code = 401
        resp.set_data(session)
        return resp

    expire_days = 5
    expire_date = datetime.now() + timedelta(days=expire_days)
    resp.set_data(json.dumps({'session_id': session.session_id, 'user_id': session.user_id, "expiry_date": expire_date.isoformat()}))
    resp.set_cookie("sessionID", str(session.session_id), path='/', max_age= (expire_days * 24 * 60 * 60))
    return resp

@auth_controller.route('/authenticate-session', methods=['GET'])
def authenticate_session():

    resp = make_response() 
    session_id = request.cookies.get('sessionID')
    if session_id is None:
        resp.status_code = 401
        resp.set_data(json.dumps({"msg": "not logged in"}))
        return resp

    session = auth_service.authenticate_session(session_id)
    if session is None:
        resp.status_code = 401
        resp.set_data("session does not exist or is expired")
        return resp

    #authenticated
    resp.status_code = 201
    resp.set_data(json.dumps(session.to_dict()))
    resp.mimetype = "application/json"
    return resp

@auth_controller.route('/delete-session', methods =["POST"])
def delete_session():
    print("hi")
    session_id = request.cookies.get('sessionID')
    auth_service.delete_session(session_id)
    return {"message":"success"}
