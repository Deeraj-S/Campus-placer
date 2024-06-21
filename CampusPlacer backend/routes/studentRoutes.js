const express= require('express');
const {studentRegister,login, Get,Update,Delete}= require('../controller/studentController');
const routes = express.Router()
routes.post("/insert",studentRegister)
routes.post("/login",login)
routes.get("/get",Get)
routes.put("/update/:id",Update)
routes.delete("/delete/:id",Delete)

module.exports=routes