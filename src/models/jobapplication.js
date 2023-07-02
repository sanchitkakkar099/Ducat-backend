const mongoose = require("mongoose")
const mongoose_paginate = require("mongoose-paginate-v2");


const JobApplicationSchema = new mongoose.Schema({

    name: { type: String },
    email: { type: String },
    phone: { type: String },
    jobType: { type: String },
    linkedInProfile: { type: String },
    aboutyourSelf: { type: String },
    aboutyourCourse: { type: String },
    resume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FileUpload"
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    center: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Center"
    },
    remark: {
        type: String
    },
    status: {
        type: String
    },
    isDel: {
        type: Boolean, default: false
    },

}, { timestamps: true })

JobApplicationSchema.plugin(mongoose_paginate)

exports.JobApplicationSchema = JobApplicationSchema