const db = require("../utils/mongooseMethods");
const dbModels = require("../utils/modelName");
const HelperUtils = require("../utils/helper")
const { ERROR_MSG } = require("../utils/const")

exports.RegistrationCreateAndEdit = async (req, res) => {
    try {
        if (!req.body._id) {
            //create new Register
            let newRegister = await db.insertOne({
                collection: dbModels.Registration,
                document: req.body
            })
            res.send(HelperUtils.success("Successfully created", newRegister));
            return;
        }
        else {
            //update the rehgister
            let id = req.body._id;
            delete req.body._id;

            let updateregister = await db.findOneAndUpdate({
                collection: dbModels.Registration,
                query: { _id: id },
                update: req.body,
                options: { new: true },
            })
            res.send(HelperUtils.success("Successfully updated", updateregister));
            return;
        }
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.RegisterById = async (req, res) => {
    try {
        let Register = await db.findOne({
            collection: dbModels.Registration,
            query: { _id: req.params.id }
        });
        res.send(HelperUtils.success("Successfuly get registeration", Register));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.RegisterDelete = async (req, res) => {
    try {
        await db.findOneAndUpdate({
            collection: dbModels.Registration,
            query: { _id: req.params.id },
            update: { isDel: true, status: "Inactive" }
        })
        res.send(HelperUtils.success("Successfully deleted Registration"));
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.RegisterAll = async (req, res) => {
    try {
        let query = { isDel: false };
        if (req.body.status) query.status = req.body.status;
        if (req.body.search) query.name = new RegExp(req.body.search, "i");
        let allRegisterations = await db.find({
            collection: dbModels.Registration,
            query: query
        })
        res.send(HelperUtils.success("Successfully get list", allRegisterations));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.RegisterList = async (req, res) => {
    try {
        let query = { isDel: false }
        if (req.body.status) query.status = req.body.status;
        if (req.body.search) query.name = new RegExp(req.body.search, "i");

        let result = await db.paginate({
            collection: dbModels.Registration,
            query: query,
            options: {
                sort: { _id: -1 },
                page: (req.body.page) ? req.body.page : 1,
                limit: (req.body.limit) ? req.body.limit : 10,
            }
        })
        res.send(HelperUtils.success("Successfully get list", result));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}