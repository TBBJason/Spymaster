import numpy as np
# from gensim.models import keyedvectors
import gensim.downloader as api

# file_path = api.load('word2vec-google-news-300', return_path=True)

# model = keyedvectors.load_word2vec_format(file_path, binary=True)

model = api.load('glove-wiki-gigaword-100')
print("Loaded glove-wiki-gigaword-100 model")

favoured_words = ['apple', 'car', 'airplane', 'police', 'bus']
n = 3
def test_func(words, n):
    res = []
    curr = []
    backtrack(n, words, res, curr, 0)
    return res
def backtrack(n, words, res, curr, idx):
    if (curr is None):
        pass
    elif (len(curr) == n):
        res.append(curr)
        return
    for i in range (idx, len(words)):
        backtrack(n, words, res, curr + [words[i]], i + 1)

def get_median(lst):
    vectors = [model[word] for word in lst]
    closest = np.mean(vectors, axis=0)
    candidates  = model.similar_by_vector(closest, topn=(1 + len(favoured_words))) # note that we want to have just enough to make sure we get a word that is not in the list

    for candidate in candidates:
        if candidate[0] not in lst:
            candidates[0] = candidate
            break
    return candidates[0]


test = test_func(favoured_words, n)
print (len(test)) # should be len(words) choose n

def bestword(test):
    max = -1
    best = None
    for words in test:
        res = get_median(words)
        print (words)
        print(res)
        if (res[1] > max):
            max = res[1]
            best = res[0]
    return (best, words)

print(bestword(test=test))  # should be the best word from the combinations


