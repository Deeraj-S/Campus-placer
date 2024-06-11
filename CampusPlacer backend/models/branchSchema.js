const mongoose = require("mongoose")
const { Schema } = mongoose

const branchSchema = new Schema({
    branch_name: {

    },
    b_status: {

    },
    b_date: {

    }
})

module.exports = mongoose.model("branch", branchSchema)