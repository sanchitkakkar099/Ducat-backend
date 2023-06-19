const db = require("../../utils/mongooseMethods");
const dbModels = require("../../utils/modelName");
const HelperUtils = require("../../utils/helper");
const { ERROR_MSG } = require("../../utils/const")

exports.createCategory = async (req, res) => {
    try {
        if (!req.body._id) {
            let category = await db.findOne({
                collection: dbModels.CourseCategory,
                query: { name: req.body.name }
            })
            if (category) {
                res.send(HelperUtils.error("Already Exists", {}));
                return;
            }
            let newCategory = await db.insertOne({
                collection: dbModels.CourseCategory,
                document: req.body
            })
            res.send(HelperUtils.success("Successfully created", newCategory));
        } else {
            let id = req.body._id;
            delete req.body._id;
            let updated = await db.findOneAndUpdate({
                collection: dbModels.CourseCategory,
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


exports.CategoryAll = async (req, res) => {
    try {
        let result = await db.find({
            collection: dbModels.CourseCategory,
            query: (req.body.search) ? { name: new RegExp(req.body.search, "i") } : {},
            populate: { path: "logo" }
        })
        res.send(HelperUtils.success("Successfully Retrieved list", result));
        return
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
    }
}

exports.CategoryList = async (req, res) => {
    try {
        let query = { isDel: false }
        if (req.body.status) query.status = req.body.status;
        if (req.body.search) query.name = new RegExp(req.body.search, "i")
        let result = await db.paginate({
            collection: dbModels.CourseCategory,
            query: query,
            options: {
                page: (req.body.page) ? req.body.page : 1,
                limit: (req.body.limit) ? req.body.limit : 10,
                sort: { order_no: 1 },
                populate: { path: "logo" }
            }
        })
        res.send(HelperUtils.success("Successfully get category list", result));
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
    }
}

exports.CategoryById = async (req, res) => {
    try {
        let category = await db.findOne({
            collection: dbModels.CourseCategory,
            query: { _id: req.params.id },
            populate: { path: "logo" }
        })
        res.send(HelperUtils.success("Successfully get category", category))
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.CategoryDelete = async (req, res) => {
    try {
        await db.findOneAndUpdate({
            collection: dbModels.CourseCategory,
            query: { _id: req.params.id },
            update: { isDel: true, status: "Inactive" }
        })
        res.send(HelperUtils.success("Successfully delete Category", {}));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.CategoryForDropDown = async (req, res) => {
    try {
        let pipeline = []
        if (req.query.status) {
            pipeline.push({ $match: { status: req.query.status, isDel: false } })
        } else pipeline.push({ $match: { status: "Active", isDel: false } })
        pipeline.push({
            $project: {
                label: "$name",
                value: "$_id",
            }
        })

        let result = await db.aggregate({
            collection: dbModels.CourseCategory,
            pipeline: pipeline,
            options: { sort: { order_no: 1 } }
        })
        res.send(HelperUtils.success("Successfully get category", result));
        return
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
    }
}


exports.getcoursescategories = async (req, res) => {
    try {
        let categories = await db.find({
            collection: dbModels.CourseCategory,
            query: { isDel: false },
            project: { name: 1 }
        })
        for (let i = 0; i < categories.length; i++) {
            const element = categories[i];
            categories[i].course = await db.find({
                collection: dbModels.Course,
                query: { course_category: element._id },
                project: { title: 1 }
            })
        }
        res.send(HelperUtils.success("Successfully get list", categories))
    } catch (error) {
        console.log(error)
        res.status(400).send(HelperUtils.error(ERROR_MSG, error.message));
    }
}

exports.categorycourseslistwithpagination = async (req, res) => {
    try {

        let query = { isDel: false }
        if (req.body.status) query.status = req.body.status;
        if (req.body.search) query.name = new RegExp(req.body.search, "i")
        let result = await db.paginate({
            collection: dbModels.CourseCategory,
            query: query,
            options: {
                page: (req.body.page) ? req.body.page : 1,
                limit: (req.body.limit) ? req.body.limit : 10,
                //sort: { _id: -1 },
                populate: { path: "logo" },
                lean: true,
                sort: { order_no: 1 }
            }
        })

        for (let i = 0; i < result.docs.length; i++) {
            const element = result.docs[i];
            result.docs[i].course = await db.find({
                collection: dbModels.Course,
                query: { course_category: element._id },
                //project: { title: 1 }
                populate: [
                    //{ path: 'course_category', select: "name" },
                    { path: "image", select: "filepath path fieldname originalname mimetype" },
                    { path: "cover_image", select: "filepath path fieldname originalname mimetype" },
                    { path: "pdf_file", select: "filepath path fieldname originalname mimetype" }
                ],
            })

        }
        res.send(HelperUtils.success("successfully get list", result))
    } catch (error) {
        console.log(error)
        res.status(400).send(HelperUtils.error(ERROR_MSG, error.message));
    }
}




exports.coursescategoriescsv = async (req, res) => {
    try {
        let query = { isDel: false }
        if (req.body.search) query.title = new RegExp(req.body.search, 'i')
        let categories = await db.find({
            collection: dbModels.CourseCategory,
            query: query,
            project: { name: 1, status: 1, remark: 1, order_no: 1 },
            sort: { order_no: 1 },
        })
        let keys = ["Name", "Sort", "Remark", "Status"]
        let filename = "coursecategory" + Date.now() + ".csv"
        let filepath = await HelperUtils.generatecsv(filename, keys, categories)
        let s3url = await HelperUtils.uploadfileToS3(filepath, 'coursecategory.csv')
        res.send(HelperUtils.success("Successfully get list", s3url))
    } catch (error) {
        console.log(error)
        res.status(400).send(HelperUtils.error(ERROR_MSG, error.message));
    }
}