# import uvicorn
from extract_texts import extract_text_from_image
from calculate import calculator    


if __name__ == "__main__":
    # logic for extracting text from an image and calculating vectors
    # APIkey = 'gcp_key.json'
    # image_path = 'spymasterGridDiscord.png'
    # extractor = extract_text_from_image(image_path=image_path, APIkey=APIkey).formulate_grid()
    # extractor.print_grid()


    test = calculator()
    test.bestWord(3)
