import uvicorn
from extract_texts import extract_text_from_image
from calculate import calculator    
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

if __name__ == "__main__":
    # logic for extracting text from an image and calculating vectors
    # APIkey = 'gcp_key.json'
    # image_path = 'spymasterGridDiscord.png'
    # extractor = extract_text_from_image(image_path=image_path, APIkey=APIkey).formulate_grid()
    # extractor.print_grid()
    origins = [
        "http://localhost:3000",
    ]
    app = FastAPI()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins, 
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )   
    test = calculator()
    test.bestWord(3)
