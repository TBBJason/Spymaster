import google.generativeai as genai# need to import the google vector embeddings API
from google.genai import types

class calculator:
    def __init__(self, APIkey): #extractor, APIkey):
        # self.extractor = extractor
        self.grid =  [['SNORKEL', 'PIANO', 'GRACE', 'SATELLITE', 'BARK'],
                        ['BRUSH', 'GENIUS', 'ROME', 'THUMB', 'CHAINSAW'],
                        ['ARMSTRONG', 'GRAVITY', 'SUB', 'SATURN', 'SUBMARINE'],
                        ['CYCLOPS', 'CASINO', 'TICK', 'EGYPT', 'CHAIR'],
                        ['BOMB', 'BELL', 'COCONUT', 'PEGASUS', 'GHOST']]   # extractor.grid 
        self.APIkey = APIkey
        genai.configure(api_key=self.APIkey)  # Initialize the gemini API with the API key
        self.best_words = []
        self.vector_grid = []
    def vectorize_grid(self):
        for row in self.grid:
            vector_row =[]
            for word in row:
                result = genai.embed_content(
                    model="models/embedding-001",
                    content=word,
                    config=types.EmbedContentConfig(output_dimensionality=768),  # Specify the dimensionality of the embedding (makes it smaller than the default 3072 for efficiency)
                    task_type="retrieval_document"
                    )
                vector_row.append(result['embedding'])
            self.vector_grid.append(vector_row)
        return self
    def print_vector_grid(self):
        for row in self.vector_grid:
            print(row)
            
    def calculate(self, words):
        res = [""] * words


        
        return []

