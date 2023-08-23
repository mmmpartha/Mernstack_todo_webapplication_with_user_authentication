const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "visitor"
    }
})

const TodoSchema = new mongoose.Schema({
    task : String,
    isComplete : {
        type : Boolean,
        default : false
    }
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel

const Todomodel = mongoose.model("todos",TodoSchema)

module.exports = Todomodel