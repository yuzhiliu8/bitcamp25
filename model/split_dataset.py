import os
import shutil
import random
from pathlib import Path

# Paths
SOURCE_DIR = Path("food-101/images")             # your current folder
DEST_DIR = Path("dataset")              # new folder to hold train/val
SPLIT_RATIO = 0.8                       # 80% train, 20% val

# Create destination folders
for split in ["train", "val"]:
    for class_name in os.listdir(SOURCE_DIR):
        (DEST_DIR / split / class_name).mkdir(parents=True, exist_ok=True)

# Split each class folder
for class_name in os.listdir(SOURCE_DIR):
    class_path = SOURCE_DIR / class_name
    images = os.listdir(class_path)
    random.shuffle(images)

    split_idx = int(len(images) * SPLIT_RATIO)
    train_imgs = images[:split_idx]
    val_imgs = images[split_idx:]

    for img in train_imgs:
        shutil.copy(class_path / img, DEST_DIR / "train" / class_name / img)
    for img in val_imgs:
        shutil.copy(class_path / img, DEST_DIR / "val" / class_name / img)

print("✅ Done! Your dataset is now split into train/ and val/ folders.")
