const db = require("../../utils/mongooseMethods");
const dbModels = require("../../utils/modelName");
const HelperUtils = require("../../utils/helper");
const { ERROR_MSG } = require("../../utils/const")

exports.createCategory = async (req, res) => {
    try {
        let category = await db.findOne({
            collection: dbModels.CourseCategory,
            query: { name: req.body.name }
        })
        if (category) {
            res.send(HelperUtils.error("Already Exists", {}));
            return;
        }
        let newCategory = await db.insertOne({
            collection: dbModels.CourseCategory,
            document: req.body
        })
        res.send(HelperUtils.success("Successfully created", newCategory));
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
    }
}


exports.categoryList = async (req, res) => {
    try {
        let result = await db.find({
            collection: dbModels.CourseCategory,
            query: {}
        })
        res.send(HelperUtils.success("Successfully Retrieved list", result));
        return
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
    }
}