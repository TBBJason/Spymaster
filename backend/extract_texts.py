from google.cloud import vision
import os
import  io # image handling and file operations
from calculate import calculator    
from dotenv import load_dotenv, dotenv_values

class extract_text_from_image:
    def __init__ (self, image_path, APIkey):
        self.client = vision.ImageAnnotatorClient.from_service_account_file(APIkey)
        self.image_path = image_path
        self.grid = []

    def extract(self):
        with io.open(self.image_path, 'rb') as image_file:
            self.content = image_file.read() # this reads the image file in binary mode
        image = vision.Image(content=self.content) # this creates an Image object with the content
        self.response = self.client.text_detection(image=image)
        return self.response
        
    def formulate_grid(self):
        self.extract()  # Ensure the image content is extracted before processing
        self.content
        curr = []
        texts = self.response.text_annotations
        for text in texts[1:]:
            curr.append(text.description)
            if (len(curr) == 5):
                self.grid.append(curr)
                curr = []
        return self
    
    def print_grid(self):
        for row in self.grid:
            print(row)


