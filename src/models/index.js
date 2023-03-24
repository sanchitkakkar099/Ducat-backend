const mongoose = require("mongoose");

const models = require("../utils/modelName")
const { FormFieldsSchema, FormHeadersSchema } = require("./appsetting")

const dbModels = {
    FormField: mongoose.model(models.FormField, FormFieldsSchema),
    FormHeader: mongoose.model(models.FormHeader, FormHeadersSchema)
}


module.exports = dbModels