const studentSchema = require('../models/student');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const env = require('dotenv')
env.config()

const studentRegister = async (req, res) => {
    try {

        const { name, phone, email, password,regno,address,course,dob,gender,fid } = req.body
        const check = await studentSchema.find({ email,regno })
        if (check.length > 0) {
            return res.json({ success: false, message: "email or register number already exists" })
        }
        else {
            const salt = await bcryptjs.genSalt(10)
            //console.log(salt)
            const secpass = await bcryptjs.hash(password, salt)
            //console.log(secpass)
            const student = await studentSchema({ name, phone, email,regno,address,course,dob,gender,fid,password: secpass })
            await student.save()
            return res.json({ success: true, savedUser: student })
        }
    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}

const login = async (req, res) => {
    try {
        const {name, phone, email, password,regno,address,course,dob,gender ,fid } = req.body
        const check = await studentSchema.findOne({ email })
        if (check) {
            const passCompare = await bcryptjs.compare(password, check.password);
            if (!passCompare) {
                return res.json({ success: false, message: "Incorrect password or email" })
            }
            else{
                const data = check.id
                const token = await jwt.sign(data,process.env.JWT_SECRET)
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
        //const student = await studentSchema.find({ name: "abhishek" });
        const student = await studentSchema.findById("664596ebbe5f48b4d3835d34")
        res.json({ success: true, student })

    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}

const Delete = async (req, res) => {
    try {
        const id = req.params.id
        //console.log(id)
        const check = await studentSchema.findById(id);
        if (!check) {
            res.json({ success: false, message: "not found" })
        } else {
            const deleteData = await studentSchema.findByIdAndDelete(id);
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
        const check = await studentSchema.findById(id);
        if (!check) {
            res.json({ success: false, message: "not found" })
        } else {
            const { name, phone, email, password,gender,course,dob,regno,address } = req.body
            const newData = {}
            //const salt = await bcryptjs.genSalt(10)
            //const secpass = await bcryptjs.hash(password, salt)
            if (name) { newData.name = name }
            if (phone) { newData.phone = phone }
            if (email) { newData.email = email }
            if (gender) { newData.gender = gender }
            if (course) { newData.course = course }
            if (dob) { newData.dob = dob }
            if (regno) { newData.regno = regno }
            if (address) { newData.address = address }
            if (password) {
                const salt = await bcryptjs.genSalt(10)
                const secpass = await bcryptjs.hash(password, salt)
                {newData.password = secpass}
            }
            const UpdatedData = await studentSchema.findByIdAndUpdate(id, { $set: newData }, { new: true });
            return res.json({ success: true, UpdatedData })
        }


    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}

module.exports = { studentRegister,login,Get,Update,Delete }