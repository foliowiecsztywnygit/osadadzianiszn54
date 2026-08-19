from PIL import Image
import glob
import os

files = glob.glob('public/assets/images/*zewnatrz-zima-wieczor*.webp') + glob.glob('dist/assets/images/*zewnatrz-zima-wieczor*.webp')

for file in files:
    if os.path.exists(file):
        try:
            # Open the image
            img = Image.open(file)
            
            # Rotate 90 degrees counter-clockwise to revert the previous clockwise rotation.
            img = img.rotate(90, expand=True)
            
            # Save the image, overwriting the original
            img.save(file)
            print(f"Rotated back {file}")
        except Exception as e:
            print(f"Failed to rotate back {file}: {e}")
    else:
        print(f"File not found: {file}")
