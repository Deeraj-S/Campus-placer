const express = require('express');
const { Insert, Get } = require('../controller/usercontroller');
const routes = express.Router()

routes.post("/insert", Insert)
routes.get("/get",Get)

module.exports=routes