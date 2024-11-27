const mongoose = require("mongoose")
const { Schema } = mongoose

studentSchema = new Schema({
    s_name: {
        type: String,
        require: true

    },
    s_phone: {
        type: Number

    },
    role_id: {
        type: mongoose.Types.ObjectId,
        ref: "roles"

    },
    s_email: {
        type: String,
        require: true

    },
    s_password: {
        type: String,
        require: true

    },
    register_no: {
        type: String,
        require: true

    },
    branch_id: {
        type: mongoose.Types.ObjectId,
        ref: "branch"

    },

    s_photo: {
        type: String,
        require: true

    },
    s_resume: {
        type: String,
        require: true

    }

})
module.exports = mongoose.model("student", studentSchema)
