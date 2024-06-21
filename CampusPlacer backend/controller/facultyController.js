const facultySchema = require('../models/faculty');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const env = require('dotenv');
const faculty = require('../models/faculty');
env.config()

const facultyRegister = async (req, res) => {
    try {

        const { name, phone, email, password,address,designation,dob,gender,fid } = req.body
        const check = await facultySchema.find({ email })
        if (check.length > 0) {
            return res.json({ success: false, message: "email already exists" })
        }
        else {
            const salt = await bcryptjs.genSalt(10)
            //console.log(salt)
            const secpass = await bcryptjs.hash(password, salt)
            //console.log(secpass)
            const faculty = await facultySchema({ name, phone, email,address,designation,dob,gender,fid,password: secpass })
            await faculty.save()
            return res.json({ success: true, savedUser: faculty })
        }
    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}

const login = async (req, res) => {
    try {
        const {name, phone, email, password,address,designation,dob,gender,fid  } = req.body
        const check = await facultySchema.findOne({ email })
        if (check) {
            const passCompare = await bcryptjs.compare(password, check.password);
            if (!passCompare) {
                return res.json({ success: false, message: "Incorrect password or email" })
            }
            else{
                //const data = check.id
                //const token = await jwt.sign(data,process.env.JWT_SECRET)
                return res.json({success:true,message:"Login successful"})
            }

        }
        else {
                return   res.json({ success: false, message: "Incorrect password or email" })

        }

    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")

    }
}

const Get = async (req, res) => {
    try {
        const faculty = await facultySchema.find({ name: "Abhishek" });
        //const student = await studentSchema.findById("664596ebbe5f48b4d3835d34")
        res.json({ success: true, faculty })

    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}
const Delete = async (req, res) => {
    try {
        const id = req.params.id
        //console.log(id)
        const check = await facultySchema.findById(id);
        if (!check) {
            res.json({ success: false, message: "not found" })
        } else {
            const deleteData = await facultySchema.findByIdAndDelete(id);
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
        const check = await facultySchema.findById(id);
        if (!check) {
            res.json({ success: false, message: "not found" })
        } else {
            const { name, phone, email, password,gender,designation,dob,address } = req.body
            const newData = {}
            if (name) { newData.name = name }
            if (phone) { newData.phone = phone }
            if (email) { newData.email = email }
            if (gender) { newData.gender = gender }
            if (designation) { newData.designation = designation }
            if (dob) { newData.dob = dob }
            if (address) { newData.address = address }
            if (password) {
                const salt = await bcryptjs.genSalt(10)
                const secpass = await bcryptjs.hash(password, salt)
                newData.password = secpass
            }
            const UpdatedData = await facultySchema.findByIdAndUpdate(id, { $set: newData }, { new: true });
            return res.json({ success: true, UpdatedData })
        }


    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}

module.exports = { facultyRegister,login,Get,Update,Delete }