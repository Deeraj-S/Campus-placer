const mongoose = require("mongoose")
const { Schema } = mongoose

const categorySchema = new Schema({
    category_name: {

    },
    c_status: {

    },
    c_date: {

    }
})

module.exports = mongoose.model("category", categorySchema)
