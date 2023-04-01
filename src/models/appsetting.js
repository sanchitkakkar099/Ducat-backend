const mongoose = require("mongoose");

AppSettingSchema = new mongoose.Schema({
    settingKey: { type: String, required: true },
    settingValue: mongoose.Schema.Types.Mixed
}, { timestamps: true });


exports.AppSettingSchema = AppSettingSchema