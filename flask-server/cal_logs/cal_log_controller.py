from flask import Blueprint, request, make_response
from cal_logs.cal_log_service import CalorieLogService
from auth.auth_controller import AuthService
from datetime import datetime

cal_log_controller = Blueprint('cal_log_controller', __name__)
cal_log_service = CalorieLogService()
auth_service = AuthService()


@cal_log_controller.route('/get-cal-log', methods=["POST"])
def get_cal_log():
    resp = make_response()
    session_id = request.cookies.get('sessionID')
    session = auth_service.authenticate_session(session_id)
    if session is None:
        resp.status_code = 401
        resp.set_data("session does not exist or is expired")
        return resp

    #authenticated
    user_id = session.user_id

    date_str = request.form['date']
    cal_log = cal_log_service.get_cal_log_by_date(user_id, date_str)

    return make_response(cal_log.to_dict())

    