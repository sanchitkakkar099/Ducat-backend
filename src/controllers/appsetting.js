const HelperUtils = require("../utils/helper")

const db = require("../utils/mongooseMethods")
const dbModels = require("../utils/modelName")

exports.formHeadersCreate = async (req, res) => {
    try {

        let formHeaders = await db.insertOne(dbModels.FormHeader, req.body)
        res.send(HelperUtils.success("Successfully created", formHeaders));
    } catch (error) {
        res.send(HelperUtils.error("Internal Server Error", error.message, 500));
    }
}


exports.createFormFeild = async (req, res) => {
    try {
        let fields = await db.insertOne(dbModels.FormField, req.body, {});
        res.send(HelperUtils.success("Successfully created", fields));
    } catch (error) {
        res.send(HelperUtils.error("Internal Server Error", error.message));
    }
}