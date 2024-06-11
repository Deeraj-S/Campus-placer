const mongoose = require("mongoose")

const { Schema } = mongoose

const adminSchema = new Schema({
    a_name: {
        type: String,
    },
    a_phone: {
        type: Number,
    },
    a_email: {
        type: String,
    },
    a_password: {
        type: String

    },
    a_status: {
        type: String

    },
    a_date: {
        type: Date
    },
    a_photo: {
        type: String

    }

})

module.export = mongoose.model("admin", adminSchema)