const applicationSchema = require('../models/applicationSchema');
const branchSchema = require('../models/branch'); // Ensure you have the branch schema correctly imported
const studentSchema = require('../models/student'); // Ensure you have the student schema correctly imported
const joblistSchema = require('../models/joblist'); // Ensure you have the joblist schema correctly imported
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();

const insertApplication = async (req, res) => {
    try {
        const { student_id, resume, job_id, ap_status, ap_date, course_id, YOG, CGPA, experience } = req.body;

        // Ensure that the referenced documents exist
        const student = await studentSchema.findById(student_id);
        const job = await joblistSchema.findById(job_id);
        const branch = await branchSchema.findById(course_id);

        if (!student || !job || !branch) {
            return res.json({ success: false, message: "Invalid references" });
        }

        const application = new applicationSchema({
            student_id,
            resume:req.file.filename,
            job_id,
            ap_status,
            ap_date,
            course_id,
            YOG,
            CGPA,
            experience

        });

        await application.save();
        return res.json({ success: true, application });
    } catch (err) {
        console.log("Error:" + err.message);
        res.send("Internal server error");
    }
}


const getApplications = async (req, res) => {
    try {
        const applications = await applicationSchema.find().populate(["student_id" ,"job_id" ,"course_id"]);
        res.json({ success: true, applications });
    } catch (err) {
        console.log("Error:" + err.message);
        res.send("Internal server error");
    }
}
const getApplicationsById = async (req, res) => {
    try {
        const id =req.params.id
        const applications = await applicationSchema.findById(id).populate(["student_id" ,"job_id" ,"course_id"]);
        res.json({ success: true, applications });
    } catch (err) {
        console.log("Error:" + err.message);
        res.send("Internal server error");
    }
}

module.exports = {
    insertApplication,
    getApplications,
    getApplicationsById
    
};
