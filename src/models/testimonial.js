const mongoose = require("mongoose");
const mongoose_paginate = require("mongoose-paginate-v2");

const TestimonialSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    profile: { type: String },
    city: { type: String },
    country: { type: String },
    type: { type: String },
    message: { type: String },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FileUpload"
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    remark: { type: String },
    status: { type: String },
    isDel: { type: Boolean, default: false },
}, { timestamps: true });

TestimonialSchema.plugin(mongoose_paginate)

exports.TestimonialSchema = TestimonialSchema;