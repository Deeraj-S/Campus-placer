const categorySchema = require('../models/category');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const env = require('dotenv');
env.config()

const insert = async (req, res) => {
    try {

        const { ctitle,date,status } = req.body

         
            const category = await categorySchema({ ctitle,date,status})
            await category.save()
            return res.json({ success: true, savedUser: category })
        
    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }category
}
const Get = async (req, res) => {
    try {
        //const category = await categorySchema.find({ name: "admin" });
        const category = await categorySchema.find()
        res.json({ success: true, category })

    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}


const Delete = async (req, res) => {
    try {
        const id = req.params.id
        //console.log(id)
        const check = await categorySchema.findById(id);
        if (!check) {
            res.json({ success: false, message: "not found" })
        } else {
            const deleteData = await categorySchema.findByIdAndDelete(id);
            return res.json({ success: true, deleteData })
        }


    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }

}

const Update = async (req, res) => {
    try {
        const id = req.params.id
        const check = await categorySchema.findById(id);
        if (!check) {
            res.json({ success: false, message: "not found" })
        } else {
            const { ctitle, date, status } = req.body
            const newData = {}
          
            if (ctitle) { newData.ctitle = ctitle }
            if (date) { newData.date = date }
            if (status) { newData.status = status }
         
            const UpdatedData = await categorySchema.findByIdAndUpdate(id, { $set: newData }, { new: true });
            return res.json({ success: true, UpdatedData })
        }


    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}


module.exports={insert,Get, Delete, Update}