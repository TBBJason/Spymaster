import google.generativeai as genai
from google.genai import types
import numpy as np
import gensim.downloader as api
import logging

class calculator:
    def __init__(self, extractor):
        self.extractor = extractor
        self.grid = extractor.grid
        self.model = api.load('glove-wiki-gigaword-100')
        self.best = None
        self.vector_grid = []
        self.combinations = []
        self.favoured_words = None
        self.target_words = []
        self.target_words_similarity = []

    def backtrack(self, n, words, res, curr, idx):
        if curr is None:
            pass
        elif len(curr) == n:
            res.append(curr[:])
            return
        for i in range(idx, len(words)):
            curr.append(words[i])
            self.backtrack(n, words, res, curr, i + 1)
            curr.pop() 

    def get_combinations(self, n):
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
                return None, -1.0  # Use native float
        
        if not vectors:
            return None, -1.0
            
        closest = np.mean(vectors, axis=0)
        candidates = self.model.similar_by_vector(closest, topn=100)
        
        current_grid_words = set()
        for row in self.grid:
            for word in row:
                current_grid_words.add(word.strip().lower())
        
        for candidate in candidates:
            word = candidate[0].strip().lower()
            if word not in current_grid_words:
                return candidate[0], float(candidate[1])
                
        return (candidates[0][0], float(candidates[0][1])) if candidates else (None, -1.0)

    def bestWord(self, n):
        self.get_combinations(n)
        max_sim = -1.0
        self.target_words_similarity = []
        
        for chosen_words in self.combinations:
            word, sim = self.get_median(chosen_words)
            if sim > max_sim:
                max_sim = sim
                self.best = word
                self.target_words = chosen_words
                
                target_words_similarity = []
                for target in chosen_words:
                    try:
                        similarity = float(self.model.similarity(word, target))
                        target_words_similarity.append(similarity)
                    except KeyError:
                        target_words_similarity.append(-1.0)
                self.target_words_similarity = target_words_similarity
        # print (self.target_words_similarity)
        # print (self.grid)