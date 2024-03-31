# Data Processing
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
# import cleaning functions
from cleanIng import cleaning 
from label import label
# Modelling
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

# clean ingredients and label ingredients
cleaning()
label()
data = pd.read_csv("cosmetics_mod.csv")

# format ingredients again just in case
data["Ingredients"] = data["Ingredients"].str.replace("[*()\s.+-]", "", regex=True)
data["Ingredients"] = data["Ingredients"].str.lower()

# One-Hot Encoding
ingredients_dummies=data["Ingredients"].str.get_dummies(',')
encoded_columns = ingredients_dummies.columns.tolist()

ingtest = pd.DataFrame(ingredients_dummies, columns=encoded_columns)
ingtest.to_csv('ingredients.csv', index=False)

# Drop the columns that are not labels
columns_to_drop = ["Label", "Ingredients", "Brand", "Name", "Price", "Rank"]
y = data.drop(columns=columns_to_drop, axis=1)
y = y.to_numpy()

# Split the data into training and test sets 20% for testing
X = ingredients_dummies
x_train, x_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train the model
rf = RandomForestClassifier(max_depth=2, n_estimators=30,
    min_samples_split=3, max_leaf_nodes=5,
    random_state=22)
trainedModel = rf.fit(x_train, y_train)

def getCols():
    return x_train.columns

pred_data = []
real_data = []
# test the model 
for i in range(len(y_test)):
    pred = trainedModel.predict(x_test)
    pred_data.append(pred[i])
    real_data.append(y_test[i])

header = ["Combination", "Dry", "Normal", "Oily", "Sensitive", "acne", "age", "bright", "bh", "red", "tex", "barrier", "hyper"]

# add real test data and predictions to csv files
real_data = pd.DataFrame(real_data, columns=header)
real_data.to_csv('test_real.csv', index=False)

pred_data = pd.DataFrame(pred_data, columns=header)
pred_data.to_csv('test_pred.csv', index=False)

df_pred = pd.read_csv("test_pred.csv")
df_real = pd.read_csv("test_real.csv")

correct = 0
false = 0
spec = [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]]

# check and print the accuracy of the model
for i in range(len(pred_data)):
    for j in range(len(header)):
        if df_pred.iloc[i][j] == df_real.iloc[i][j]:
            correct += 1
            spec[j][0] += 1
            # print(df_pred.iloc[i][j], df_real.iloc[i][j])
        else:
            false += 1
            spec[j][1] += 1
    
print("Correct: ", correct)
print("False: ", false)
print("Accuracy: ", (correct/(correct+false))*100, "% \n")
for i in range(len(header)):
    print(header[i], ": ", (spec[i][0]/(spec[i][0]+spec[i][1]))*100, "%")

# Save model using joblib
joblib.dump(trainedModel, 'model.joblib')