const mongoose = require("mongoose");
const mongoose_paginate = require("mongoose-paginate-v2");

const EnquiriesSchema = new mongoose.Schema({
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
    remark: { type: String },
    status: { type: String },
    isDel: { type: Boolean, default: false },

}, { timestamps: true })


EnquiriesSchema.plugin(mongoose_paginate);

exports.EnquiriesSchema = EnquiriesSchema;