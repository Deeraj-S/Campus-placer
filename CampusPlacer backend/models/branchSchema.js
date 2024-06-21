const mongoose = require("mongoose")
const { Schema } = mongoose

const branchSchema = new Schema({
    branch_name: {
        type: String,
        required: true,

    },
    b_status: {
        type: String,
        required: true,

    },
    b_date: {
        type: Date,
        required: true,
    }
})

module.exports = mongoose.model("branch", branchSchema)