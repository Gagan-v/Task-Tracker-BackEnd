const express = require("express");

const app = express();
const cors = require("cors");
const Task = require("./Model/task")

const mongoose = require('mongoose');

mongoose.set("strictQuery",false)
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

let url = "mongodb://localhost:27017/Task"

mongoose.connect(url).then(() => {
    console.log("mongo is connected")
})

app.post("/tasks",async(req,res) => {
    let data = new Task({
        task : req.body.task,
        startDate : req.body.startDate,
        endDate : req.body.endDate,
        prirority:req.body.prirority,
        addedon:req.body.addedon
    })
    try{
        await data.save()
        res.send({message:"task added successfully"})
    }catch{
        res.send({message:"Task is failed to add"})
    }

})



app.get("/tasks-post",async(req,res) => {
    try{
        const tasksdata = await Task.find({}).sort({prirority:1})
        res.json(tasksdata)
    }catch(err){
        console.log(err)
    }
   
})

app.get('/tasks/:id',async(req,res) => {
    let {id} = req.params
    try{
        const singleData = await Task.findById(id);
        res.send(singleData);
    }catch(err){
        res.send(err)
    }
})



app.put("/tasks/:id",async(req,res) => {
    const {id} = req.params
    await Task.updateOne({_id:id},{
        $set:{
            task:req.body.task,
            startDate : req.body.startDate,
            endDate : req.body.endDate,
            prirority:req.body.prirority
        }
    })
})


app.delete("/tasks/:id",async(req,res) => {
    try{
        const {id} = req.params
        const result = await Task.deleteOne({_id : id});
        if(result.deletedCount > 0){
            res.send(`deleted successfully`)
        }else{
            res.send(`not found`)
        }
    } catch(err){
        console.error(err);
    }
})
  

app.listen(4000,() => {
    console.log("server is listening")
})