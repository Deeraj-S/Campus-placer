const express= require('express');
const {AdminInsert,Delete, Update, Get, Login} = require('../controller/admincontroller');
const routes = express.Router()
const multer =require('multer')


const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+ '-' + file.originalname)
    }
})
const upload = multer({storage:storage})

routes.post("/insert",upload.single('image'), AdminInsert)
routes.delete("/delete/:id",Delete)

routes.put("/update/:id", Update)
routes.get("/get/:id", Get)
routes.get("/get", Get)
routes.post("/login",Login)

module.exports=routes