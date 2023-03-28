const mongoose = require("mongoose")
const mongoose_paginate = require("mongoose-paginate-v2");

const CenterSchema = new mongoose.Schema({
    title: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    image: { type: String },
    description: { type: String },
    seo_url: { type: String },
    meta_title: { type: String },
    meta_Keyword: {
        type: String
    },
    meta_description: {
        type: String
    },
    meta_section: {
        type: String
    },
    head_css: {
        type: String
    },
    footer_css: {
        type: String
    },
    head_js: {
        type: String
    },
    footer_js: {
        type: String
    },
    order_no: { type: Number },
    status: { type: String },
    remark: { type: String },
    isDel: { type: Boolean, default: false }
}, { timestamps: true })

CenterSchema.plugin(mongoose_paginate);

exports.CenterSchema = CenterSchema;