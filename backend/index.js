import express from "express"
import mysql from "mysql"
import { spawn } from 'child_process';
import cors from "cors"
import recs from "./recs.js";
import {metaphone} from 'metaphone'
import showimg from "./prodimgs.js";
import fs from "fs";
import getimgs from "./webscrapeimgs.js";
import connection from "./config.cjs";

const app = express()
//app.use(cors())

//const { connection } = require("./config.cjs");
const corsOptions ={
    origin:'https://skindeepfyp.netlify.app', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json())

app.get("/", (req, res) => {
    res.json("hello this is the backend")
})

app.get("/user/:uid", (req, res) => {
    const q = "SELECT * FROM `users` WHERE `id` = ?";
    const uid = req.params.uid;
    
    connection.query(q, uid, (err, data)=>{
        if(err) return res.json("error can't find user, do the quiz!");
        return res.json(data);
    })
})

//get product recommendations
app.get("/recs/:uid", (req, res) => {
    const q = "SELECT * FROM `products`";
    const uid = req.params.uid;
    const q2 = "SELECT * FROM `users` WHERE `id` = ?";

    connection.query(q, (err, data)=>{
        if(err) return res.json(err);
        const prods = data;

        
        connection.query(q2, uid, (err, data) => {
            if(err) return res.json(err);
            const user = data;
            
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
app.post("/createprof", (req, res) => {
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
     
    connection.query(q, [info], (err, data)=>{
        if(err) return res.json(err);
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
app.get("/search", (req, res) => {
    const q = "SELECT * FROM `ingredients` I WHERE SOUNDEX(I.name) = SOUNDEX(?) OR I.name LIKE ?";
    const word = req.query.word; // Access the search term from query parameters
    
    const wordLike = "%" + word + "%";

    connection.query(q, [word, wordLike], (err, data)=>{
        if(err) console.log(err);
        return res.json(data);
    });
});

//product info
app.post("/ings", (req, res) => {
    const q = "SELECT `name`, `info` FROM `ingredients` I JOIN `prod_ing` X ON X.ingid = I.id WHERE X.productid = ?";
    const pid = req.body.id;
   
    connection.query(q, pid, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

//product info
app.post("/prods", (req, res) => {
    const q = "SELECT `id`, `Name`, `Brand`, `img` FROM `products` P JOIN `prod_ing` X ON X.productid = P.id WHERE X.ingid = ?";
    const ing = req.body;
    const id = req.body.id;
    
    connection.query(q, id, (err, data)=>{
        if(err) return res.json(err);
        
        return res.json(data);
    });
});


// Use PORT provided in environment or default to 3000
const port = process.env.PORT || 3000;

// Listen on `port` and 0.0.0.0
app.listen(port, "0.0.0.0", function () {
  // ...
});