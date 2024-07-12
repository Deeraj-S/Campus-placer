const mongoose = require('mongoose');
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

const checkApplicationStatus = async (req, res) => {
    try {
        const { student_id, job_id } = req.params;
        //console.log(`Checking application status for student_id: ${student_id}, job_id: ${job_id}`);
        
        const application = await applicationSchema.findOne({ student_id, job_id, ap_status: 'Applied' });

        if (application) {
            //console.log('Application found with status Applied:', application);
            return res.status(200).json({ applied: true });
        } else {
            //console.log('No application found with status Applied');
            return res.status(200).json({ applied: false });
        }
    } catch (err) {
        console.error('Error checking application status:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getAppliedJobs = async (req, res) => {
    try {
        const { student_id } = req.params;
        const applications = await applicationSchema.find({ student_id }).populate(["student_id", "job_id", "course_id"]);
        res.json({ success: true, applications });
    } catch (err) {
        console.log("Error:" + err.message);
        res.send("Internal server error");
    }
};

const GetJobByObj = async (req, res) => {
    try {
        const jobId = req.params.id
        const job = await joblistSchema.findById(jobId);
        res.json({ job });
    } catch (err) {
        res.status(400).json({ error: 'Invalid Job ID' });
    }
};

const GetStudentByObj = async (req, res) => {
    try {
        const studentId = req.params.id
        const job = await studentSchema.findById(studentId);
        res.json({ job });
    } catch (err) {
        res.status(400).json({ error: 'Invalid Job ID' });
    }
};

const GetBranchByObj = async (req, res) => {
    try {
        const branchId = req.params.id
        const job = await branchSchema.findById(branchId);
        res.json({ job });
    } catch (err) {
        res.status(400).json({ error: 'Invalid Job ID' });
    }
};

module.exports = {
    insertApplication,
    getApplications,
    getApplicationsById,
    checkApplicationStatus,
    getAppliedJobs,
    GetJobByObj,
    GetBranchByObj,
    GetStudentByObj
    
    
};