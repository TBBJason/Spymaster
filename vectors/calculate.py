# if i wanted to calculate the vector embeddings of this grid, would I need to include it inside the class?
# For example, if I need to call upon a gemini API to calculate the embeddings, would I initialize it inside the class?
# Or would it be initialized outside and passed as an argument to the class?


class calculator:
    def __init__(self, grid):
        self.grid = grid
    def calculate(self):
