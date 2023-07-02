
const db = require("../utils/mongooseMethods");
const dbModels = require("../utils/modelName");
const HelperUtils = require("../utils/helper");
const { ERROR_MSG } = require("../utils/const")

exports.certificateCreateEdit = async (req, res) => {
    try {
        if (!req.body._id) {
            let certificate = await db.findOne({
                collection: dbModels.Certificate,
                query: { name: req.body.name }
            })
            if (certificate) {
                res.send(HelperUtils.error("Already Exists", {}));
                return;
            }
            let newcertificate = await db.insertOne({
                collection: dbModels.Certificate,
                document: req.body
            })
            res.send(HelperUtils.success("Successfully created", newcertificate));
        } else {
            let id = req.body._id;
            delete req.body._id;
            let updated = await db.findOneAndUpdate({
                collection: dbModels.Certificate,
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


exports.certificateById = async (req, res) => {
    try {
        console.log(req.params.id)
        let certificateObj = await db.findOne({
            collection: dbModels.Certificate,
            query: { _id: req.params.id },
            populate: [
                { path: "course" },
                { path: "center" },
            ]
        })
        if (certificateObj && certificateObj.status) certificateObj.status = {
            label: certificateObj.status,
            value: certificateObj.status
        }

        res.send(HelperUtils.success("Successfully get certificate", certificateObj));
        return
    } catch (error) {
        return res.send(HelperUtils.error(ERROR_MSG, error.message));
    }

}



exports.certificateDelete = async (req, res) => {
    try {
        //first check available in system
        let certificate = await db.findOne({
            collection: dbModels.Certificate,
            query: { _id: req.params.id }
        });
        if (!certificate) {
            res.send(HelperUtils.error("Certificate Not Found", {}));
            return;
        }
        await db.updateOne({
            collection: dbModels.Certificate,
            query: { _id: req.params.id },
            update: { isDel: true, status: "Inactive" }
        })
        res.send(HelperUtils.success("Successfully deleted ConatctUs", {}));
        return
    } catch (error) {
        return res.send(HelperUtils.error(ERROR_MSG, error.message));
    }
}



exports.certificatelist = async (req, res) => {
    try {
        let query = { isDel: false }

        if (req.body.status) query.status = req.body.status;
        if (req.body.search) query.name = new RegExp(req.body.search, 'i')

        let result = await db.paginate({
            collection: dbModels.Certificate,
            query: query,
            options: {
                populate: [
                    { path: "course" },
                    { path: "center" },
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