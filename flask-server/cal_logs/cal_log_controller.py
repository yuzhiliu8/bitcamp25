from flask import Blueprint, request, make_response
from cal_logs.cal_log_service import CalorieLogService
from auth.auth_service import AuthService
import json

cal_log_controller = Blueprint('cal_log_controller', __name__)
cal_log_service = CalorieLogService()
auth_service = AuthService()


@cal_log_controller.route('/get-cal-log', methods=["POST"])
def get_cal_log():
    resp = make_response()
    session_id = request.cookies.get('sessionID')
    print(session_id)
    session = auth_service.authenticate_session(session_id)
    print(session)
    if session is None:
        resp.status_code = 401
        resp.set_data("session does not exist or is expired")
        return resp

    #authenticated
    user_id = session.user_id

    date_str = request.form['date']
    cal_log = cal_log_service.get_cal_log_by_date(user_id, date_str)
    print(cal_log.to_dict())

    resp.set_data(json.dumps(cal_log.to_dict()))
    resp.status_code = 200

    return resp

@cal_log_controller.route('/update-cal-log', methods=["POST"])
def update_cal_log():
    resp = make_response()
    session_id = request.cookies.get('sessionID')
    session = auth_service.authenticate_session(session_id)
    if session is None:
        resp.status_code = 401
        resp.set_data("session does not exist or is expired")
        return resp
    
    user_id = session.user_id
    food_item_data = dict(request.get_json())
    print(food_item_data)
    date_str = food_item_data["date"]
    cal_log = cal_log_service.update_log_by_food_item(user_id, date_str, food_item_data)
    resp.set_data(json.dumps(cal_log.to_dict()))
    resp.status_code = 200
    return resp
    
# @cal_log_controller.route('/get-diary-list', methods=["POST"])
# def get_diary_list():
#     resp = make_response()
    