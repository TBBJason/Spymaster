import uvicorn
from extract_texts import extract_text_from_image
from fastapi import FastAPI, UploadFile, File, Query
from calculate import calculator    
import os, json, base64
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv, dotenv_values
from typing import List 
from google.oauth2 import service_account

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

b64 = os.environ.get("GCP_SA_KEY_B64")
if not b64:
    raise RuntimeError("GCP_SA_KEY_B64 not set")
sa_info = json.loads(base64.b64decode(b64).decode("utf-8"))
APIKey = service_account.Credentials.from_service_account_info(sa_info)
# APIKey = os.getenv("GOOGLE_VISION_API_KEY")
text_extractor = extract_text_from_image(APIkey=APIKey)
calc = calculator(text_extractor)

@app.get("/")
async def root():
    return {"message": "Welcome to the Spymaster API!"}

@app.post("/process-image")
async def upload_image(file: UploadFile = File(...)):
    image_bytes = await file.read()
    text_extractor.extract(image_bytes)
    print(text_extractor.grid)
    calc.grid = text_extractor.grid
    del image_bytes
    return {
        "size" : "{}x{}".format(len(text_extractor.grid), len(text_extractor.grid[0]) if text_extractor.grid else 0),
        "grid": text_extractor.grid,
        "filename": file.filename,
        "message": "Image processed successfully",
            }

@app.get("/calculate-combinations")
async def calculate_combinations(n: int, favoured_words: List[str] = Query(...)):
    calc.favoured_words = [word.strip().lower() for word in favoured_words]
    calc.bestWord(n)
    print(calc.target_words_similarity)
    return {
        "bestWord": calc.best,
        "targets": calc.target_words,
        "combinations": calc.combinations,
        "similarities": calc.target_words_similarity, 
        "message": "everything calculated successfully"
    }
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
