export default function recs(prods, user) {

    //initialize weights for score creation
    const weights = {
        Dry: 1,
        Oily: 1,
        Combination: 1,
        Normal: 1,
        Sens: 1,
        acne: 1,
        age: 1,
        bright: 1,
        bh: 1,
        red: 1,
        tex: 1,
        barrier: 1,
        hyper: 1
    }

    try{
        weights[user[0].skintype] = 3;
    } catch {
        
        return "User not found";
    }
    

    if(user[0].skinype === "Oily") {
        //user direct input
        weights.Oily = 3;
        weights.Dry = 0;

        //enemies of oily skin
        weights.Dry = 0;
        weights.age = 0;
    }
    else if(user[0].skintype === "Dry") {
        //user direct input
        weights.Dry = 3;
        weights.Oily = 0;

        //enemies of dry skin
        weights.tex = 0;

        //friends of dry skin
        weights.barrier = 1.5;
    }

    if(user[0].sensitive === 1) {
        //user direct input
        weights.Sens = 3;

        //enemies of sensitive skin
        weights.tex = 0;
        weights.acne = 0;

        //friends of sensitive skin
        weights.Dry = 1.5;
        weights.barrier = 1.5;
        weights.red = 1.5;
    }

    if(user[0].bh === 1) {
        //user direct input
        weights.bh = 3;

        //friends of bh
        weights.acne = 1.5;
        weights.tex = 1.5; 
    }

    if(user[0].acne === 1) {
        //user direct input
        weights.acne = 3;

        //friends of acne
        weights.bh = 1.5;
        weights.tex = 1.5;
    }
    
    if(user[0].age === 1){
        //user direct input
        weights.age = 3;

        //enemies of age
        weights.Oily = 0;
        
    }

    if(user[0].bright === 1) {
        //user direct input
        weights.bright = 3;
       
        //friends of bright
        weights.hyper = 1.5;
    }

    if(user[0].red === 1) {
        //user direct input
        weights.red = 3;

        //friends of red
        weights.Dry = 1.5;
        weights.barrier = 1.5;
        weights.Sens = 1.5;
    }

    if(user[0].tex === 1) {
        //user direct input
        weights.tex = 3;
    }

    if(user[0].barrier === 1) {
        //user direct input
        weights.barrier = 3;

        //friends of barrier
        weights.Dry = 1.5;
        weights.red = 1.5;
        weights.Sens = 1.5;
    }

    if(user[0].hyper === 1) {
        //user direct input
        weights.hyper = 3;

        //friends of hyper
        weights.bright = 1.5;
    }


    for (let i = 0; i < prods.length; i++) {
        prods[i].score =(prods[i].Sens * weights.Sens) + (prods[i].acne * weights.acne) + (prods[i].age * weights.age) + (prods[i].bright * weights.bright) + (prods[i].bh * weights.bh) + (prods[i].red * weights.red) + (prods[i].tex * weights.tex) + (prods[i].barrier * weights.barrier) + (prods[i].hyper * weights.hyper) + (prods[i].Oily * weights.Oily) + (prods[i].Dry * weights.Dry) + (prods[i].Combi * weights.Combination) + (prods[i].Normal * weights.Normal);
    }

    prods = prods.sort((a, b) => {
        return b.score - a.score;
    });

    return prods.slice(0, 500);
}