const express= require('express');
const m_insert = require('../controller/mcontroller');
//const { Get } = require('../controller/mcontroller');
const routes = express.Router()
routes.post("/insert", m_insert)
//routes.get("/get",)

module.exports=routes