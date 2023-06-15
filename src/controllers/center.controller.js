const db = require("../utils/mongooseMethods");
const dbModels = require("../utils/modelName");
const HelperUtils = require("../utils/helper")
const { ERROR_MSG } = require("../utils/const")

exports.CenterCreateAndEdit = async (req, res) => {
    try {
        if (!req.body._id) {
            //create new center
            let newCenter = await db.insertOne({
                collection: dbModels.Center,
                document: req.body
            })
            res.send(HelperUtils.success("Successfully created", newCenter));
            return;
        }
        else {
            //update the center
            let id = req.body._id;
            delete req.body._id;

            let updateCenter = await db.findOneAndUpdate({
                collection: dbModels.Center,
                query: { _id: id },
                update: req.body,
                options: { new: true },
            })
            res.send(HelperUtils.success("Successfully updated", updateCenter));
            return;
        }
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.CenterById = async (req, res) => {
    try {
        let center = await db.findOne({
            collection: dbModels.Center,
            query: { _id: req.params.id },
            populate: [
                { path: "image", select: "fieldname originalname mimetype filename filepath size" }
            ]
        });
        res.send(HelperUtils.success("Successfuly get Ecnter", center));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.CenterDelete = async (req, res) => {
    try {
        await db.findOneAndUpdate({
            collection: dbModels.Center,
            query: { _id: req.params.id },
            update: { isDel: true, status: "Inactive" }
        })
        res.send(HelperUtils.success("Successfully deleted Center"));
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.CenterAll = async (req, res) => {
    try {
        let query = { isDel: false };
        if (req.body.status) query.status = req.body.status;
        if (req.body.search) query.title = new RegExp(req.body.search, "i");
        let allCenters = await db.find({
            collection: dbModels.Center,
            query: query,
            populate: [
                { path: "image", select: "fieldname originalname mimetype filename filepath size" }
            ],
            sort: { order_no: 1 },
        })
        res.send(HelperUtils.success("Successfully get list", allCenters));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.CenterList = async (req, res) => {
    try {
        let query = { isDel: false }
        if (req.body.status) query.status = req.body.status;
        if (req.body.search) query.title = new RegExp(req.body.search, "i");

        let result = await db.paginate({
            collection: dbModels.Center,
            query: query,
            options: {
                sort: { order_no: 1 },
                page: (req.body.page) ? req.body.page : 1,
                limit: (req.body.limit) ? req.body.limit : 10,
                populate: [
                    { path: "image", select: "fieldname originalname mimetype filename filepath size" }
                ]
            }
        })
        res.send(HelperUtils.success("Successfully get list", result));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.CenterForDropDown = async (req, res) => {
    try {
        let pipeline = []
        if (req.query.status) {
            pipeline.push({ $match: { status: req.query.status, isDel: false } })
        } else pipeline.push({ $match: { status: "Active", isDel: false } })
        pipeline.push({
            $project: {
                label: "$title",
                value: "$_id",
            }
        })
        let result = await db.aggregate({
            collection: dbModels.Center,
            pipeline: pipeline
        })
        res.send(HelperUtils.success("Successfully get category", result));
        return
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
    }
}

exports.centercsvdownload = async (req, res) => {
    try {
        let query = { isDel: false }
        if (req.body.status) query.status = req.body.status;
        if (req.body.search) query.title = new RegExp(req.body.search, "i");

        let result = await db.find({
            collection: dbModels.Center,
            query: query,
            project: {
                title: 1,
                email: 1,
                address: 1,
                status: 1,
                phone: 1,
                order_no: 1,
                remark: 1
            },
            sort: { order_no: 1 },
        })
        let filename = "center" + Date.now() + ".csv"
        let keys = ["Title", "Email", "Phone", "Address", , "Sort", "Status", "Remark"]
        let filepath = await HelperUtils.generatecsv(filename, keys, result)
        let s3url = await HelperUtils.uploadfileToS3(filepath, 'center.csv', 'csv')
        res.send(HelperUtils.success("Successfully get list", s3url));
        return;
    } catch (error) {
        console.log(error)
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}