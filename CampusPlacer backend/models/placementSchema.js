const mongoose = require("mongoose")

const { Schema } = mongoose

const placementSchema = new Schema({
    p_name: {

    },
    p_phone: {

    },
    p_email: {

    },
    p_address: {

    },
    p_password: {

    },
    p_photo: {

    }

})

module.exports = mongoose.model("placement", placementSchema)