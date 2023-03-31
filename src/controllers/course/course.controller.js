const HelperUtils = require("../../utils/helper")
const db = require("../../utils/mongooseMethods")
const models = require("../../utils/modelName")
const { ERROR_MSG } = require("../../utils/const")
const dbModels = require("../../models")
exports.crouseCreateAndUpdate = async (req, res) => {
    try {
        if (!req.body._id) {
            //check same course available
            let course = await db.findOne({ collection: models.Course, query: { title: req.body.title } })
            if (course) {
                res.send(HelperUtils.error("Already Course available", {}));
                return
            }
            //create new course
            let input = {
                collection: models.Course,
                document: req.body
            }
            let newCourse = await db.insertOne(input)
            res.send(HelperUtils.success("Successfully Course created", newCourse))
            return
        } else {
            //first course available in system
            let course = await db.findOne({
                collection: models.Course,
                query: { _id: req.body._id }
            });
            if (course) {
                res.send(HelperUtils.error("Course Not Found", {}));
                return;
            }
            let updateCourse = await db.findOneAndUpdate({
                collection: models.Course,
                query: { _id: req.body._id },
                update: req.body,
                options: { new: true }
            })
            res.send(HelperUtils.success("Successfully updated", updateCourse));
        }

    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message))
    }
}

exports.getCourseById = async (req, res) => {
    try {
        console.log(req.params.id)
        let courseObj = await db.findOne({
            collection: models.Course,
            query: { _id: req.params.id },
            populate: [
                { path: 'course_category' },
                { path: 'image', select: "filepath" },
                { path: 'cover_image', select: 'filepath' },
                { path: 'pdf_file', select: 'filepath' },
            ]
        })
        res.send(HelperUtils.success("Successfully get Course", courseObj));
        return
    } catch (error) {
        return res.send(HelperUtils.error(ERROR_MSG, error.message));
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        //first course available in system
        let course = await db.findOne({
            collection: models.Course,
            query: { _id: req.params.id }
        });
        if (course) {
            res.send(HelperUtils.error("Course Not Found", {}));
            return;
        }
        await db.updateOne({
            collection: models.Course,
            query: { _id: req.params.id },
            update: { isDel: true, status: "Inactive" }
        })
        res.send(HelperUtils.success("Successfully deleted course", {}));
        return
    } catch (error) {
        return res.send(HelperUtils.error(ERROR_MSG, error.message));

    }
}


exports.CourseList = async (req, res) => {
    try {
        let query = {}

        if (req.body.status) query.status = req.body.status;
        if (req.body.course_category) query.course_category = req.body.course_category;

        if (req.body.search) query.title = new RegExp(req.body.search, 'i')

        let result = await db.paginate({
            collection: models.Course,
            query: query,
            options: {
                populate: { path: 'course_category', select: "name" },
                page: (req.body.page) ? req.body.page : 1,
                limit: (req.body.limit) ? req.body.limit : 10,
                sort: { _id: -1 }
            }
        })
        res.send(HelperUtils.success("Successfully get list", result));
        return
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG), error.message);
        return;
    }
}

exports.CourseForDropDown = async (req, res) => {
    try {
        console.log("------------------")
        let pipeline = []
        if (req.query.status) {
            pipeline.push({ $match: { status: req.query.status, isDel: false } })
        } else pipeline.push({ $match: { status: "Active", isDel: false } });
        pipeline.push({
            $project: {
                label: "$title",
                value: "$title",
            }
        })
        console.log(JSON.stringify(pipeline, null, 2))
        let result = await db.aggregate({
            collection: models.Course,
            pipeline: pipeline
        })
        res.send(HelperUtils.success("Successfully get category", result));
        return
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
    }
}