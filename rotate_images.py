from PIL import Image
import glob
import os

files = glob.glob('public/assets/images/*zewnatrz-zima-wieczor*.webp') + glob.glob('dist/assets/images/*zewnatrz-zima-wieczor*.webp')

for file in files:
    if os.path.exists(file):
        try:
            # Open the image
            img = Image.open(file)
            
            # Rotate 90 degrees clockwise. PIL's rotate takes degrees counter-clockwise, so -90 is clockwise.
            # expand=True ensures the image dimensions are swapped so it's not cropped.
            img = img.rotate(-90, expand=True)
            
            # Save the image, overwriting the original
            img.save(file)
            print(f"Rotated {file}")
        except Exception as e:
            print(f"Failed to rotate {file}: {e}")
    else:
        print(f"File not found: {file}")
