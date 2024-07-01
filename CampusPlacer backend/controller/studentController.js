const studentSchema = require('../models/student')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const env = require('dotenv')
env.config()


const Register = async (req, res) => {
    try {

        const { s_name,s_phone,s_address,s_email,s_password,register_no,branch_id,hod_id } = req.body
        let photo = req.files['s_photo'][0].filename
        let resume = req.files['s_resume'][0].filename
        
        const check = await studentSchema.find({ s_email,register_no })
        if (check.length > 0) {
            return res.json({ success: false, message: "email or register number already exists" })
        }
        else {
            const salt = await bcryptjs.genSalt(10)
            //console.log(salt)
            const secpass = await bcryptjs.hash(s_password, salt)
            //console.log(secpass)
            const student = await studentSchema({ s_name,s_phone,s_address,s_email,register_no,branch_id,hod_id, s_password: secpass,s_photo:photo ,s_resume:resume})
            await student.save()
            return res.json({ success: true, savedUser: student })
        }
    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}

// const login = async (req, res) => {
//     try {
//         const {name, phone, email, password,regno,address,course,dob,gender ,fid } = req.body
//         const check = await studentSchema.findOne({ email })
//         if (check) {
//             const passCompare = await bcryptjs.compare(password, check.password);
//             if (!passCompare) {
//                 return res.json({ success: false, message: "Incorrect password or email" })
//             }
//             else{
//                 const data = check.id
//                 const token = await jwt.sign(data,process.env.JWT_SECRET)
//                 return res.json({success:true,message:"Login successful"})
//             }

//         }
//         else {
//                 return   res.json({ success: false, message: "Incorrect password or email" })

//         }

//     } catch (err) {
//         console.log("Error:" + err.message)
//         res.send("Internal server error")

//     }
// }

const Get = async (req, res) => {
    try {
        const student = await studentSchema.find().populate(["branch_id","hod_id"])
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
            const {  s_name,s_phone,s_address,s_email,s_password,register_no,branch_id,hod_id,s_photo,s_resume} = req.body
            const newData = {}
        
            if (s_name) { newData.s_name = s_name }
            if (s_phone) { newData.s_phone = s_phone }
            if (s_address) { newData.s_address = s_address }
          
            if (s_email) { newData.s_email = s_email }
            if (branch_id) { newData.branch_id = branch_id }
            if (register_no) { newData.register_no = register_no }
            if (hod_id) { newData.hod_id = hod_id }
            if (s_photo) { newData.s_photo = s_photo }
            if (s_resume) { newData.hod_id = hod_id }
            
            
        
            if (s_password) {
                const salt = await bcryptjs.genSalt(10)
                const secpass = await bcryptjs.hash(s_password, salt)
                {newData.s_password = secpass}
            }
            const UpdatedData = await studentSchema.findByIdAndUpdate(id, { $set: newData }, { new: true });
            return res.json({ success: true, UpdatedData })
        }


    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}

module.exports = { Register,Get,Update,Delete }