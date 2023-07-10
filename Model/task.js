const mongoose = require("mongoose")

let taskSchema = mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    },
    prirority:{
        type:String,
        required:true
    },
    addedon:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Task",taskSchema)