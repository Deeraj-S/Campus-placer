const express = require("express")
const multer = require('multer')
const { insertApplication, getApplications, getApplicationsById } = require("../controller/applicationController")
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


routes.post("/insert",upload.single('resume'),insertApplication)
routes.get("/get",getApplications)
routes.get("/get/:id",getApplicationsById)
//routes.put("update/:id")
//routes.delete("delete/:id")

module.exports = routes