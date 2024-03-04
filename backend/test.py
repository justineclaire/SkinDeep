import sys
import numpy as np
import pandas as pd
# from train import trainedModel
from train import encoded_columns
from cleanUser import cleanUser
from train import getCols
import joblib
'''Predicts skin concerns based on user inputted ingredients'''

ingredients = "glycerin, retinol, niacinamide, hyaluronic, ascorbic, seaweed, aloe, dimethicone, fragrance, alcohol denat, lactic, salicylic, glycolic, malic, citric, yeast, camellia, sesame, witch, willow, cucumber, watermelon, almond, avocado, mandelic, damascena, eucalyptus"
# clean user input
ingredients = ingredients.lower()
ings = ingredients.split(",")
print("boutta clean ings")
ings = cleanUser(ings)
print("we cleaned ings")

# Load model using joblib
model_joblib = joblib.load('model.joblib')

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

print("before predict")
# predict
pred = model_joblib.predict(input_df)

# send data back to node
print(pred)
# sys.stdout.flush()


