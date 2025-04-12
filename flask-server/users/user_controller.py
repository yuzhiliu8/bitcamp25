from flask import Blueprint, request, jsonify, make_response
from users.user_service import UserService
from auth.auth_service import AuthService


user_controller = Blueprint('user_controller',__name__)
user_service = UserService()
auth_service = AuthService()


@user_controller.route("/user-by-id/", methods = ["GET"])
def get_user_by_id():
    session_id = request.cookies.get("sessionID")
    session = auth_service.authenticate_session(session_id)
    user = user_service.user_by_id(session.user_id)
    if user is None:
        resp = make_response("User not found!")
        resp.status_code = 404
        return resp
    return jsonify(user.to_json())


@user_controller.route("/create-user", methods = ["POST"])
def create_user():
    data = request.get_json()
    email = data.get("email")
    pword = data.get("password")
    firstname = data.get("first_name")
    lastname = data.get("last_name")
    
    newUser = user_service.create_user(email,pword,firstname,lastname)
    
    if newUser is None:
        resp = make_response("Email is already used!")
        resp.status_code = 400
        return resp
    
    return jsonify(newUser.to_json())