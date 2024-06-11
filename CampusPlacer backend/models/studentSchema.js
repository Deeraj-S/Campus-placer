const mongoose = require("mongoose")
const { Schema } = mongoose

const studentSchema = new Schema({
    s_name: {

    },
    s_phone: {

    },
    s_address: {

    },
    s_email: {

    },
    s_password: {

    },
    register_no: {

    },
    branch_id: {

    },
    hod_id: {

    },
    s_photo: {

    },
    s_resume: {

    }

})

module.exports = mongoose.model("student", studentSchema)