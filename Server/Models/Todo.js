const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    task : String,
    isComplete : {
        type : Boolean,
        default : false
    }
})

const Todomodel = mongoose.model("todos",TodoSchema)
module.exports = Todomodel