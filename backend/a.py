from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from deepface import DeepFace
import os
import uuid
import json

app = FastAPI()

origins = [
    "http://localhost:5173",  
    "http://localhost:5174",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

# Load book data from JSON file
with open("book.json", "r") as file:
    book_data = json.load(file)

model = DeepFace.build_model("VGG-Face")

@app.post("/analyze_image/")
async def analyze_image(file: UploadFile = File(...)):
    try:
        image_data = await file.read()
        image_path = f"temp_{uuid.uuid4()}.jpg"
        with open(image_path, "wb") as f:
            f.write(image_data)

        # Analyze image
        result = DeepFace.analyze(
            img_path=image_path,
            actions=['emotion'],
            detector_backend="opencv",
            enforce_detection=False,
            align=True
        )

        emotions = result[0]['emotion']
        dominant_emotion = result[0]['dominant_emotion']

        # Remove neutral
        emotions.pop('neutral', None)

        if dominant_emotion == 'neutral' or dominant_emotion not in book_data:
            dominant_emotion = max(emotions, key=emotions.get) if emotions else 'unknown'

        os.remove(image_path)

        # Get book links based on detected emotion
        book_links = book_data.get(dominant_emotion, [])

        return {
            "header": f"Recommended Books for Emotion: {dominant_emotion.capitalize()}",
            "links": book_links
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
