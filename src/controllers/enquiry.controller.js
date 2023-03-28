const db = require("../utils/mongooseMethods");
const dbModels = require("../utils/modelName");
const HelperUtils = require("../utils/helper");
const { ERROR_MSG } = require("../utils/const");


exports.createEnquiryAndEdit = async (req, res) => {
    try {
        if (!req.body._id) {
            //create new enquiry form for admin
            let newEnquiry = await db.insertOne({
                collection: dbModels.Enquiry,
                document: req.body
            })
            res.send(HelperUtils.success("Succcessfully Enquiry Submitted", newEnquiry));
            return;
        } else {
            let id = req.body._id
            delete req.body._id
            //update the existing enquiry
            let update = await db.findOneAndUpdate({
                collection: dbModels.Enquiry,
                query: { _id: id },
                update: req.body,
                options: {
                    new: true
                }
            })
            res.send(HelperUtils.success("Successfully updated", update));
            return
        }

    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.EnquiryById = async (req, res) => {
    try {
        let enquiry = await db.findOne({
            collection: dbModels.Enquiry,
            query: { _id: req.params.id },
            populate: [
                { path: "center" },
                { path: "course" }
            ]
        })
        res.send(HelperUtils.success("Successfully get Enquiry", enquiry));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}


exports.EnquiryDelete = async (req, res) => {
    try {
        await db.deleteOne({
            collection: dbModels.Enquiry,
            query: { _id: req.params.id }
        })
        res.send(HelperUtils.success("Successfully Deleted the  enquiry"));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.EnquiryAll = async (req, res) => {
    try {
        let query = { isDel: false }
        if (req.body.status) query.status = req.body.status
        let data = await db.find({
            collection: dbModels.Enquiry,
            query: query
        })
        res.send(HelperUtils.success("Successfully get list", data));
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.EnquiryList = async (req, res) => {
    try {
        let query = { isDel: false }
        if (req.body.status) query.status = req.body.status
        if (req.body.search) {
            query['$or'] = []
            query['$or'].push({ name: new RegExp(req.body.search, "i") });
            query['$or'].push({ email: new RegExp(req.body.search, "i") });
            query['$or'].push({ phone: new RegExp(req.body.search, "i") });
        }

        let result = await db.paginate({
            collection: dbModels.Enquiry,
            query: query,
            options: {
                page: (req.body.page) ? req.body.page : 1,
                limit: (req.body.limit) ? req.body.limit : 10,
                sort: { _id: -1 },
                populate: [
                    { path: "center" },
                    { path: "course" }
                ]
            }
        })
        res.send(HelperUtils.success("Successfully get Enquiries", result));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}