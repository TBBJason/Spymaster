from google.cloud import vision
import  io # image handling and file operations

client = vision.ImageAnnotatorClient.from_service_account_file('gcp_key.json')
# print("Client created successfully.")

image_path = 'spymasterGridDiscord.png'

with io.open(image_path, 'rb') as image_file:
    content = image_file.read() # this reads the image file in binary mode

image = vision.Image(content=content) 

response = client.text_detection(image=image) # this sends the image to the Vision API for text detection
texts = response.text_annotations # this extracts the detected texts from the response
# print(texts)
grid = [] # list to hold all the texts in a grid format
curr = []
for text in texts[1:]:
    curr.append(text.description)
    if (len(curr) == 5):
        grid.append(curr)
        curr = []

print(grid)