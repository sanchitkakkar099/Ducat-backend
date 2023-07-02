
const db = require("../utils/mongooseMethods");
const dbModels = require("../utils/modelName");
const HelperUtils = require("../utils/helper");
const { ERROR_MSG } = require("../utils/const")

exports.jobapplyCreateEdit = async (req, res) => {
    try {
        if (!req.body._id) {
            let jobapply = await db.findOne({
                collection: dbModels.JobApplication,
                query: { name: req.body.name }
            })
            if (jobapply) {
                res.send(HelperUtils.error("Already Exists", {}));
                return;
            }
            let newJobapplication = await db.insertOne({
                collection: dbModels.JobApplication,
                document: req.body
            })
            res.send(HelperUtils.success("Successfully created", newJobapplication));
        } else {
            let id = req.body._id;
            delete req.body._id;
            let updated = await db.findOneAndUpdate({
                collection: dbModels.JobApplication,
                query: { _id: id },
                update: req.body,
                options: {
                    new: true
                }
            })
            res.send(HelperUtils.success("Updated", updated));
            return
        }
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
    }
}


exports.jobapplyById = async (req, res) => {
    try {
        console.log(req.params.id)
        let jobapplication = await db.findOne({
            collection: dbModels.JobApplication,
            query: { _id: req.params.id },
            populate: [
                { path: "course" },
                { path: "center" },
                { path: "resume" },
            ]
        })
        if (jobapplication && jobapplication.status) jobapplication.status = {
            label: jobapplication.status,
            value: jobapplication.status
        }

        res.send(HelperUtils.success("Successfully get certificate", jobapplication));
        return
    } catch (error) {
        return res.send(HelperUtils.error(ERROR_MSG, error.message));
    }

}



exports.jobapplicationDelete = async (req, res) => {
    try {
        //first check available in system
        let jobapply = await db.findOne({
            collection: dbModels.JobApplication,
            query: { _id: req.params.id }
        });
        if (!jobapply) {
            res.send(HelperUtils.error("Job Application Not Found", {}));
            return;
        }
        await db.updateOne({
            collection: dbModels.JobApplication,
            query: { _id: req.params.id },
            update: { isDel: true, status: "Inactive" }
        })
        res.send(HelperUtils.success("Successfully deleted JobApplication", {}));
        return
    } catch (error) {
        return res.send(HelperUtils.error(ERROR_MSG, error.message));
    }
}



exports.jobapplicationlist = async (req, res) => {
    try {
        let query = { isDel: false }

        if (req.body.status) query.status = req.body.status;
        if (req.body.search) query.name = new RegExp(req.body.search, 'i')

        let result = await db.paginate({
            collection: dbModels.JobApplication,
            query: query,
            options: {
                populate: [
                    { path: "course" },
                    { path: "center" },
                    { path: "resume" },
                ],
                page: (req.body.page) ? req.body.page : 1,
                limit: (req.body.limit) ? req.body.limit : 10,
                sort: { order_no: 1 }
            }
        })
        res.send(HelperUtils.success("Successfully get list", result));
        return
    } catch (error) {
        return HelperUtils.errorRes(res, ERROR_MSG, error.message)
    }
}