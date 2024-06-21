const express = require('express')
const { hodRegister ,Get,Update,Delete} = require('../controller/hodController')
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

const routes = express.Router()
routes.post("/insert",upload.single('h_photo'),hodRegister)
//routes.post("/login",login)
routes.get("/get",Get)
routes.put("/update/:id",Update)
routes.delete("/delete/:id",Delete)

module.exports=routes