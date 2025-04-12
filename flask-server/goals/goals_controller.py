from flask import Blueprint, request, jsonify, make_response
from goals.goals_service import GoalsService

goals_controller = Blueprint('goals_controller',__name__)
goals_service = GoalsService()


@goals_controller.route("/create-goal", methods = ["POST"])
def create_goal():
    data = request.get_json()
    calorie = data.get("calorie_goal")
    protein = data.get("protein_goal")
    carb = data.get("carb_goal")
    fat = data.get("fat_goal")
    # user_id = 
    
    # newUser = user_service.create_user(email,pword,firstname,lastname)
    
    # if newUser is None:
    #     resp = make_response("Email is already used!")
    #     resp.status_code = 400
    #     return resp
    
    # return jsonify(newUser.to_json())