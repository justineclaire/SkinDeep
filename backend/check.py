from 

tp = 0
tn = 0
fp = 0
fn = 0

def checkModel(pred, true):

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
# check hyper
for i in range(len(y_pred)):
    for j in range(len(y_pred[i])):
        if y_pred[i][j] != y_test[i][j]:
            if y_test[i][j] == 0:
                fp += 1
            if y_test[i] == 1 && :
                fn += 1 