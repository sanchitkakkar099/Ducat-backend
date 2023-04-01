const mongoose = require("mongoose");
const mongoose_paginate = require("mongoose-paginate-v2");

const RegistrationSchema = new mongoose.Schema({
    name: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    zipcode: { type: String },
    city: { type: String },
    country: { type: String },
    amount: { type: Number },
    transaction_id: { type: String },
    transaction_status: { type: String },
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
    isDel: { type: Boolean, default: false }
}, {
    timestamps: true, strict: true
});
RegistrationSchema.plugin(mongoose_paginate);



exports.RegistrationSchema = RegistrationSchema;