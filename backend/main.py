import uvicorn
from extract_texts import extract_text_from_image
from fastapi import FastAPI, UploadFile, File, Query
from calculate import calculator    
import os
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv, dotenv_values
from typing import List 
load_dotenv()
grid = []
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
    grid = text_extractor.grid
    return {
        "size" : "{}x{}".format(len(grid), len(grid[0]) if grid else 0),
        "grid": grid,
        "filename": file.filename,
        "message": "Image processed successfully",
            }

@app.get("/calculate-combinations")
async def calculate_combinations(n: int, favoured_words: List[str] = Query(...)):
    calc = calculator(grid, favoured_words)
    calc.bestWord(n)
    return {
        "bestWord": calc.best,
        "targets": calc.target_words,
        "message": "everything calculated successfully"
    }
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
