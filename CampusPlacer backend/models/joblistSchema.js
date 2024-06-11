const mongoose = require("mongoose")
const { Schema } = mongoose

const joblistSchema = new Schema({
    category_id: {

    },
    job_title: {

    },
    job_role: {

    },
    job_discription: {

    },
    cover_image: {

    },
    salary: {

    },
    working_time: {

    },
    experiance: {

    },
    last_date: {

    },
    company_name: {

    },
    placement_officer_id: {

    },
    j_date: {

    }


})

module.exports = mongoose.model("joblist", joblistSchema)