# Data Processing
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
# import cleaning functions
from cleanIng import cleaning 
from label import label
# Modelling
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import multilabel_confusion_matrix, accuracy_score, confusion_matrix, average_precision_score, recall_score, ConfusionMatrixDisplay, classification_report
from sklearn.model_selection import RandomizedSearchCV, train_test_split
from scipy.stats import randint
from sklearn.preprocessing import label_binarize

# clean ingredients and label ingredients
cleaning()
label()
data = pd.read_csv("cosmetics.csv")

# format ingredients again just in case
data["Ingredients"] = data["Ingredients"].str.replace("[*()\s.+-]", "", regex=True)
data["Ingredients"] = data["Ingredients"].str.lower()

# One-Hot Encoding
ingredients_dummies=data["Ingredients"].str.get_dummies(',')
encoded_columns = ingredients_dummies.columns.tolist()

# Drop the columns that are not labels
columns_to_drop = ["Label", "Ingredients", "Brand", "Name", "Price", "Rank"]
y = data.drop(columns=columns_to_drop, axis=1)
y = y.to_numpy()

# Split the data into training and test sets 20% for testing
X = ingredients_dummies
x_train, x_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train the model
rf = RandomForestClassifier()
trainedModel = rf.fit(x_train, y_train)

def getCols():
    return x_train.columns


# test the model ( Plans for future )
#y_pred = rf.predict(x_test)
#print(y_pred)
#tn = 0
#tp = 0
#fn = 0
#fp = 0
# for combination skin
# for dry skin
# for normal skin
# for oily skin
# for sensitive skin

# check acne
# check age
# check bright
# check bh
# check red
# check tex
# check barrier
# check hyper'''