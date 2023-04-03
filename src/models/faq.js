const mongoose = require("mongoose");
const mongoose_paginate = require("mongoose-paginate-v2");

const FAQSchema = new mongoose.Schema({
    question: { type: String },
    answer: { type: String },
    faq_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FAQ_Category"
    },
    status: { type: String },
    order_no: { type: Number },
    isDel: { type: Boolean, default: false }
}, {
    timestamps: true
})
FAQSchema.plugin(mongoose_paginate);

const FAQCategorySchema = new mongoose.Schema({
    name: { type: String },
    remark: { type: String },
    order_no: { type: Number },
    status: { type: String },
    isDel: { type: Boolean, default: false }
}, {
    timestamps: true
})
FAQCategorySchema.plugin(mongoose_paginate);


exports.FAQSchema = FAQSchema
exports.FAQCategorySchema = FAQCategorySchema
