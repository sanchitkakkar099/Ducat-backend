const HelperUtils = require("../utils/helper")

const db = require("../utils/mongooseMethods")
const dbModels = require("../utils/modelName")
const constants = require("../utils/const")

exports.ConfigurationsEmail = async (req, res) => {
    try {
        let data = await db.findOne({
            collection: dbModels.AppSetting,
            query: { settingKey: constants.ConfigurationEmail },
            project: 'settingValue _id'

        })
        if (data && data.settingValue) data = { ...data.settingValue }
        res.send(HelperUtils.success("successfully", data));
    } catch (error) {
        HelperUtils.error("Internal Server Error", error.message);
    }
}

exports.ConfigurationsEmailUpdate = async (req, res) => {
    try {
        let data = await db.findOneAndUpdate({
            collection: dbModels.AppSetting,
            query: { settingKey: constants.ConfigurationEmail },
            update: { settingValue: req.body, settingKey: constants.ConfigurationEmail },
            options: { new: true, upsert: true }
        })

        res.send(HelperUtils.success("successfully updated", data));
    } catch (error) {
        HelperUtils.error("Internal Server Error", error.message);
    }
}
exports.GetSettingValueByKey = async (req, res) => {
    try {
        let data = await db.findOne({
            collection: dbModels.AppSetting,
            query: { settingKey: constants[req.params.key] },
            project: 'settingValue _id'

        })
        // if (data && data.settingValue) data = { ...data.settingValue }
        res.send(HelperUtils.success("successfully", data));
    } catch (error) {
        HelperUtils.error("Internal Server Error", error.message);
    }
}

exports.UpdateSettingByKey = async (req, res) => {
    try {
        let data = await db.findOneAndUpdate({
            collection: dbModels.AppSetting,
            query: { settingKey: constants[req.params.key] },
            update: { settingValue: req.body, settingKey: constants[req.params.key] },
            options: { new: true, upsert: true }
        })

        res.send(HelperUtils.success("successfully updated", data));
    } catch (error) {
        HelperUtils.error("Internal Server Error", error.message);
    }
}