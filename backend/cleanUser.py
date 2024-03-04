import pandas as pd
'''Clean user inputted ingredients list to match training data format'''
def cleanUser(cos):
    
    for ing in cos:
            ing = ing.lower()
            if 'tocopheryl' in ing or 'tocopherol' in ing or 'vitamine' in ing or 'vitamin e' in ing:
                ing = 'vite'
            if ',' in ing:
                ing.replace(',', '')
            if '100%' in ing or '100percent' in ing:
                ing = ''
            if 'glycerin' in ing:
                ing = 'glycerin'
            if 'retinol' in ing:
                ing = 'retinol'
            if 'niacinamide' in ing:
                ing = 'niacinamide'
            if 'hyaluronic' in ing:
                ing = 'hyaluronic'
            if 'ascorb' in ing:
                ing = 'vitc'
            if 'seaweed' in ing:
                ing = 'seaweed'
            if 'aloe' in ing:  
                ing = 'aloe'
            if 'dimethicone' in ing:
                ing = 'dimethicone'
            if 'fragrance' in ing or 'parfum' in ing:
                ing = 'fragrance'
            if 'alcohol denat' in ing:
                ing = 'alcohol denat'
            if 'lactic' in ing:
                ing = 'lactic'
            if 'salicylic' in ing:
                ing = 'salicylic'
            if 'glycolic' in ing:  
                ing = 'glycolic'
            if 'malic' in ing:
                ing = 'malic'
            if 'citric' in ing:
                ing = 'citric'
            if 'yeast' in ing:
                ing = 'yeast'
            if 'camellia' in ing:
                ing = 'camellia'
            if 'sesame' in ing:
                ing = 'sesame'
            if 'witch' in ing:
                ing = 'witch'
            if 'willow' in ing:
                ing = 'willow'
            if 'cucumber' in ing:
                ing = 'cucumber'
            if 'watermelon' in ing:
                ing = 'watermelon'
            if 'almond' in ing:
                ing = 'almond'
            if 'avocado' in ing:
                ing = 'avocado'
            if 'mandelic' in ing:
                ing = 'mandelic'
            if 'damascena' in ing:
                ing = 'damascena'
            if 'eucalyptus' in ing:
                ing = 'eucalyptus'
            if 'squalane' in ing:
                ing = 'squalane'
            if 'grape) see' in ing or 'grape seed' in ing or 'grapeseed' in ing:
                ing = 'grapeseedoil'
            if 'rubus fruticosus' in ing:
                ing = 'blackberry'
            if 'cera alba' in ing or 'beeswax' in ing:
                ing = 'beeswax'
            if 'please be aware that ingredient lists may change or vary from time to time' in ing:
                ing = ' '
            if 'lactobacillus' in ing:
                ing = 'lactobacillus'
            if 'jojoba' in ing:
                ing = 'jojoba'
            if 'squalene' in ing:
                ing = 'squalene'
            if 'soy' in ing or 'soybean' in ing or 'soja' in ing:
                ing = 'soy'
            if 'water' in ing or 'aqua' in ing:
                ing = ''
            if 'petrol' in ing or 'mineral oil' in ing:
                ing = 'petrolatum'
            if 'castor' in ing:
                ing = 'castor'
            if 'sunflower' in ing:
                ing = 'sunflower'
            if 'lavandula angustifolia' in ing or 'lavender' in ing:
                ing = 'lavender'
            if 'capric triglyceride' in ing or 'capric triglyceride' in ing or 'linoleic triglyceride' in ing:
                ing = 'capric triglyceride'
            if 'ceramide' in ing:
                ing = 'ceramide'
            if 'green tea' in ing:
                ing = 'greentea'
            if 'oatmeal' in ing or 'avena sativa' in ing:
                ing = 'oatmeal'
            if 'zizyphus' in ing or 'jujube' in ing:
                ing = 'jujube'
            if 'rosehip' in ing:
                ing = 'rosehip'
            if 'bentonite' in ing:
                ing = 'bentonite'
            if 'propolis' in ing or 'honey' in ing:
                ing = 'honey'
            if 'zinc oxide' in ing:
                ing = 'zinc oxide'
            if 'apricot kernel' in ing:
                ing = 'apricot kernel'
            if 'olive' in ing:
                ing = 'olive'
            if 'almond' in ing:
                ing = 'almond'
            if 'argan' in ing: 
                ing = 'argan'
            if 'oxybenzone' in ing:
                ing = 'oxybenzone'
            if '*' in ing:
                ing.replace('*', '')
            if 'centella asiatica' in ing:
                ing = 'centella asia'
            if 'tartaric' in ing:
                ing = 'tartaric'
            if '2hexadaniol' in ing or '12hexanediol' in ing or '2hexandiol' in ing:
                ing = '12hexanediol'
            if 'algae' in ing:
                ing = 'algae'
            if 'superoxide' in ing:
                ing = 'superoxidedis'
            # remove preservatives
            if 'sodium benzoate' in ing:
                ing = ''
            if 'potassium sorbate' in ing:  
                ing = ''
            return cos