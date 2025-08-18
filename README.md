# Spymaster

## FastAPI + google-cloud-vision + gensim 

### Setup
- create a .env
- create a google-cloud-vision api key, add it to the project
- install the dependecies either in the backend folder

### Usage
- take a screenshot of your spymaster grid, focus on just the grid itself with all the words. Ensure that there are no extra words that could be read by the OCR.
- click on the combination of blue/red/black cards and adjust the number of words that you want to connect with a specific word.
- submit the calculation, the output will show the best word and how similar it is to the target words. 
- the calculation is based on all the possible combinations, and takes the best average of all of them.
- blame your team if you can't win now

### gensim
- Since gensim needs scipy, make sure that your current python version is also compatible with scipy

