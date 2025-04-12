from ultralytics import YOLO
from collections import Counter
import cv2
import requests

API_KEY = "JRFZ8fRJnKhVuqkU7DR9kkzfweTZJQaEaCwSrWZk"

def main(): 
    # Load an Open Images Dataset V7 pretrained YOLOv8n model
    model = YOLO("yolov8x-oiv7.pt")

    file = "model/inference-images/cucumbertomato.jpg"

    # Run prediction
    # run inference
    results = model(file, show = True, save = True)

    show_results(model, results)

def search_food(query, api_key):
    url = f"https://api.nal.usda.gov/fdc/v1/foods/search"
    params = {
        "query": query,
        "pageSize": 1,
        "api_key": api_key,
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data['foods'][0] if data['foods'] else None

def show_results(model, results):
    # Counter to track class occurrences
    class_counter = Counter()

    # Loop through results and count classes
    for result in results:
        for box in result.boxes:
            class_id = int(box.cls[0])
            class_name = model.names[class_id]
            class_counter[class_name] += 1

    # Print the results
    print("✅ Detected Classes and Counts:")
    for class_name, count in class_counter.items():
        print(f"{class_name}: {count}")
        food_item = search_food(class_name, API_KEY)
        print(get_calories_per_gram(food_item=food_item))
    
def get_calories_per_gram(food_item):
    for nutrient in food_item['foodNutrients']:
        if 'energy' in nutrient['nutrientName'].lower() and nutrient['unitName'] == 'KCAL':
            # usually given per 100g
            return nutrient['value'] / 100
    return None

main()