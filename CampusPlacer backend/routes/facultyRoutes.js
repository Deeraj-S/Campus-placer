const express= require('express');
const {facultyRegister,login,Get,Update,Delete}= require('../controller/facultyController');
//const { Update, Delete } = require('../controller/studentController');
const routes = express.Router()
routes.post("/insert",facultyRegister)
routes.post("/login",login)
routes.get("/get",Get)
routes.put("/update/:id",Update)
routes.delete("/delete/:id",Delete)

module.exports=routes