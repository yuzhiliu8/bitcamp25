from yolov8 import Yolov8

def main():
    api_key = "JRFZ8fRJnKhVuqkU7DR9kkzfweTZJQaEaCwSrWZk"

    model = Yolov8("flask-server/model/yolov8x-oiv7.pt", api_key)

    print(model.inference("model/food-101/images/waffles/1702.jpg"))

main()