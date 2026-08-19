import os
import shutil
from PIL import Image

src_dir = r"C:\Users\mzebr\hustla\Osada Dzianisz N54\public\assets\osadadzianiszn54"
target_images = r"C:\Users\mzebr\hustla\Osada Dzianisz N54\public\assets\images"
target_video = r"C:\Users\mzebr\hustla\Osada Dzianisz N54\public\assets\video"

os.makedirs(target_images, exist_ok=True)
os.makedirs(target_video, exist_ok=True)

dji_count = 1
dsc_count = 1
img_count = 1
misc_count = 1

print("Starting media optimization...")

for filename in os.listdir(src_dir):
    filepath = os.path.join(src_dir, filename)
    if not os.path.isfile(filepath):
        continue
    
    name, ext = os.path.splitext(filename)
    ext = ext.lower()

    if ext == '.mp4':
        shutil.copy2(filepath, os.path.join(target_video, 'hero-background.mp4'))
        print(f"Copied {filename} to hero-background.mp4")
        continue
        
    if ext in ['.jpg', '.jpeg', '.png']:
        try:
            with Image.open(filepath) as img:
                # Convert RGBA to RGB for webp/jpeg saving
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                    
                width, height = img.size
                if width > 1920:
                    new_height = int((1920 / width) * height)
                    img = img.resize((1920, new_height), Image.Resampling.LANCZOS)
                
                # Determine new name
                if name.startswith('DJI_'):
                    new_name = f"zewnatrz-dron-{dji_count}.webp"
                    dji_count += 1
                elif name.startswith('DSC'):
                    new_name = f"wnetrze-{dsc_count}.webp"
                    dsc_count += 1
                elif name.startswith('IMG_'):
                    new_name = f"zewnatrz-zima-wieczor-{img_count}.webp"
                    img_count += 1
                else:
                    new_name = f"inne-{misc_count}.webp"
                    misc_count += 1
                    
                target_path = os.path.join(target_images, new_name)
                img.save(target_path, 'WEBP', quality=85)
                print(f"Processed {filename} -> {new_name}")
        except Exception as e:
            print(f"Failed to process {filename}: {e}")

print("Media optimization complete!")
