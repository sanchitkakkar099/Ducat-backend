const mongoose = require("mongoose");
const mongoose_paginate = require("mongoose-paginate-v2");

const BlogSchema = new mongoose.Schema({
    title: { type: String },
    blog_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog_Category"
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FileUload"
    },
    feature_image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FileUload"
    },
    short_desc: { type: String },
    long_desc: { type: String },
    seo_url: { type: String },
    meta_title: { type: String },
    meta_keyword: {
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

}, { timestamps: true });
BlogSchema.plugin(mongoose_paginate);

const Blog_CategorySchema = new mongoose.Schema({
    title: { type: String },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FileUload"
    },
    description: { type: String },
    seo_url: { type: String },
    meta_title: { type: String },
    meta_keyword: {
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

}, { timestamps: true });
Blog_CategorySchema.plugin(mongoose_paginate);

exports.BlogSchema = BlogSchema;
exports.Blog_CategorySchema = Blog_CategorySchema;