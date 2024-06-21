const ConnectMongo =require('./db');
const env = require('dotenv');
const studentSchema = require('./models/student');
const facultySchema = require('./models/faculty');
const cors =require('cors');
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
app.use('/api/upload',express.static("./uploads"))
app.use("/api/user", require('./Routes/userRoutes'))
app.use("/api/admin",require('./Routes/adminRoutes'))
app.use("/api/manager",require('./Routes/managerRoutes'))
app.use("/api/student",require('./Routes/studentRoutes'))
app.use("/api/faculty",require('./Routes/facultyRoutes'))
app.use("/api/product",require('./Routes/productRoutes'))
app.use("/api/category",require('./Routes/categoryRoutes'))
app.use("/api/hod",require('./Routes/hodRoutes'))
app.use("/api/branch",require('./Routes/branchRoutes'))

//app.use(cors({origin:"http://localhost:3000",methods:["GET","POST"]}))



app.listen(process.env.PORT,()=>{
    console.log("app listening on PORT:"+process.env.PORT)
})
