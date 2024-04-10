import express from "express"
import mysql from "mysql"
import { spawn } from 'child_process';
import cors from "cors"
import recs from "./recs.js";
import {metaphone} from 'metaphone'
import showimg from "./prodimgs.js";
import showlink from "./prodlinks.js";
import fs from "fs";
import getimgs from "./webscrapeimgs.js";

const app = express()
app.use(cors())
app.use(express.json())

// database connections and methods
const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'skinDB'
})

app.use(express.json())

app.get("/", (req, res) => {
    res.json("hello this is the backend")
})

app.get("/user/:uid", (req, res) => {
    const q = "SELECT * FROM `users` WHERE `id` = ?";
    const uid = req.params.uid;
    //console.log(req.params.uid);
    db.query(q, uid, (err, data)=>{
        if(err) return res.json("error can't find user, do the quiz!");
        return res.json(data);
    })
})

//get product recommendations
app.get("/recs/:uid", (req, res) => {
    const q = "SELECT * FROM `productsnew`";
    const uid = req.params.uid;
    const q2 = "SELECT * FROM `users` WHERE `id` = ?";

    db.query(q, (err, data)=>{
        if(err) return res.json(err);
        const prods = data;

        
        db.query(q2, uid, (err, data) => {
            if(err) return res.json(err);
            const user = data;
            //console.log(user);
            try {
                const reclist = recs(prods, user);
                return res.json(reclist);
            } catch (error) {
                console.log("Error: ", error);
                return res.json({ error: "An error occurred" });
            }
            
        });
    })
})


//profile creation endpoint
app.put("/createprof", (req, res) => {
    const q = "INSERT INTO `users` (id, skintype, sens, acne, ageing, bright, bh, red, tex, barrier, hyper, name) VALUES (?)";
    const info =[
        req.body.uid,
        req.body.skintype,
        req.body.sensitive,
        req.body.acne,
        req.body.age,
        req.body.bright,
        req.body.bh,
        req.body.red,
        req.body.tex,
        req.body.barrier,
        req.body.hyper,
        req.body.name
    ] 
    console.log(req.body.skintype);
    console.log(q);
    db.query(q, [info], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});


//profile update endpoint
app.post("/updateprof", (req, res) => {
    const q = "UPDATE `users` SET `skintype` = ?, `sens` = ?, `acne` = ?, `ageing` = ?, `bright` = ?, `bh` = ?, `red` = ?, `tex` = ?, `barrier` = ?, `hyper` = ? WHERE `id` = ?";
    const info = [
        req.body.skintype,
        req.body.sensitive,
        req.body.acne,
        req.body.age,
        req.body.bright,
        req.body.bh,
        req.body.red,
        req.body.tex,
        req.body.barrier,
        req.body.hyper,
        req.body.uid 
    ];

    console.log(req.body.skintype);
    console.log(q);

    db.query(q, info, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.json(data);
    });
});


//predictor model endpoint
app.post("/predict", (req, res) => {
    const arg1 = req.body.ingredients;
    
    const pythonProcess = spawn('python',["./main.py", arg1]);
    pythonProcess.stdout.on('data', (data) => {
        console.log(data.toString());
        res.send(data.toString());
    });

    pythonProcess.on('error', (error) => {
        console.error(`Error from python script: ${error.message}`);
    });
    
});


//search ingredients
app.get("/search/:search", (req, res) => {
    const q = "SELECT * FROM `ingredients` I WHERE SOUNDEX(I.name) = SOUNDEX(?) OR I.name LIKE ?";
    const search = req.params.search;
    console.log(search);
    const searchLike = "%" + search + "%";
    const onlyLettersPattern = /^[A-Za-z]+$/;
    

    if(!search.match(onlyLettersPattern)){
      return res.status(400).json({ err: "No special characters and no numbers, please!"})
    }
    
    db.query(q, [search, searchLike], (err, data)=>{
        if(err) console.log(err);
        //console.log(data);
        return res.json(data);
    });
});

//product info
app.get("/ings/:pid", (req, res) => {
    const q = "SELECT `name`, `info` FROM `ingredients` I JOIN `prod_ing` X ON X.ingid = I.id WHERE X.productid = ?";
    const pid = req.params.pid;
   console.log(pid);
    db.query(q, pid, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

//product info
app.get("/prods/:id", (req, res) => {
    const q = "SELECT `id`, `Name`, `Brand`, `img` FROM `products` P JOIN `prod_ing` X ON X.productid = P.id WHERE X.ingid = ?";
    const id = req.params.id;
    //console.log(ing);
    db.query(q, id, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});


function getProducts() {
    return new Promise((resolve, reject) => {
        const q = "SELECT Name, Brand FROM `products`";
        db.query(q, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

async function getlinks() {
    try {
        const file = fs.createWriteStream('links3.txt');
        let prods = await getProducts();
        prods = prods.map(prod => prod.Name + " " + prod.Brand);
        //let imgs = [];
        for (const prod of prods.slice(1426)) {
            const img = await showlink(prod);
            file.write('"'+img+'",');
            //imgs.push(img);
        }
        
    } catch (err) {
        console.error(err);
    }
}


app.listen(8800, () => {
    console.log("Backend server is running!")
    //getlinks()
    //getimgs()
    
})