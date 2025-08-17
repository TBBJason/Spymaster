import google.generativeai as genai# need to import the google vector embeddings API
from google.genai import types
import numpy as np
import gensim.downloader as api
import logging

class calculator:
    def __init__(self, extractor):
        self.extractor = extractor
        self.grid =  extractor.grid
        self.model = api.load('glove-wiki-gigaword-100')
        self.best = None
        self.vector_grid = []
        self.combinations = []
        self.favoured_words = None
        self.target_words = []


    def backtrack(self, n, words, res, curr, idx):
        if (curr is None):
            pass
        elif (len(curr) == n):
            res.append(curr[:])
            return
        for i in range (idx, len(words)):
            curr.append(words[i])
            self.backtrack(n, words, res, curr, i + 1)
            curr.pop() 

    def get_combinations(self, n):
        # if not self.favoured_words:
        #     logger.warning("No favoured words provided, using all words in the grid.")
        res = []
        curr = []
        self.backtrack(n, self.favoured_words, res, curr, 0)
        self.combinations = res
        return

    def get_median(self, chosen_words):
        vectors = []
        for word in chosen_words:
            if word.strip().lower() in self.model:
                vectors.append(self.model[word.lower()])
            else:
                print(f"⚠️ '{word}' not in vocabulary")
                return None, -1
        closest = np.mean(vectors, axis=0)
        candidates  = self.model.similar_by_vector(closest, topn=(100)) # note that we want to have just enough to make sure we get a word that is not in the list
        current_grid_words = set()
        for row in self.grid:
            for word in row:
                current_grid_words.add(word.strip().lower())        

        for candidate in candidates:
            word = candidate[0].strip().lower()
            if word not in current_grid_words:
                return candidate
                
        return candidates[0] if candidates else (None, -1)

    def bestWord(self, n):
        self.get_combinations(n)
        max = -1
        for chosen_words in self.combinations:
            res = self.get_median(chosen_words)
            if (res[1] > max):
                max = res[1]
                self.best = res[0]
                self.target_words = chosen_words
            

