from flask import Blueprint, request, jsonify, make_response
from goals.goals_service import GoalsService
from auth.auth_service import AuthService
from goals.goals import Goal

goals_controller = Blueprint('goals_controller',__name__)
goals_service = GoalsService()
auth_service = AuthService()


@goals_controller.route("/show-goal/<int:user_id>", methods = ["GET"])
def show_goal(user_id):
    goal = goals_service.goal_by_id(user_id)
    if goal is None:
        resp = make_response("Goal not created!")
        resp.status_code = 404
        return resp
    return jsonify(goal.to_json())

@goals_controller.route("/update-goal/", methods = ["PATCH"])
def update_goal():
    resp = make_response()
    session_id = request.cookies.get('sessionID')
    session = auth_service.authenticate_session(session_id)
    if session is None:
        resp.status_code = 401
        resp.set_data("session does not exist or is expired")
        return resp
    
    data = request.get_json()
    newGoal = goals_service.update_goal(session.user_id, data.get("calorie_goal"),data.get("protein_goal"),data.get("carb_goal"),data.get("fat_goal"))
    return jsonify(newGoal.to_json())

@goals_controller.route("/create-goal", methods = ["POST"])
def create_goal():
    data = request.get_json()
    calorie = data.get("calorie_goal")
    protein = data.get("protein_goal")
    carb = data.get("carb_goal")
    fat = data.get("fat_goal")
    userId = data.get("user_id")
    
    newGoal = goals_service.create_goal(calorie, protein, carb, fat, userId)
    
    if newGoal is None:
        resp = make_response("Goal alreaady created")
        resp.status_code = 400
        return resp
    elif newGoal == 0:
        resp = make_response("Goal Updated")
        resp.status_code = 200
        return resp
    
    return jsonify(newGoal.to_json())