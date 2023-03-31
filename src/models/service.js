const mongoose = require("mongoose");
const mongoose_paginate = require("mongoose-paginate-v2");

const ServiceSchema = new mongoose.Schema({
    name: { type: String },
    decsription: { type: String },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FileUpload"
    },
    remark: { type: String },
    order_no: { type: Number },
    status: { typr: String },
    isDel: { type: Boolean, default: false }
}, { timestamps: true });

ServiceSchema.plugin(mongoose_paginate);

exports.ServiceSchema = ServiceSchema
