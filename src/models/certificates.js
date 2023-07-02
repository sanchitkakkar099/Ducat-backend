const mongoose = require("mongoose")
const mongoose_paginate = require("mongoose-paginate-v2");


const CertificatesSchema = new mongoose.Schema({
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
    facililty: {
        type: String
    },
    ducat_id: {
        type: String
    },
    start_date: {
        type: String
    },
    end_date: {
        type: String
    },
    remark: {
        type: String
    },
    status: {
        type: String
    }
}, { timestamps: true });


CertificatesSchema.plugin(mongoose_paginate);

exports.CertificatesSchema = CertificatesSchema