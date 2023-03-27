const mongoose = require("mongoose");

const models = require("../utils/modelName")
const { FormFieldsSchema, FormHeadersSchema } = require("./appsetting")
const { CourseSchema } = require("./course")

const dbModels = {
    FormHeader: mongoose.model(models.FormHeader, FormHeadersSchema),
    FormField: mongoose.model(models.FormField, FormFieldsSchema),
    Course: mongoose.model(models.Course, CourseSchema),
}


module.exports = dbModels