const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const CourseSchema = new mongoose.Schema({
    title: { type: String },
    subtitle: { type: String },
    seo_url: { type: String },
    redirect_url: { type: String },
    course_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseCategory'
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FileUpload"
    },
    cover_image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FileUpload"
    },
    pdf_file: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FileUpload"
    },
    order_no: { type: Number },
    status: { type: String },
    popular: { type: String },
    description: { type: String },
    course_content: [{
        heading: { type: String },
        value: { type: String }
    }],
    course_topic: [{
        heading: { type: String },
        value: { type: String }
    }],
    seo_title: { type: String },
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
    contact_email: {
        type: String
    },
    isDel: { type: Boolean, default: false }
})

CourseSchema.plugin(mongoosePaginate);


const CourseCategorySchema = new mongoose.Schema({
    name: { type: String },
    logo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FileUpload"
    },
    remark: { type: String },
    order_no: { type: Number },
    status: { type: String },
    isDel: { type: Boolean, default: false }
}, { timestamps: true })

CourseCategorySchema.plugin(mongoosePaginate);

CourseDropDownSchema = new mongoose.Schema({
    name: { type: String },
    remark: { type: String },
    order_no: { type: Number },
    status: { type: String },
    isDel: { type: Boolean },
}, { timestamps: true });

CourseDropDownSchema.plugin(mongoosePaginate);


exports.CourseSchema = CourseSchema;
exports.CourseCategorySchema = CourseCategorySchema;
exports.CourseDropDownSchema = CourseDropDownSchema;