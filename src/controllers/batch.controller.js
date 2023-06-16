const db = require("../utils/mongooseMethods");
const dbModels = require("../utils/modelName");
const HelperUtils = require("../utils/helper");
const { ERROR_MSG } = require("../utils/const");
const mongoose = require("mongoose")


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

        let querymatch = { $match: { isDel: false } }
        if (req.body.status)
            querymatch.$match.status = req.body.status;

        if (req.body.center_id)
            querymatch.$match.center = new mongoose.Types.ObjectId(req.body.center_id);

        let pipeline = [
            { ...querymatch },
            {
                $lookup: {
                    from: 'centers',
                    localField: 'center',
                    foreignField: '_id',
                    as: 'center',
                }
            },
            {
                $unwind: "$center"
            },
            {
                $lookup: {
                    from: 'courses',
                    localField: 'course',
                    foreignField: '_id',
                    as: 'course',
                }
            },
            {
                $unwind: "$course"
            },
            {
                $lookup: {
                    from: 'fileuploads',
                    localField: 'course.image',
                    foreignField: '_id',
                    as: 'course.image',
                }
            },
            {
                $unwind: "$course.image"
            }
        ]

        if (req.body.search) {
            pipeline.push({
                $match: {
                    $or: [
                        { 'course.title': new RegExp(req.body.search, 'i') },
                        { 'center.title': new RegExp(req.body.search, 'i') },
                        { 'trainer': new RegExp(req.body.search, 'i') },
                    ]
                }
            })
        }

        let data = await db.aggregate({
            collection: dbModels.Batch,
            pipeline: pipeline
        })

        let page = 1, limit = 10;
        if (req.body.page) page = req.body.page;
        if (req.body.limit) limit = req.body.limit;
        let pages = Math.ceil(data.length / limit);
        let total = data.length;
        page = 1;
        if (req.body.page) {
            page = req.body.page;
        }
        data = data.slice((page - 1) * limit, page * limit);
        let result = {
            docs: data,
            page: page,
            pages,
            total,
            limit: limit,
        };
        res.send(HelperUtils.success("Successfully get Batch", result));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}


exports.batchcsv = async (req, res) => {
    try {
        let querymatch = { $match: { isDel: false } }
        if (req.body.status)
            querymatch.$match.status = req.body.status;

        if (req.body.center_id)
            querymatch.$match.center = req.body.center_id;

        let pipeline = [
            { ...querymatch },
            {
                $lookup: {
                    from: 'centers',
                    localField: 'center',
                    foreignField: '_id',
                    as: 'center',
                }
            },
            {
                $unwind: "$center"
            },
            {
                $lookup: {
                    from: 'courses',
                    localField: 'course',
                    foreignField: '_id',
                    as: 'course',
                }
            },
            {
                $unwind: "$course"
            },
            {
                $lookup: {
                    from: 'fileuploads',
                    localField: 'course.image',
                    foreignField: '_id',
                    as: 'course.image',
                }
            },
            {
                $unwind: "$course.image"
            },
            {
                $project: {
                    trainer: 1,
                    start_date: 1,
                    course: "$course.title",
                    center: "$center.title",
                    status: 1,
                    remark: 1
                }
            }
        ]

        if (req.body.search) {
            pipeline.push({
                $match: {
                    $or: [
                        { 'course': new RegExp(req.body.search, 'i') },
                        { 'center': new RegExp(req.body.search, 'i') },
                        { 'trainer': new RegExp(req.body.search, 'i') },
                    ]
                }
            })
        }

        let data = await db.aggregate({
            collection: dbModels.Batch,
            pipeline: pipeline
        })
        let filename = "batch" + Date.now() + ".csv"
        let keys = ["Course", "Center", "Trainer", "Time", "Status", "Remark"]
        let filepath = await HelperUtils.generatecsv(filename, keys, data)
        let s3url = await HelperUtils.uploadfileToS3(filepath, "batch.csv")

        return res.send(HelperUtils.success("Successfully get bacth list", s3url))

    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}