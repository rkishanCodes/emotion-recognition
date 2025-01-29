from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from deepface import DeepFace
import os
import uuid

app = FastAPI()

origins = [
    "http://localhost:5173",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

model = DeepFace.build_model("VGG-Face")

@app.post("/analyze_image/")
async def analyze_image(file: UploadFile = File(...)):
    try:
       
        image_data = await file.read()

      
        image_path = f"temp_{uuid.uuid4()}.jpg"
        
      
        with open(image_path, "wb") as f:
            f.write(image_data)

      
        result = DeepFace.analyze(
            img_path=image_path,
            actions=['emotion'],
            detector_backend="opencv",
            enforce_detection=False,
            align=True
        )

        
        emotions = result[0]['emotion']
        dominant_emotion = result[0]['dominant_emotion']
        confidence = result[0]['face_confidence']

        
        confidence = float(confidence)

       
        emotions.pop('neutral', None)

      
        if dominant_emotion == 'neutral':
            
            dominant_emotion = max(emotions, key=emotions.get) if emotions else 'unknown'

       
        emotions = {k: float(v) for k, v in emotions.items()}

       
        os.remove(image_path)

        return {
            "emotions": emotions,
            "dominant_emotion": dominant_emotion,
            "confidence": confidence
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)