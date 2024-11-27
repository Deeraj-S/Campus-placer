const mongoose = require("mongoose")

const { Schema } = mongoose

const placementSchema = new Schema({
    p_name: {
        type: String,
        required: true
    },

    p_phone: {
        type: Number,
        required: true
    },

    p_email: {
        type: String,
        required: true
    },

    role_id: {
        type: mongoose.Types.ObjectId,
        ref: "roles"

    },

    p_password: {
        type: String,
        required: true

    },
    p_photo: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("placement", placementSchema)