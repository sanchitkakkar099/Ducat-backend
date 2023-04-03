const mongoose = require("mongoose")
const mongoose_paginate = require("mongoose-paginate-v2");

const BatchSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    center: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Center"
    },
    trainer: { type: String },
    start_date: { type: Date, default: new Date() },
    timing: { type: Date, default: new Date() },
    remark: { type: String },
    status: { type: String },
    isDel: { type: Boolean, default: false }
})


BatchSchema.plugin(mongoose_paginate)

exports.BatchSchema = BatchSchema