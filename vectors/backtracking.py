import numpy as np
from gensim.models import keyedvectors

words = ['apple', 'banana', 'cherry', 'date', 'elderberry']
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


test = test_func(words, n)
print (len(test))
