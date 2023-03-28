const mongoose = require("mongoose");

const models = require("../utils/modelName")
const { FormFieldsSchema, FormHeadersSchema } = require("./appsetting")
const { CourseSchema, CourseCategorySchema, CourseDropDownSchema } = require("./course")
const { CenterSchema } = require("./center")
const { EnquiriesSchema } = require("./enquery");
const { Enquiry } = require("../utils/modelName");

const dbModels = {
    FormHeader: mongoose.model(models.FormHeader, FormHeadersSchema),
    FormField: mongoose.model(models.FormField, FormFieldsSchema),
    Course: mongoose.model(models.Course, CourseSchema),
    CourseCategory: mongoose.model(models.CourseCategory, CourseCategorySchema),
    CourseDropDown: mongoose.model(models.CourseDropDown, CourseDropDownSchema),
    Center: mongoose.model(models.Center, CenterSchema),
    Enquiry: mongoose.model(models.Enquiry, EnquiriesSchema),
}


module.exports = dbModels