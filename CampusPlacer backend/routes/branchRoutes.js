const express = require("express")
const { Insert } = require("../controller/branchController")

const routes = express.Router()

routes.post("insert", Insert)
routes.get("retrive")
routes.put("update/:id")
routes.delete("delete/:id")

module.exports = routes