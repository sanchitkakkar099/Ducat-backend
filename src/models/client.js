const mongoose = require("mongoose")
const mongoose_paginate = require("mongoose-paginate-v2");


const ClientSchema = new mongoose.Schema({
    name: { type: String },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FileUpload"
    },
    remark: { type: String },
    status: { type: String },
    order_no: { type: Number },
    isDel: { type: Boolean, default: false },
}, { timestamps: true });


exports.ClientSchema = ClientSchema