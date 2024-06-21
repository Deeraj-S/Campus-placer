const productSchema = require('../models/product');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const env = require('dotenv');
const category = require('../models/category');
env.config()

const insert = async (req, res) => {
    try {

        const { pname,description,qty,status,date,price,category,cid } = req.body

         
            const product = await productSchema({ pname,price,qty,status,category,date,description,cid })
            await product.save()
            return res.json({ success: true, savedUser: product })
        
    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}
const Get = async (req, res) => {
    try {
        //const category = await categorySchema.find({ name: "admin" });
        const product = await productSchema.find({cid:"6646eef79ecb287548c8c464"})
        res.json({ success: true, product })

    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}

module.exports={insert,Get}