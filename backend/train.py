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
# cleaning()
# label()
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
header = { "combination": 0 , "dry": 0, "normal": 0, "oily": 0, "sensitive": 0, "acne": 0, "age": 0, "bright": 0, "bh": 0, "red": 0, "tex": 0, "barrier": 0, "hyper": 0}
# check and print the accuracy of the model
for i in range(len(pred_data)):
    for j in range(len(header)):
        if df_pred.iloc[i][j] == df_real.iloc[i][j]:
            correct += 1
           
            # print(df_pred.iloc[i][j], df_real.iloc[i][j])
        else:
            false += 1
    
print("Correct: ", correct)
print("False: ", false)
print("Accuracy: ", (correct/(correct+false))*100, "%")
