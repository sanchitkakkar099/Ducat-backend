const db = require("../utils/mongooseMethods");
const dbModels = require("../utils/modelName");
const HelperUtils = require("../utils/helper")
const { ERROR_MSG } = require("../utils/const")

exports.GalleryCreateAndEdit = async (req, res) => {
    try {
        if (!req.body._id) {
            //firstc check name already existed in system
            //create new client
            let newgallery = await db.insertOne({
                collection: dbModels.Gallery,
                document: req.body
            })
            res.send(HelperUtils.success("Successfully created", newgallery));
            return;
        }
        else {
            //update the client
            let id = req.body._id;
            delete req.body._id;

            let updateGallery = await db.findOneAndUpdate({
                collection: dbModels.Gallery,
                query: { _id: id },
                update: req.body,
                options: { new: true },
            })
            res.send(HelperUtils.success("Successfully updated", updateGallery));
            return;
        }
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.GalleryById = async (req, res) => {
    try {
        let Gallery = await db.findOne({
            collection: dbModels.Gallery,
            query: { _id: req.params.id },
            populate: [
                { path: "image", select: "filepath" }
            ]
        });
        res.send(HelperUtils.success("Successfuly get Gallery", Gallery));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.GallleryDelete = async (req, res) => {
    try {
        await db.findOneAndUpdate({
            collection: dbModels.Gallery,
            query: { _id: req.params.id },
            update: { isDel: true, status: "Inactive" }
        })
        res.send(HelperUtils.success("Successfully deleted Gallery"));
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.GalleryAll = async (req, res) => {
    try {
        let query = { isDel: false };
        if (req.body.status) query.status = req.body.status;
        if (req.body.search) query.name = new RegExp(req.body.search, "i");
        let allGallerys = await db.find({
            collection: dbModels.Gallery,
            query: query,
            populate: [
                { path: "image", select: "filepath" }
            ]
        })
        res.send(HelperUtils.success("Successfully get list", allGallerys));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.GalleryList = async (req, res) => {
    try {
        let query = { isDel: false }
        if (req.body.status) query.status = req.body.status;
        if (req.body.search) query.name = new RegExp(req.body.search, "i");

        let result = await db.paginate({
            collection: dbModels.Gallery,
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