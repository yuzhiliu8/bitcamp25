from flask import Blueprint, request, jsonify, make_response
from yolov8 import Yolov8
import os

model_controller = Blueprint('model_controller',__name__)
api_key = os.getenv("USDA_API_KEY")
model_path = os.getenv("MODEL_PATH")
model = Yolov8()

@model_controller.route("/show-goal/<int:user_id>", methods = ["GET"])
def inference():
    
    pass