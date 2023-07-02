const mongoose = require("mongoose");
const mongoose_paginate = require("mongoose-paginate-v2");

const DriveSchema = new mongoose.Schema({
    name: { type: String },
    start_date: { type: Date },
    time: { type: String },
    technology: { type: String },
    company: { type: String },
    profile: { type: String },
    experience: { type: String },
    qualification: { type: String },
    contact_person: { type: String },
    location: { type: String },
    skills: { type: String },
    venue: { type: String },
    contact_no: { type: String },
    remark: { type: String },
    status: { type: String },
    isDel: { type: Boolean, default: false },

}, { timestamps: true });
DriveSchema.plugin(mongoose_paginate);

const Placed_StudentSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    center: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Center"
    },
    ducat_id: { type: String },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FileUpload"
    },
    company: { type: String },
    package: { type: String },
    role: { type: String },
    status: { type: String },
    remark: { type: String },
    isDel: { type: Boolean, default: false },
}, { timestamps: true });
Placed_StudentSchema.plugin(mongoose_paginate);

const StudentRegisterationSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    center: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Center"
    },
    per_10th: {
        type: String
    },
    per_12th: {
        type: String
    },
    gradpercentage: {
        type: String
    },
    podgradpercentage: {
        type: String
    },
    ducat_id: {
        type: String
    },
    qualification: {
        type: String
    },
    passout_year: {
        type: String
    },
    trainer: {
        type: String
    },
    complete_year: {
        type: String
    },
    complete_month: {
        type: String
    },
    college: {
        type: String
    },
    isabove_60: {
        type: String
    },
    remark: {
        type: String
    },
    status: {
        type: String
    }
}, { timestamps: true });


StudentRegisterationSchema.plugin(mongoose_paginate);

exports.DriveSchema = DriveSchema
exports.Placed_StudentSchema = Placed_StudentSchema
exports.StudentRegisterationSchema = StudentRegisterationSchema