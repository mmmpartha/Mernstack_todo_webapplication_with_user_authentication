const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const Todomodel = require("./Models/Todo")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const UserModel = require('./Models/User')
const RegisterModel = require("./Models/Register")

const app = express()
app.use(cors())
app.use(cookieParser())

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/task")

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    RegisterModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already have an account")
        }else{
            RegisterModel.create({name:name, email:email, password:password})
            .then(result => res.json(result))
            .catch(err => res.json(err))
        }
    })
    .catch(err => res.json(err))
})

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user) {
           if(user.password === password) {
            res.json("Login Successfully")
           }else{
            res.json("The password is incorrect")
           }
        } else {
            res.json("No record existed")
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