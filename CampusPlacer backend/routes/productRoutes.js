const express= require('express');
const {insert, Get}= require('../controller/productController');
const routes = express.Router()
routes.post("/insert",insert)
routes.get("/get",Get)

module.exports=routes