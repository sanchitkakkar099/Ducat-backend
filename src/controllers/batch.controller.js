const db = require("../utils/mongooseMethods");
const dbModels = require("../utils/modelName");
const HelperUtils = require("../utils/helper");
const { ERROR_MSG } = require("../utils/const");


exports.BacthCreateAndEdit = async (req, res) => {
    try {
        if (!req.body._id) {
            //create new enquiry form for admin
            let newEnquiry = await db.insertOne({
                collection: dbModels.Batch,
                document: req.body
            })
            res.send(HelperUtils.success("Succcessfully Bacth Created", newEnquiry));
            return;
        } else {
            let id = req.body._id
            delete req.body._id
            //update the existing enquiry
            let update = await db.findOneAndUpdate({
                collection: dbModels.Batch,
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

exports.BatchById = async (req, res) => {
    try {
        let enquiry = await db.findOne({
            collection: dbModels.Batch,
            query: { _id: req.params.id },
            populate: [
                { path: "center" },
                { path: "course" }
            ]
        })
        if (enquiry && enquiry.course) enquiry.course = {
            label: enquiry.course.title,
            value: enquiry.course._id
        }
        if (enquiry && enquiry.center) enquiry.center = {
            label: enquiry.center.title,
            value: enquiry.center._id
        }

        if (enquiry && enquiry.status) enquiry.status = {
            label: enquiry.status,
            value: enquiry.status
        }
        res.send(HelperUtils.success("Successfully Batch Fetch", enquiry));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}


exports.BatchDelete = async (req, res) => {
    try {
        await db.findOneAndUpdate({
            collection: dbModels.Batch,
            query: { _id: req.params.id },
            update: { isDel: true, status: "Inactive" }
        })
        res.send(HelperUtils.success("Successfully Deleted the Batch"));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.BatchAll = async (req, res) => {
    try {
        let query = { isDel: false }
        if (req.body.status) query.status = req.body.status
        let data = await db.find({
            collection: dbModels.Batch,
            query: query
        })
        res.send(HelperUtils.success("Successfully get Batch list", data));
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.BatchList = async (req, res) => {
    try {
        let query = { isDel: false }
        if (req.body.status) query.status = req.body.status


        let result = await db.paginate({
            collection: dbModels.Batch,
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
        res.send(HelperUtils.success("Successfully get Batch", result));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}