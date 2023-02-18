const express=require("express");
const bodyParser=require("body-parser");
const cors=require('cors');

const app=express();

const noteRoute=require("./routes/noteRoute")
const userRoute=require("./routes/userRoutes");

const mongoose  = require("mongoose");

app.use(cors());
app.use(express.json());
app.use('/user',userRoute);
app.use('/note',noteRoute)

mongoose.connect("mongodb://0.0.0.0:27017/noteAPI",function(err){
    if(!err){
        console.log("Database connected Successfully");
    }
    else{
        console.log(err);
    }
})


app.listen(3000,function(){
   console.log("Server started at port 3000");
})