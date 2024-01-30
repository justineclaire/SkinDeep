import sys
import numpy as np
import pandas as pd
from train import trainedModel
from train import encoded_columns
from cleanUser import cleanUser
from train import getCols

'''Predicts skin concerns based on user inputted ingredients'''

ingredients = sys.argv[1]
# clean user input
ingredients = ingredients.lower()
ings = ingredients.split(",")
ings = cleanUser(ings)

# encode user input based on training data list of ingredients
input = np.array([], dtype=int)
for ing in encoded_columns:
    if ing in ings:
        input = np.append(input, 1)
    else:
        input = np.append(input, 0)

input = np.array([input])

# get columns from training data
cols = getCols()
input_df = pd.DataFrame(input, columns=cols)

# predict
pred = trainedModel.predict(input_df)

# send data back to node
print(pred)
sys.stdout.flush()


