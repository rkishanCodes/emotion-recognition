import base64

# Path to the image
image_path = "/Users/rkishan/Projects/FaceEmotion/backend/angry.jpg"

# Open the image and read it as binary
with open(image_path, "rb") as image_file:
    # Encode the image to base64
    encoded_image = base64.b64encode(image_file.read()).decode("utf-8")

# Print the base64 string
print(f"data:image/jpeg;base64,{encoded_image}")