import google.generativeai as genai# need to import the google vector embeddings API
class calculator:
    def __init__(self, APIkey): #extractor, APIkey):
        # self.extractor = extractor
        self.grid =  [['SNORKEL', 'PIANO', 'GRACE', 'SATELLITE', 'BARK'],
                        ['BRUSH', 'GENIUS', 'ROME', 'THUMB', 'CHAINSAW'],
                        ['ARMSTRONG', 'GRAVITY', 'SUB', 'SATURN', 'SUBMARINE'],
                        ['CYCLOPS', 'CASINO', 'TICK', 'EGYPT', 'CHAIR'],
                        ['BOMB', 'BELL', 'COCONUT', 'PEGASUS', 'GHOST']]   # extractor.grid 
        self.APIkey = APIkey
        print(APIkey)
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
                    task_type="retrieval_document"
                    )
                vector_row.append(result['embedding'])
            self.vector_grid.append(vector_row)
        return self
    def print_vector_grid(self):
        for row in self.vector_grid:
            print(row)
            
    def calculate(self, words):
        # use the vectors to calculate the best words to respond
        # compare vectors using cosine similarity
        #calculate the best words to respond, where words is the number of words to respond

        return []

