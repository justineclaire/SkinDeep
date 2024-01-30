import express from "express"
import mysql from "mysql"
import fs from 'fs';
import { spawn } from 'child_process';
import cors from "cors"

const app = express()
app.use(cors())

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