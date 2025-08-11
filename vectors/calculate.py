# if i wanted to calculate the vector embeddings of this grid, would I need to include it inside the class?
# For example, if I need to call upon a gemini API to calculate the embeddings, would I initialize it inside the class?
# Or would it be initialized outside and passed as an argument to the class?

# need to import the google vector embeddings API
class calculator:
    def __init__(self, extractor, APIkey):
        self.extractor = extractor
        self.grid = extractor.grid 
        self.vectorEmbedding = None   #initialize the gemini API with the API key
        self.best_words = []
    def vectorize_grid(self):
        self.vectors = [] # represented as a list of lists? or depends on the API
        # Use the extractor to get the grid
        # For each word in the grid, calculate its vector embedding using the gemini API
        # Store the best words based on some criteria (e.g., highest similarity scores)
        pass

    def calculate(self, words):
        # use the vectors to calculate the best words to respond
        # compare vectors using cosine similarity
        #calculate the best words to respond, where words is the number of words to respond
        return []

