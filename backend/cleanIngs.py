import pandas as pd

data = pd.read_csv("cosmetics.csv")

for i in range(len(data["Ingredients"])):
    ings = data.loc[i, "Ingredients"].split(",")
    for j in range(len(ings)):
        ing = ings[j].lower()
        if 'glycerin' in ing:
            ings[j] = 'glycerin'
        if 'retinol' in ing:
            ings[j] = 'retinol'
        if 'niacinamide' in ing:
            ings[j] = 'niacinamide'
        if 'hyaluronic' in ing:
            ings[j] = 'hyaluronic'
        if 'ascorb' in ing:
            ings[j] = 'vitc'
        if 'seaweed' in ing:
            ings[j] = 'seaweed'
        if 'aloe' in ing:  
            ings[j] = 'aloe'
        if 'dimethicone' in ing:
            ings[j] = 'dimethicone'
        if 'fragrance' in ing or 'parfum' in ing:
            ings[j] = 'fragrance'
        if 'alcohol denat' in ing:
            ings[j] = 'alcohol denat'
        if 'lactic' in ing:
            ings[j] = 'lactic'
        if 'salicylic' in ing:
            ings[j] = 'salicylic'
        if 'glycolic' in ing:  
            ings[j] = 'glycolic'
        if 'malic' in ing:
            ings[j] = 'malic'
        if 'citric' in ing:
            ings[j] = 'citric'
        if 'yeast' in ing:
            ings[j] = 'yeast'
        if 'camellia' in ing:
            ings[j] = 'camellia'
        if 'sesame' in ing:
            ings[j] = 'sesame'
        if 'witch' in ing:
            ings[j] = 'witch'
        if 'willow' in ing:
            ings[j] = 'willow'
        if 'cucumber' in ing:
            ings[j] = 'cucumber'
        if 'watermelon' in ing:
            ings[j] = 'watermelon'
        if 'almond' in ing:
            ings[j] = 'almond'
        if 'avocado' in ing:
            ings[j] = 'avocado'
        if 'mandelic' in ing:
            ings[j] = 'mandelic'
        if 'damascena' in ing:
            ings[j] = 'damascena'
        if 'eucalyptus' in ing:
            ings[j] = 'eucalyptus'
        if 'squalane' in ing:
            ings[j] = 'squalane'
        if 'grape) see' in ing or 'grape seed' in ing or 'grapeseed' in ing:
            ings[j] = 'grapeseedoil'
        if 'rubus fruticosus' in ing:
            ings[j] = 'blackberry'
        if 'cera alba' in ing or 'beeswax' in ing:
            ings[j] = 'beeswax'
        if 'please be aware that ingredient lists may change or vary from time to time' in ing:
            ings[j] = ' '
        if 'lactobacillus' in ing:
            ings[j] = 'lactobacillus'
        if 'jojoba' in ing:
            ings[j] = 'jojoba'
        if 'squalene' in ing:
            ings[j] = 'squalene'
        if 'soy' in ing or 'soybean' in ing or 'soja' in ing:
            ings[j] = 'soy'
        if 'water' in ing or 'aqua' in ing:
            ings[j] = ''
        if 'petrol' in ing or 'mineral oil' in ing:
            ings[j] = 'petrolatum'
        if 'castor' in ing:
            ings[j] = 'castor'
        if 'sunflower' in ing:
            ings[j] = 'sunflower'
        if 'lavandula angustifolia' in ing or 'lavender' in ing:
            ings[j] = 'lavender'
        # remove preservatives
        if 'sodium benzoate' in ing:
            ings[j] = ''
        if 'potassium sorbate' in ing:  
            ings[j] = ''

        mod_ings = ",".join(ings)
        data.loc[i, "Ingredients"] = mod_ings
        # print(mod_ings)
data.to_csv("cosmetics.csv", index=False)