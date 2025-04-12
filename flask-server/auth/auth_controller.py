from flask import Blueprint, request, make_response
from auth.auth_service import AuthService
from auth.session import Session
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

    resp.set_data(json.dumps({'session_id': session.session_id, 'user_id': 2, "expiry_date": "date"}))
    resp.set_cookie("sessionID", str(session.session_id))
    return resp

@auth_controller.route('/authenticate-session', methods=['GET'])
def authenticate_session():

    resp = make_response() 
    session_id = request.cookies.get('sessionID')
    if session_id is None:
        resp.status_code = 401
        resp.set_data("not logged in")
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

