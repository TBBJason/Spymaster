from google.cloud import vision
import os
import  io # image handling and file operations
from .calculate import calculator    


class extract_text_from_image:
    def __init__ (self, client):
        # self.client = vision.ImageAnnotatorClient.from_service_account_file(APIkey)
        self.client = client
        self.grid = []

    def extract(self, image_bytes: bytes) -> list:
        # with io.open(self.image_path, 'rb') as image_file:
        #     self.content = image_file.read() # this reads the image file in binary mode
        image = vision.Image(content=image_bytes) # this creates an Image object with the content
        response = self.client.text_detection(image=image)
        self._formulate_grid(response)
        return self.grid
        
    def _formulate_grid(self, response):
        curr = []
        curr_grid = []
        texts = response.text_annotations
        for text in texts[1:]:
            curr.append(text.description)
            if (len(curr) == 5):
                curr_grid.append(curr)
                curr = []
        self.grid = curr_grid # doing this so that it doesn't accumulate everytime we upload an image
        return 


