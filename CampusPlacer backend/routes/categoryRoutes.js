const express= require('express');
const {insert,Get}= require('../controller/categoryController');
const { Update, Delete } = require('../controller/admincontroller');
const routes = express.Router()
routes.put("/insert",insert)
routes.get("/get",Get)
routes.put("/update/:id",Update)
routes.delete("/delete/:id",Delete)
module.exports=routes