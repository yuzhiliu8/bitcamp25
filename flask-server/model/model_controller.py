from flask import Blueprint, request, jsonify, make_response
from model.yolov8 import Yolov8
from PIL import Image
import io
import os

model_controller = Blueprint('model_controller',__name__)
api_key = os.getenv("USDA_API_KEY")
model_path = os.getenv("MODEL_PATH")
model = Yolov8(model_path, api_key)

@model_controller.route("/show-goal/<int:user_id>", methods = ["POST"])
def inference():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    # get the image
    file = request.files["image"]
    image = Image.open(io.BytesIO(file.read()))

    # get macros
    all_macros = model.inference(image)
    return jsonify(all_macros)