from ultralytics import YOLO
from collections import Counter
import requests
from dotenv import load_dotenv
from pathlib import Path
import os
import shutil

load_dotenv()

class Yolov8:
    def __init__(self, model_path, api_key):
        self.model = YOLO(model_path)
        self.api_key = api_key

    def inference(self, file, id=0):
        show = os.getenv("SHOW_MODEL_INFERENCE", "false").strip().lower() in ("true", "1", "yes")
        save = os.getenv("SAVE_MODEL_INFERENCE", "false").strip().lower() in ("true", "1", "yes")
        detections = self.model(file, show=show, save=save)

        # self.move_and_rename_latest_detection(id)

        # print(self.get_latest_predict_folder())

        # Counter to track class occurrences
        class_counter = Counter()

        # Loop through results and count classes
        for detection in detections:
            for box in detection.boxes:
                class_id = int(box.cls[0])
                class_name = self.model.names[class_id]
                class_counter[class_name] += 1

        all_macros = {} # dict of dicts

        # Print the results
        print("✅ Detected Classes and Counts:")
        for class_name, count in class_counter.items():
            print(f"{class_name}: {count}")
            food_item = self.search_food(class_name)
            if not food_item:
                continue
            
            macros = {
                "cals_per_gram": None,
                "protein": None,
                "carbs": None,
                "fat": None
            }
            print(f"Using food: {food_item.get('description', 'Unknown')}")

            # find relevant data
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

            all_macros[class_name] = macros
        
        return all_macros
        
    def search_food(self, query):
        url = f"https://api.nal.usda.gov/fdc/v1/foods/search"
        params = {
        "query": query,
        "pageSize": 1,
        "dataType": ["Foundation", "SR Legacy", "Survey (FNDDS)"],
        "api_key": self.api_key,
        }
        response = requests.get(url, params=params)
        data = response.json()
        return data['foods'][0] if data['foods'] else None
    
    def rename_image_in_place(current_path, new_name):
        dir_path = os.path.dirname(current_path)
        new_path = os.path.join(dir_path, new_name)
        os.rename(current_path, new_path)
        return new_path
    
    def get_most_recent_image(folder_path):
        # Get all files (images) in the folder
        files = list(Path(folder_path).glob("*.*"))
        
        if not files:
            return None  # No images found

        # Return the file with the latest modification time
        most_recent_file = max(files, key=os.path.getmtime)
        return str(most_recent_file)
    
    def get_latest_predict_folder(self, base="./inference_results"):
        folders = [f for f in Path(base).iterdir() if f.is_dir() and f.name.startswith("predict")]
        if not folders:
            return None
        return max(folders, key=os.path.getmtime)
    
    def move_and_rename_latest_detection(self, new_name, dest_folder="all_detections"):
        # Path where Ultralytics saves results
        base_path = Path("./inference_results")
        
        # Find the most recent `predict*` folder
        folders = sorted(
            [f for f in base_path.iterdir() if f.is_dir() and f.name.startswith("predict")],
            key=lambda x: x.stat().st_mtime,
            reverse=True
        )

        if not folders:
            raise FileNotFoundError("No prediction folders found.")
        
        latest_folder = folders[0]
        
        # Find the first .jpg image in the latest prediction folder
        images = list(latest_folder.glob("*.jpg"))
        if not images:
            raise FileNotFoundError("No images found in the latest prediction folder.")
        
        image_path = images[0]

        # Ensure the destination folder exists
        dest_path = Path(dest_folder)
        dest_path.mkdir(parents=True, exist_ok=True)

        # Create new path
        new_path = dest_path / f"{new_name}.jpg"
        
        # Move and rename the file
        shutil.move(str(image_path), str(new_path))

        return new_path