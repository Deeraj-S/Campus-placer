const express = require('express')
const multer = require('multer')
const { placementRegister, Get, Update, Delete } = require('../controller/placementController')
const routes = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage })

routes.post("/insert", upload.single('p_photo'), placementRegister)
routes.get("/get", Get)
routes.put("/update/:id", upload.single('p_photo'), Update)
routes.delete("/delete/:id", Delete)

module.exports = routes