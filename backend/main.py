import uvicorn
from extract_texts import extract_text_from_image
from fastapi import FastAPI, UploadFile, File
from calculate import calculator    
import os
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv, dotenv_values

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)   

APIKey = os.getenv("GOOGLE_VISION_API_KEY")

@app.get("/")
async def root():
    return {"message": "Welcome to the Spymaster API!"}

@app.post("/process-image")
async def upload_image(file: UploadFile = File(...)):
    text_extractor = extract_text_from_image(APIkey=APIKey)
    image_bytes = await file.read()
    grid = text_extractor.extract(image_bytes)

    del image_bytes
    return {
        "grid": grid,
        "filename": file.filename,
        "message": "Image processed successfully",
        "size" : "{}x{}".format(len(grid), len(grid[0]) if grid else 0)
            }

 
if __name__ == "__main__":

    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
