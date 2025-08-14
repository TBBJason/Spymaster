import google.generativeai as genai# need to import the google vector embeddings API
from google.genai import types
import numpy as np
import gensim.downloader as api

class calculator:
    def __init__(self, APIkey): #extractor, APIkey):
        # self.extractor = extractor
        self.model = api.load('glove-wiki-gigaword-100')
        self.grid =  [['SNORKEL', 'PIANO', 'GRACE', 'SATELLITE', 'BARK'],
                        ['BRUSH', 'GENIUS', 'ROME', 'THUMB', 'CHAINSAW'],
                        ['ARMSTRONG', 'GRAVITY', 'SUB', 'SATURN', 'SUBMARINE'],
                        ['CYCLOPS', 'CASINO', 'TICK', 'EGYPT', 'CHAIR'],
                        ['BOMB', 'BELL', 'COCONUT', 'PEGASUS', 'GHOST']]   # extractor.grid 
        self.APIkey = APIkey
        genai.configure(api_key=self.APIkey)  # Initialize the gemini API with the API key
        self.best_word = None
        self.vector_grid = []
        self.words = []
        for row in self.grid:
            for word in row:
                self.words.append(word)

    def backtrack(self, n, words, res, curr, idx):
        if (curr is None):
            pass
        elif (len(curr) == n):
            res.append(curr)
            return
        for i in range (idx, len(words)):
            self.backtrack(n, words, res, curr + [words[i]], i + 1)

    def test_func(self, words, n):
        res = []
        curr = []
        self.backtrack(n, words, res, curr, 0)
        return res
    def get_median(self, favoured_words):
        vectors = [self.model[word] for word in favoured_words]
        closest = np.mean(vectors, axis=0)
        candidates  = self.model.similar_by_vector(closest, topn=(1 + len(favoured_words))) # note that we want to have just enough to make sure we get a word that is not in the list

        for candidate in candidates:
            if candidate[0] not in self.words:
                candidates[0] = candidate
                break
        self.best_word = candidates[0]

    def bestword(self, test):
        max = -1
        best = None
        for chosen_words in test:
            res = self.get_median(chosen_words)
            print (chosen_words)
            print(res)
            if (res[1] > max):
                max = res[1]
                best = res[0]
        return (best, chosen_words)

    def print_vector_grid(self):
        for row in self.vector_grid:
            print(row)
            
    def calculate(self, words):
        res = [""] * words
        
        return []

