const db = require("../utils/mongooseMethods");
const dbModels = require("../utils/modelName");
const HelperUtils = require("../utils/helper")
const { ERROR_MSG } = require("../utils/const")

exports.ClientCreateAndEdit = async (req, res) => {
    try {
        if (!req.body._id) {
            //firstc check name already existed in system
            //create new client
            let newClient = await db.insertOne({
                collection: dbModels.Client,
                document: req.body
            })
            res.send(HelperUtils.success("Successfully created", newClient));
            return;
        }
        else {
            //update the client
            let id = req.body._id;
            delete req.body._id;

            let updateClient = await db.findOneAndUpdate({
                collection: dbModels.Client,
                query: { _id: id },
                update: req.body,
                options: { new: true },
            })
            res.send(HelperUtils.success("Successfully updated", updateClient));
            return;
        }
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.ClientById = async (req, res) => {
    try {
        let client = await db.findOne({
            collection: dbModels.Client,
            query: { _id: req.params.id },
            populate: { path: "image", select: "filepath" }
        });
        res.send(HelperUtils.success("Successfuly get Client", client));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.ClientDelete = async (req, res) => {
    try {
        await db.findOneAndUpdate({
            collection: dbModels.Client,
            query: { _id: req.params.id },
            update: { isDel: true, status: "Inactive" }
        })
        res.send(HelperUtils.success("Successfully deleted Client"));
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.ClientAll = async (req, res) => {
    try {
        let query = { isDel: false };
        if (req.body.status) query.status = req.body.status;
        if (req.body.search) query.name = new RegExp(req.body.search, "i");
        let allClients = await db.find({
            collection: dbModels.Client,
            query: query,
            populate: { path: "image", select: "filepath" }
        })
        res.send(HelperUtils.success("Successfully get list", allClients));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.ClientList = async (req, res) => {
    try {
        let query = { isDel: false }
        if (req.body.status) query.status = req.body.status;
        if (req.body.search) query.name = new RegExp(req.body.search, "i");

        let result = await db.paginate({
            collection: dbModels.Client,
            query: query,
            options: {
                sort: { _id: -1 },
                page: (req.body.page) ? req.body.page : 1,
                limit: (req.body.limit) ? req.body.limit : 10,
                populate: { path: "image", select: "filepath" }
            }
        })
        res.send(HelperUtils.success("Successfully get list", result));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.ClientForDropDown = async (req, res) => {
    try {
        let pipeline = []
        if (req.query.status) {
            pipeline.push({ $match: { status: req.query.status, isDel: false } });
        } else pipeline.push({ $match: { status: "Active", isDel: false } });
        pipeline.push({
            $project: {
                label: "$title",
                value: "$title",
            }
        })
        let result = await db.aggregate({
            collection: dbModels.Client,
            pipeline: pipeline
        })
        res.send(HelperUtils.success("Successfully get category", result));
        return
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
    }
}