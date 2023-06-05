const mongoose = require("mongoose")
const mongoosepaginate = require("mongoose-paginate-v2")

const UserSchema = new mongoose.Schema({
    fname: { type: String },
    lname: { type: String },
    email: { type: String },
    phone: { type: String },
    password: { type: String },
    isact: { type: Boolean, default: true },
    isdel: { type: Boolean, default: false },
    role: {
        type: String, enum: [
            "Super Admin",
            "Manager",
            "Sub Admin"
        ]
    }
}, { timestamps: true, strict: true })

exports.UserSchema = UserSchema