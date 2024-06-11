const mongoose = require("mongoose")
const { Schema } = mongoose

const applicationSchema = new Schema({
    student_id: {
        type: mongoose.Schema.ObjectId,
        ref: student

    },
    resume: {
        type: String

    },
    job_id: {
        type: mongoose.Schema.ObjectId,
        ref: joblist

    },
    ap_status: {
        type: String

    },
    ap_date: {

    }

})

module.exports = mongoose.model("application", applicationSchema)