from flask import Blueprint, request, jsonify, make_response
from model.yolov8 import Yolov8
from dotenv import load_dotenv
from PIL import Image
import io
import os


model_controller = Blueprint('model_controller',__name__)
api_key = os.getenv("USDA_API_KEY")
model_path = os.getenv("MODEL_PATH")
# model = None
model = Yolov8(model_path, api_key)


@model_controller.route("/show-model", methods = ["POST"])
def inference():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    # get the image
    file = request.files["image"]
    image = Image.open(io.BytesIO(file.read()))

    # get macros
    init_model()
    all_macros = model.inference(image)
    return jsonify(all_macros)

def init_model():
    global model
    if model is None:
        model = Yolov8(model_path, api_key)
        print("Model initialized")
    else:
        print("Model already initialized")
