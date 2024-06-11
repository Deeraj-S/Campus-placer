const express = require("express")
const routes = express.Router()

routes.post("insert")
routes.get("retrive")
routes.put("update/:id")
routes.delete("delete/:id")

module.exports = routes