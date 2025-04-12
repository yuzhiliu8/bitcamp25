from ultralytics import YOLO
from collections import Counter
import cv2

# api_key = "JRFZ8fRJnKhVuqkU7DR9kkzfweTZJQaEaCwSrWZk"

def main(): 
    # Load an Open Images Dataset V7 pretrained YOLOv8n model
    model = YOLO("yolov8x-oiv7.pt")

    # Run prediction
    # run inference
    results = model("model/inference-images/cucumbertomato.jpg", show = True, save = True)

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

# def search_food(query, api_key):


main()