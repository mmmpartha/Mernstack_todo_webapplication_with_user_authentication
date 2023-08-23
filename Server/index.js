const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const Todomodel = require("./Models/Todo")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const UserModel = require('./Models/Todo')

const app = express()
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(cookieParser())

app.use(express.json())


mongoose.connect("mongodb://localhost:27017/task")

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    bcrypt.hash(password, 10)
    .then(hash => {
        UserModel.create({name, email, password: hash})
        .then(user => res.json("Success"))
        .catch(err => res.json(err))
    }).catch(err => res.json(err))
})

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if(response) {
                  const token = jwt.sign({email: user.email, role: user.role},
                        "jwt-secret-key", {expiresIn: '1d'})  
                    res.cookie('token', token)
                    return res.json({Status: "Success", role: user.role})
                }else {
                    return res.json("The password is incorrect")
                }
            })
        } else {
            return res.json("No record existed")
        }
    })
})

app.get("/get",(req,res)=>{
    Todomodel.find()
    .then((data => res.json(data)))
    .catch((err)=> res.json(err))
})

app.put("/update/:id",(req,res) => {
    const {id} = req.params;
    Todomodel.findByIdAndUpdate({_id:id},{isComplete : true})
    .then((data)=>res.json(data))
    .catch((err)=>res.json(err))
})

app.delete("/delete/:id",(req,res) => {
    const {id} = req.params;
    Todomodel.findByIdAndDelete({_id:id},{isComplete : true})
    .then((data)=>res.json(data))
    .catch((err)=>res.json(err))
})

app.post("/add",(req,res)=>{
    const task = req.body.task;

    Todomodel.create({
        task : task
    }).then((data)=> res.json(data))
        .catch((err)=> res.json(err))
})

app.listen(3001,()=>{
    console.log("Server is woring");
})