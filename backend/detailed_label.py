import pandas as pd

''' Label cosmetics.csv with label encoded tags based on ingredients'''
data = pd.read_csv("cosmetics_mod.csv")

acneIng = ["witch", "salicylic", "avocado", "amoxicillin", "azelaic", "niacinamide", "alpha-hydroxy acid", "apple cider vinegar", "benzoyl peroxide", "cumin", "bentonite", "cannabidiol", "citric", "lactic", "malic", "retinol", "retinal", "retinyl", "salicylic", "hydrogen peroxide", "hemp", "cortisone", "honey", "kaolin", "magnesium", "mandelic", "zinc", "propolis", "lactococcus", "centella asiatica", "sulfur", "succinic", "tretinoin", "turmeric", "damascena", "beeswax", "vitamin a"]
wrinklesIng = ["vitamin a", "arbutin", "bakuchiol", "ferulic", "vitc", "argireline", "glycolic", "citric", "lactic", "malic", "cumin", "caviar", "sodium hyaluronate", "retinol", "retinal", "retinyl", "peptide", "ceramide", "sphingosine", "hyaluronic", "glycerin", "mandelic", "squalane", "squalene", "matrixy", "centella asiatica", "sodium hyaluronate", "soy", "rosehip", "turmeric", "seaweed", "rubus"]
brightIng = ["amla", "arbutin", "azelaic", "ferulic", "vitc", "citric", "lactic", "malic", "cumin", "peptide", "q10", "grapeseedoil","grape", "vitis vinifera", "hydroquinone", "kojic", "licorice", "turmeric", "tranexamic acid"]
bhIng = ["witch", "azelaic", "alpha-hydroxy acid", "cumin", "salicylic","sulfur", "glycolic", "citric", "lactic", "tretinoin", "damascena"]
hyperIng = ["azelaic", "niacinamide", "apple cider vinegar", "grapeseedoil","vitis vinifera", "hydroquinone", "kojic", "propolis", "phytic", "aloe","glutathione", "tranexamic acid", "mandelic"]
redIng = ["aloe", "apricot kernel", "amino", "avocado", "almond", "argan", "niacinamide", "camellia", "resveratrol", "azulene", "borage", "cannabidiol", "q10", "glycerin", "grapeseedoil", "vitis vinifera", "cortisone", "honey", "marshmallow", "zinc", "centella asiatica", "snail mucin", "soy", "camellia oleifera", "cucumber", "watermelon", "beeswax"]
texIng = ["vitamin a", "allantoin", "aluminum dihydroxy allantoinate", "bakuchiol", "glycolic", "citric", "lactic", "malic", "retinol", "retinal", "retinyl", "salicylic", "lime pearl"]
acneAvoid = ["apricot kernel",  "vite", "tocopheryl", "eucalyptus","petroleum jelly", "dimethicone", "mineral", "paraffinum liquidum", "petrolatum", "cyclopentasiloxane"]
barrier = ["lactobacillus", "apricot kernel", "avocado", "astaxanthin", "resveratrol", "azulene", "beta-glucan", "ceramide", "sphingosine", "hyaluronic", "glycerin", "honey", "isododecane","lactococcus", "matrixy", "centella asiatica", "snail mucin", "soy", "rosehip", "oat", "panthenol", "pantothenic", "ethyl linoleate", "chia", "stearic", "marula", "cucumber", "barley", "hordeum vulgare", "sesame"]
dryAvoid = ["witch", "benzoic", "bentonite", "salicylic", "eucalyptus", "hemp", "kaolin", "damascena", "cyclopentasiloxane"," retinol", "retinal", "retinyl"]
sensIng = ["ceramide", "aloe", "glycerin", "ceramide", "capric triglyceride", "ceramide", "glycerin", "greentea", "oatmeal", "centella asiatica"]
sensAvoid = ["lactic", "glycolic", "ethanol", "parfum", "fragrance" "benzoyl peroxide", "citric", "salicylic", "retinol", "sulfate", "sulphate"]


def label():

  data["acne"] = 1 # pimples
  data["age"] = 1 # ageing
  data["bright"] = 1 # dullness
  data["bh"] = 1 # black heads
  data["red"] = 1 # redness
  data["tex"] = 1 # texture
  data["barrier"] = 1 # skin barrier restoring
  data["hyper"] = 1 #hyperpigmentation
  data["Dry"] = 1
  data["Oily"] = 1
  data["Combination"] = 1

  '''for i in range(len(data["Name"])):
    if "toner" in data.loc[i, "Name"].lower():
      data.loc[i, "Label"] = "Toner"
      print(data.loc[i, "Label"])'''

  for i in range(len(data["Label"])):
    ings = str(data.loc[i, "Ingredients"]).lower()

    for ing in sensAvoid:
      if ing.lower() in ings:
        data.loc[i, "Sensitive"] = 0
        data.loc[i, "Combination"] = 0 
        data.loc[i, "Dry"] = 0 

    for ing in sensIng:
      if ing.lower() in ings:
        data.loc[i, "Sensitive"] = 2

    for ing in wrinklesIng:
      if ing.lower() in ings:
        data.loc[i, "age"] = 2
        
    for ing in brightIng:
      if ing.lower() in ings:
        data.loc[i, "bright"] = 2
        
    for ing in bhIng:
      if ing.lower() in ings:
        data.loc[i, "bh"] = 2
        
    for ing in hyperIng:
      if ing.lower() in ings:
        data.loc[i, "hyper"] = 2
        
    for ing in redIng:
      if ing.lower() in ings:
        data.loc[i, "red"] = 2
        
    for ing in texIng:
      if ing.lower() in ings:
        data.loc[i, "tex"] = 2
        
    for ing in barrier:
      if ing.lower() in ings:
        data.loc[i, "barrier"] = 2
        data.loc[i, "Dry"] = 2
        
    for ing in dryAvoid:
      if ing.lower() in ings:
        data.loc[i, "barrier"] = 0
        data.loc[i, "Dry"] = 0
        
    for ing in acneIng:
      if ing.lower() in ings:
        data.loc[i, "acne"] = 2
        data.loc[i, "Oily"] = 2
        
    for ing in acneAvoid:
      if ing.lower() in ings:
        data.loc[i, "acne"] = 0
        data.loc[i, "Oily"] = 0

  # wrtite to csv and json
  data.to_csv('cosmetics_mod.csv', index=False)
