import express from "express"
import mysql from "mysql"
import { spawn } from 'child_process';
import cors from "cors"

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
        if(err) return res.json(err);
        return res.json(data);
    })
})

//set up database queries endpoint
app.get("/issues", (req, res) => {
    const q = "SELECT * FROM skinIssues";
    db.query(q, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post("/issues", (req, res) => {
    const q = "INSERT INTO skinissues (issueID, issue) VALUES (?)";
    const values = ["2", "Acne"];   

    db.query(q, [values], (err, data)=>{
        if(err) console.log(res.json(err));
        return res.json(data);
    });
});

//profile creation endpoint
app.post("/createprof", (req, res) => {
    const q = "INSERT INTO `users`(`id`, `name`, `skintype`, ` sensitive`, `acne`, `age`, `bright`, `bh`, `red`, `tex`, `barrier`, `hyper`) VALUES (?)";
    const info =[
        req.body.uid,
        req.body.name,
        req.body.skintype,
        req.body.sensitive,
        req.body.acne,
        req.body.age,
        req.body.bright,
        req.body.bh,
        req.body.red,
        req.body.tex,
        req.body.barrier,
        req.body.hyper
    ] 
    console.log(info);
    db.query(q, [info], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});


//predictor model endpoint
app.post("/predict", (req, res) => {
    const arg1 = req.body.ingredients;
    
    const pythonProcess = spawn('python',["./main.py", arg1]);
    pythonProcess.stdout.on('data', (data) => {
        res.send(data.toString());
    });
    
});
 

app.listen(8800, () => {
    console.log("Backend server is running!")
})