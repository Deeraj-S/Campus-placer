const ConnectMongo =require('./db');
const env = require('dotenv');
const cors =require('cors');
const path = require('path')
env.config()

ConnectMongo()

const express = require('express');
const app =express()
app.use(cors())
app.use(express.json())

app.get("/ab",(req,res)=>{
    console.log("this is ab API")
    res.send("this is output")
})

app.use('/api/upload/',express.static("./uploads"))
app.use('/api/upload/photo',express.static("./uploads/photos"))
app.use('/api/upload/resume',express.static("./uploads/resume"))

app.use("/api/admin",require('./Routes/adminRoutes'))
app.use("/api/category",require('./Routes/categoryRoutes'))
app.use("/api/hod",require('./Routes/hodRoutes'))
app.use("/api/branch",require('./Routes/branchRoutes'))
app.use("/api/student", require('./Routes/studentRoutes'))

//app.use(cors({origin:"http://localhost:3000",methods:["GET","POST"]}))



app.listen(process.env.PORT,()=>{
    console.log("app listening on PORT:"+process.env.PORT)
})
