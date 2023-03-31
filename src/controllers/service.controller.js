const db = require("../utils/mongooseMethods");
const dbModels = require("../utils/modelName");
const HelperUtils = require("../utils/helper")
const { ERROR_MSG } = require("../utils/const")

exports.ServiceCreateAndEdit = async (req, res) => {
    try {
        if (!req.body._id) {
            //firstc check name already existed in system
            //create new client
            let newService = await db.insertOne({
                collection: dbModels.Service,
                document: req.body
            })
            res.send(HelperUtils.success("Successfully created", newService));
            return;
        }
        else {
            //update the client
            let id = req.body._id;
            delete req.body._id;

            let updateService = await db.findOneAndUpdate({
                collection: dbModels.Service,
                query: { _id: id },
                update: req.body,
                options: { new: true },
            })
            res.send(HelperUtils.success("Successfully updated", updateService));
            return;
        }
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.ServiceById = async (req, res) => {
    try {
        let service = await db.findOne({
            collection: dbModels.Service,
            query: { _id: req.params.id },
            populate: [
                { path: "image", select: "filepath" }
            ]
        });
        res.send(HelperUtils.success("Successfuly get Service", service));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.ServiceDelete = async (req, res) => {
    try {
        await db.findOneAndUpdate({
            collection: dbModels.Service,
            query: { _id: req.params.id },
            update: { isDel: true, status: "Inactive" }
        })
        res.send(HelperUtils.success("Successfully deleted Service"));
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.ServiceAll = async (req, res) => {
    try {
        let query = { isDel: false };
        if (req.body.status) query.status = req.body.status;
        if (req.body.search) query.name = new RegExp(req.body.search, "i");
        let allServices = await db.find({
            collection: dbModels.Service,
            query: query,
            populate: [
                { path: "image", select: "filepath" }
            ]
        })
        res.send(HelperUtils.success("Successfully get list", allServices));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.ServiceList = async (req, res) => {
    try {
        let query = { isDel: false }
        if (req.body.status) query.status = req.body.status;
        if (req.body.search) query.name = new RegExp(req.body.search, "i");

        let result = await db.paginate({
            collection: dbModels.Service,
            query: query,
            options: {
                sort: { _id: -1 },
                page: (req.body.page) ? req.body.page : 1,
                limit: (req.body.limit) ? req.body.limit : 10,
                populate: [
                    { path: "image", select: "filepath" },
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