import uvicorn
from extract_texts import extract_text_from_image
from fastapi import FastAPI, UploadFile, File
from calculate import calculator    
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv, dotenv_values

# Load environment variables
load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)   

APIKey = os.getenv("GOOGLE_VISION_API_KEY")
print(APIKey)
text_extractor = extract_text_from_image(APIkey=APIKey)

@app.get("/")
async def root():
    return {"message": "Welcome to the Spymaster API!"}

@app.post("/process-image")
async def upload_image(file: UploadFile = File(...)):
    image_bytes = await file.read()
    grid = text_extractor.extract(image_bytes)

    return {
        "grid": grid,
        "file": file.filename,
        "message": "Image processed successfully",
            }


if __name__ == "__main__":
    # logic for extracting text from an image and calculating vectors
    # APIkey = 'gcp_key.json'
    # image_path = 'spymasterGridDiscord.png'
    # extractor = extract_text_from_image(image_path=image_path, APIkey=APIkey).formulate
    
    uvicorn.run(app, host="127.0.0.1", port=8000)
