import pandas as pd
import numpy as np
from label import acneIng, wrinklesIng, brightIng, bhIng, hyperIng, redIng, texIng, acneAvoid, barrier, dryAvoid, sensIng, sensAvoid, normAvoid, combiIng

data = pd.read_csv("cosmetics_mod.csv")

'''This file is used to filter through the ingredients to create an 
    ingredients csv and join file to populate my database (will manually type descriptions)'''

ing_list = acneIng + wrinklesIng + brightIng + bhIng + hyperIng + redIng + texIng + acneAvoid + barrier + dryAvoid + sensIng + sensAvoid + normAvoid + combiIng
ing_list = np.unique(ing_list)
cols = ["id", "name", "info"]
ing_df = pd.DataFrame(columns=cols)
cols = ["productid", "ingid"]
prod_ing = pd.DataFrame(columns=cols)
print(len(ing_list))
print(data.loc[1, "Name"])

for i in range(len(data)):
    for ing in ing_list:
        if ing in data.loc[i, "Ingredients"].lower():
            if ing not in ing_df["name"].values:
                new = {"id": len(ing_df), "name": ing, "info": "this"}
                prod_ing.loc[len(prod_ing)] = [i+1, new['id']]
                ing_df.loc[len(ing_df)] = new
            else:
                prod_ing.loc[len(prod_ing)] = [i+1, ing_df.loc[ing_df["name"] == ing].id.values[0]]
                # test
                # print("product: ", i+1, data.loc[i, "Name"])

ing_df.to_csv("ingredients.csv", index=False)
prod_ing.to_csv("product_ingredients.csv", index=False)