import os
import json
import base64
from typing import List

from fastapi import FastAPI, UploadFile, File, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Google client libs
from google.oauth2 import service_account
from google.cloud import vision

# Import your custom modules
from extract_texts import extract_text_from_image
from calculate import calculator


load_dotenv()  

app = FastAPI()

# --- CORS: use env var FRONTEND_ORIGINS (comma-separated), fallback to localhost for dev
origins=[
    "https://spymaster.vercel.app",
    "https://spymaster-8iyflyal3-jasons-projects-a8048af0.vercel.app",
    "https://localhost:8000"
  ],  

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Load GCP service account from base64 env var
b64 = os.environ.get("GCP_SA_KEY_B64")
if b64:
    # Production (Render) - use base64 env var
    try:
        sa_info = json.loads(base64.b64decode(b64).decode("utf-8"))
    except Exception as e:
        raise RuntimeError("Failed to decode/parse GCP_SA_KEY_B64") from e
elif os.path.exists("gcp_key.json"):
    # Development - use local file
    try:
        with open("gcp_key.json", "r") as f:
            sa_info = json.load(f)
    except Exception as e:
        raise RuntimeError("Failed to load local gcp_key.json") from e
else:
    raise RuntimeError(
        "GCP credentials not found. "
        "Either set GCP_SA_KEY_B64 env var or place gcp_key.json in the project directory."
    )

# create credentials and a vision client (use this client in your extractor)
credentials = service_account.Credentials.from_service_account_info(sa_info)
vision_client = vision.ImageAnnotatorClient(credentials=credentials)

text_extractor = extract_text_from_image(client=vision_client)
calc = calculator(text_extractor)

@app.get("/")
async def root():
    return {"message": "Welcome to the Spymaster API!"}

@app.post("/process-image")
async def upload_image(file: UploadFile = File(...)):
    # read bytes
    try:
        image_bytes = await file.read()
        # call your extractor - assume it populates text_extractor.grid
        text_extractor.extract(image_bytes)
        if not getattr(text_extractor, "grid", None):
            raise HTTPException(status_code=500, detail="No grid detected in image")
        # update calculator
        calc.grid = text_extractor.grid
        # return a sanitized response
        return {
            "size": "{}x{}".format(len(text_extractor.grid), len(text_extractor.grid[0]) if text_extractor.grid else 0),
            "grid": text_extractor.grid,
            "filename": file.filename,
            "message": "Image processed successfully",
        }
    except Exception as e:
        # log error to stdout/stderr (Render will capture logs)
        raise HTTPException(status_code=500, detail=f"Image processing failed: {e}")

@app.get("/calculate-combinations")
async def calculate_combinations(n: int, favoured_words: List[str] = Query(...)):
    try:
        calc.favoured_words = [word.strip().lower() for word in favoured_words]
        calc.bestWord(n)
        return {
            "bestWord": calc.best,
            "targets": calc.target_words,
            "combinations": calc.combinations,
            "similarities": calc.target_words_similarity,
            "message": "Everything calculated successfully",
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Calculation failed: {e}")
    
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "Server is running"}


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)

