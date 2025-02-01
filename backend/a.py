from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from deepface import DeepFace
import os
import uuid

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

model = DeepFace.build_model("VGG-Face")

# Emotion-to-Books Mapping
book_data = {
    "angry": [
        "https://m.media-amazon.com/images/I/71-3H3w6t9L.jpg",
        "https://m.media-amazon.com/images/I/61uDaiSPAnL._AC_UF1000,1000_QL80_.jpg",
        "https://m.media-amazon.com/images/I/715xo1xPg9L._AC_UF1000,1000_QL80_.jpg",
        "https://m.media-amazon.com/images/I/81HuYGapupL._AC_UF1000,1000_QL80_.jpg",
        "https://m.media-amazon.com/images/I/71-OPNdR1FL.jpg"
    ],
    "disgust": [
        "https://m.media-amazon.com/images/I/91yIVkLIPDL._AC_UF1000,1000_QL80_.jpg",
        "https://m.media-amazon.com/images/I/71-oDsLSQYL.jpg",
        "https://m.media-amazon.com/images/I/61XsLQzCkRL.jpg",
        "https://m.media-amazon.com/images/I/51A1m7RzTjL._AC_UF1000,1000_QL80_.jpg",
        "https://m.media-amazon.com/images/I/81ChFcmhXDL._AC_UF1000,1000_QL80_.jpg"
    ],
    "fear": [
        "https://m.media-amazon.com/images/I/81yRVLErJ9L.jpg",
        "https://m.media-amazon.com/images/I/819zSRTimoL.jpg",
        "https://m.media-amazon.com/images/I/81HabVWyucL.jpg",
        "https://m.media-amazon.com/images/I/61EKujVNIEL._AC_UF1000,1000_QL80_.jpg"
    ],
    "happy": [
        "https://m.media-amazon.com/images/I/61o3KimH2tL._AC_UF1000,1000_QL80_.jpg",
        "https://m.media-amazon.com/images/I/91pTA0XmD1L._AC_UF1000,1000_QL80_.jpg",
        "https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg",
        "https://m.media-amazon.com/images/I/61HAE8zahLL.jpg",
        "https://m.media-amazon.com/images/I/619ZKDSCt1L.jpg"
    ],
    "sad": [
        "https://m.media-amazon.com/images/I/71Shq1RS3lL._AC_UF1000,1000_QL80_.jpg",
        "https://m.media-amazon.com/images/I/711JIKIt8XS._AC_UF1000,1000_QL80_.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBfrSaqfs2hpVKQPFXZIYUjgqcXEsHk344A&s",
        "https://m.media-amazon.com/images/I/71iw3KvoQiL.jpg"
    ],
    "surprise": [
        "https://m.media-amazon.com/images/I/71+khXHbe5L.jpg",
        "https://m.media-amazon.com/images/I/81JJPDNlxSL.jpg",
        "https://m.media-amazon.com/images/I/81YW99XIpJL._UF1000,1000_QL80_.jpg",
        "https://m.media-amazon.com/images/I/81fp8q4d3ZL._UF1000,1000_QL80_.jpg",
        "https://m.media-amazon.com/images/I/81-uOUBKrFL._AC_UF1000,1000_QL80_.jpg"
    ]
}

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