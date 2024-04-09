import pandas as pd

''' Label cosmetics.csv with label encoded tags based on ingredients'''
data = pd.read_csv("cosmetics_mod.csv")

acneIng = ["witch", "AVOCADO", "AMOXICILLIN", "AZELAIC", "Niacinamide", "alpha-hydroxy acid", "APPLE CIDER VINEGAR", "BENZOYL PEROXIDE", "CUMIN", "BENTONITE", "Cannabidiol", "citric", "lactic", "malic", "retinol", "retinal", "retinyl", "salicylic", "HYDROGEN PEROXIDE", "HEMP", "CORTISONE", "HONEY", "KAOLIN", "MAGNESIUM", "MANDELIC", "ZINC", "PROPOLIS", "LACTOCOCCUS", "Centella Asiatica", "SULFUR", "SUCCINIC", "TRETINOIN", "TURMERIC", "Damascena", "Beeswax", "vitamin a"]
wrinklesIng = ["vitamin a", "ARBUTIN", "Bakuchiol", "Ferulic", "vitc", "ARGIRELINE", "glycolic", "citric", "lactic", "malic", "CUMIN", "caviar", "Sodium Hyaluronate", "retinol", "retinal", "retinyl", "peptide", "ceramide", "sphingosine", "hyaluronic", "GLYCERIN", "MANDELIC", "squalane", "squalene", "Matrixy", "Centella Asiatica", "SODIUM HYALURONATE", "soy", "ROSEHIP", "TURMERIC", "seaweed", "rubus"]
brightIng = ["Amla", "ARBUTIN", "AZELAIC", "Ferulic", "vitc", "citric", "lactic", "malic", "CUMIN", "peptide", "Q10", "grapeseedoil","grape", "Vitis Vinifera", "HYDROQUINONE", "KOJIC", "LICORICE", "TURMERIC", "Tranexamic acid"]
bhIng = ["witch", "AZELAIC", "alpha-hydroxy acid", "CUMIN", "salicylic","SULFUR", "glycolic", "citric", "lactic", "TRETINOIN", "Damascena"]
hyperIng = ["AZELAIC", "Niacinamide", "APPLE CIDER VINEGAR", "grapeseedoil","Vitis Vinifera", "HYDROQUINONE", "KOJIC", "PROPOLIS", "Phytic", "aloe","Glutathione", "Tranexamic acid", "mandelic"]
redIng = ["Aloe", "Apricot Kernel", "AMINO", "AVOCADO", "ALMOND", "ARGAN", "Niacinamide", "Camellia", "Resveratrol", "AZULENE", "BORAGE", "Cannabidiol", "Q10", "GLYCERIN", "grapeseedoil", "Vitis Vinifera", "CORTISONE", "HONEY", "MARSHMALLOW", "ZINC", "Centella Asiatica", "SNAIL MUCIN", "soy", "CAMELLIA OLEIFERA", "cucumber", "watermelon", "Beeswax"]
texIng = ["vitamin a", "ALLANTOIN", "aluminum dihydroxy allantoinate", "Bakuchiol", "glycolic", "citric", "lactic", "malic", "retinol", "retinal", "retinyl", "salicylic", "lime pearl"]
acneAvoid = ["Apricot Kernel", "alcohol denat", "Vitamin E", "tocopheryl", "EUCALYPTUS","PETROLEUM JELLY", "dimethicone", "mineral", "Paraffinum Liquidum", "petrolatum", "Cyclopentasiloxane"]
barrier = ["lactobacillus", "Apricot Kernel", "AVOCADO", "ASTAXANTHIN", "Resveratrol", "AZULENE", "BETA-GLUCAN", "ceramide", "sphingosine", "hyaluronic", "GLYCERIN", "HONEY", "ISODODECANE","LACTOCOCCUS", "Matrixy", "Centella Asiatica", "SNAIL MUCIN", "soy", "ROSEHIP", "oat", "Panthenol", "pantothenic", "Ethyl Linoleate", "chia", "stearic", "marula", "cucumber", "barley", "Hordeum Vulgare", "sesame"]
dryAvoid = ["witch","alcohol denat", "alpha-hydroxy acid", "APPLE CIDER VINEGAR", "acetic", "BENTONITE", "salicylic", "EUCALYPTUS", "HEMP", "KAOLIN", "Damascena", "Cyclopentasiloxane"]


def label():

  data["acne"] = 1 # pimples
  data["age"] = 1 # ageing
  data["bright"] = 1 # dullness
  data["bh"] = 1 # black heads
  data["red"] = 1 # redness
  data["tex"] = 1 # texture
  data["barrier"] = 1 # skin barrier restoring
  data["hyper"] = 1 #hyperpigmentation

  '''for i in range(len(data["Name"])):
    if "toner" in data.loc[i, "Name"].lower():
      data.loc[i, "Label"] = "Toner"
      print(data.loc[i, "Label"])'''

  for i in range(len(data["Label"])):
    ings = str(data.loc[i, "Ingredients"]).lower()
    for ing in acneIng:
      if ing.lower() in ings:
        data.loc[i, "acne"] = 2
        
    for ing in acneAvoid:
      if ing.lower() in ings:
        data.loc[i, "acne"] = 0

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
        
    for ing in dryAvoid:
      if ing.lower() in ings:
        data.loc[i, "barrier"] = 0
        
        
  # wrtite to csv and json
  data.to_csv('cosmetics_mod.csv', index=False)
