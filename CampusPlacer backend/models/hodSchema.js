const mongoose = require("mongoose")
const { Schema } = mongoose

const hodSchema = new Schema({
    h_name: {

    },
    h_phone: {

    },
    h_email: {

    },
    h_address: {

    },
    h_password: {

    },
    branch_id: {

    },
    h_photo: {

    }

})

module.exports = mongoose.model("hod", hodSchema)