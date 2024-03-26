import sys
import subprocess

print("we inside man")
sys.stdout.flush()

def install(package):
    print("Installing package: " + package)
    sys.stdout.flush()
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    import numpy as np
except ModuleNotFoundError:
    install('numpy')

try:
    import pandas as pd
except ModuleNotFoundError:
    install('pandas')


from cleanUser import cleanUser
import joblib
'''Predicts skin concerns based on user inputted ingredients'''

ingredients = sys.argv[1]

print(ingredients + " is the ingredients in python")
sys.stdout.flush()

# clean user input
ingredients = ingredients.lower()
ings = ingredients.split(",")
ings = cleanUser(ings)

# Load model using joblib
model_joblib = joblib.load('model.joblib')

print("we loaded uri model")
sys.stdout.flush()
# encode user input based on training data list of ingredients
input = np.array([], dtype=int)

# format ingredients again just in case and get column headings
data = pd.read_csv("cosmetics_mod.csv")
data["Ingredients"] = data["Ingredients"].str.replace("[*()\s.+-]", "", regex=True)
data["Ingredients"] = data["Ingredients"].str.lower()

# One-Hot Encoding
ingredients_dummies=data["Ingredients"].str.get_dummies(',')
encoded_columns = ingredients_dummies.columns.tolist()
for ing in encoded_columns:
    if ing in ings:
        input = np.append(input, 1)
    else:
        input = np.append(input, 0)

input = np.array([input])

# get columns from training data

cols = encoded_columns
input_df = pd.DataFrame(input, columns=cols)

# predict
pred = model_joblib.predict(input_df)

# send data back to node
print(pred)
sys.stdout.flush()


