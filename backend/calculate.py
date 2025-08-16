import google.generativeai as genai# need to import the google vector embeddings API
from google.genai import types
import numpy as np
import gensim.downloader as api

class calculator:
    def __init__(self, grid):
        self.grid = grid
        self.model = api.load('glove-wiki-gigaword-100')
        self.best = None
        self.vector_grid = []
        self.combinations = []
        self.favoured_words = []
        self.target_words = []
        self.words = []
        for row in self.grid:
            for word in row:
                self.words.append(word)
        self.get_favoured_words()
    
    # def get_favoured_words(self):
    #     self.favoured_words = ['BOMB', 'BELL', 'COCONUT', 'PEGASUS', 'GHOST']  # example words to be used in the calculation

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
        res = []
        curr = []
        self.backtrack(n, self.favoured_words, res, curr, 0)
        self.combinations = res
        print(self.combinations)
        return

    def get_median(self, chosen_words):
        vectors = []
        for word in chosen_words:
            if word.lower() in self.model:
                vectors.append(self.model[word.lower()])
            else:
                print(f"⚠️ '{word}' not in vocabulary")
                return None, -1
        closest = np.mean(vectors, axis=0)
        candidates  = self.model.similar_by_vector(closest, topn=(1 + len(self.words))) # note that we want to have just enough to make sure we get a word that is not in the list

        for candidate in candidates:
            if candidate[0].upper() not in self.words:
                candidates[0] = candidate
                break
        return candidates[0]

    def bestWord(self, n = 3):
        self.get_combinations(n)
        max = -1
        for chosen_words in self.combinations:
            print(chosen_words)
            res = self.get_median(chosen_words)
            if (res[1] > max):
                max = res[1]
                self.best = res[0]
                self.target_words = chosen_words

        print(self.best, self.target_words)
        return (self.best, self.target_words)