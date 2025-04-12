from ultralytics import YOLO
from collections import Counter
import cv2
import requests

API_KEY = "JRFZ8fRJnKhVuqkU7DR9kkzfweTZJQaEaCwSrWZk"

def main(): 
    # Load an Open Images Dataset V7 pretrained YOLOv8n model
    model = YOLO("yolov8x-oiv7.pt")

    file = "model/food-101/images/waffles/1702.jpg"

    # Run prediction
    # run inference
    results = model(file, show = True, save = True)

    show_results(model, results)

def search_food(query, api_key):
    url = f"https://api.nal.usda.gov/fdc/v1/foods/search"
    params = {
        "query": query,
        "pageSize": 1,
        "dataType": ["Foundation", "SR Legacy", "Survey (FNDDS)"],
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
        
        macros = get_macros(food_item)
        print(f"Macros: {macros}")
    
def get_macros(food_item):
    macros = {
        "cals_per_gram": None,
        "protein": None,
        "carbs": None,
        "fat": None
    }
    
    print(f"Using food: {food_item.get('description', 'Unknown')}")

    for nutrient in food_item.get("foodNutrients", []):
        name = nutrient["nutrientName"].lower()
        unit = nutrient["unitName"]

        if "protein" in name and unit == "G" and macros["protein"] is None:
            macros["protein"] = nutrient["value"] / 100  # per gram
        elif "carbohydrate" in name and unit == "G" and macros["carbs"] is None:
            macros["carbs"] = nutrient["value"] / 100
        elif "total lipid" in name and unit == "G" and macros["fat"] is None:
            macros["fat"] = nutrient["value"] / 100
        elif "energy" in name and unit == 'KCAL' and macros["cals_per_gram"] is None:
            macros["cals_per_gram"] = nutrient["value"] / 100
    
    return macros

main()