const db = require("../utils/mongooseMethods");
const dbModels = require("../utils/modelName");
const HelperUtils = require("../utils/helper")
const { ERROR_MSG } = require("../utils/const")

exports.TestimonialCreateAndEdit = async (req, res) => {
    try {
        if (!req.body._id) {
            //firstc check name already existed in system
            //create new client
            let newTestimonial = await db.insertOne({
                collection: dbModels.Testimonial,
                document: req.body
            })
            res.send(HelperUtils.success("Successfully created", newTestimonial));
            return;
        }
        else {
            //update the client
            let id = req.body._id;
            delete req.body._id;

            let updateTestimonial = await db.findOneAndUpdate({
                collection: dbModels.Testimonial,
                update: req.body,
                options: { new: true },
            })
            res.send(HelperUtils.success("Successfully updated", updateTestimonial));
            return;
        }
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.TestimonialById = async (req, res) => {
    try {
        let testimonial = await db.findOne({
            collection: dbModels.Testimonial,
            query: { _id: req.params.id },
            populate: [
                { path: "image", select: "filepath" },
                { path: "course", select: "title" }
            ]
        });
        res.send(HelperUtils.success("Successfuly get Testimonial", testimonial));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.TestimonialDelete = async (req, res) => {
    try {
        await db.findOneAndUpdate({
            collection: dbModels.Testimonial,
            query: { _id: req.params.id },
            update: { isDel: true, status: "Inactive" }
        })
        res.send(HelperUtils.success("Successfully deleted Testimonial"));
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.TestimonialAll = async (req, res) => {
    try {
        let query = { isDel: false };
        if (req.body.status) query.status = req.body.status;
        if (req.body.search) query.name = new RegExp(req.body.search, "i");
        let allTestimonials = await db.find({
            collection: dbModels.Testimonial,
            query: query,
            populate: [
                { path: "image", select: "filepath" },
                { path: "course", select: "title" },
            ]
        })
        res.send(HelperUtils.success("Successfully get list", allTestimonials));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.TestimonialList = async (req, res) => {
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
                populate: [
                    { path: "image", select: "filepath" },
                    { path: "course", select: "title" },
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