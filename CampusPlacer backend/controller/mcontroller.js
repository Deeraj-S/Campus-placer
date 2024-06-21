//const admin = require('../models/admin');
const managerSchema = require('../models/manager');
const bcryptjs = require('bcryptjs')
const m_insert = async (req, res) => {
    try {

        const { name, phone, email, password, designation } = req.body
        const check = await managerSchema.find({ email })
        if (check.length > 0) {
            return res.json({ success: false, message: "email already exists" })
        }
        else {
            const salt = await bcryptjs.genSalt(10)
            console.log(salt)
            const secpass = await bcryptjs.hash(password,salt)
            console.log(secpass)
            
            const manager = await managerSchema({ name, phone, email, password:secpass, designation })
            await manager.save()
            return res.json({ success: true, savedUser: manager })
        }
    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}

module.exports=m_insert