const mongoose = require("mongoose")

const formHeadersSchema = new mongoose.Schema({
    name: { type: String },
    display_Name: { type: String },
    screen: { type: String }
}, { timestamps: true, strict: false })



const FormFieldsSchema = new mongoose.Schema({
    name: { type: String },
    display_Name: { type: String },
    screen: { type: String },
    field_name: { type: String },
    field_type: { type: String },
    section: {
        type: mongoose.Types.ObjectId,
        ref: "FormHeader"
    }

}, { timestamps: true, strict: false })



exports.FormHeadersSchema = formHeadersSchema
exports.FormFieldsSchema = FormFieldsSchema