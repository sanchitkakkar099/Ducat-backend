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
            if (!course) {
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
        if (courseObj && courseObj.course_category) courseObj.course_category = {
            label: courseObj.course_category.name,
            value: courseObj.course_category._id
        }

        if (courseObj && courseObj.status) courseObj.status = {
            label: courseObj.status,
            value: courseObj.status
        }
        if (courseObj && courseObj.popular) courseObj.popular = {
            label: courseObj.popular,
            value: courseObj.popular
        }
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
        if (!course) {
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
        let query = { isDel: false }

        if (req.body.status) query.status = req.body.status;
        if (req.body.course_category) query.course_category = req.body.course_category;

        if (req.body.search) query.title = new RegExp(req.body.search, 'i')

        let result = await db.paginate({
            collection: models.Course,
            query: query,
            options: {
                populate: [
                    { path: 'course_category', select: "name" },
                    { path: "image", select: "filepath path fieldname originalname mimetype" },
                    { path: "cover_image", select: "filepath path fieldname originalname mimetype" },
                    { path: "pdf_file", select: "filepath path fieldname originalname mimetype" }
                ],
                page: (req.body.page) ? req.body.page : 1,
                limit: (req.body.limit) ? req.body.limit : 10,
                sort: { order_no: 1 }
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

        let pipeline = []
        if (req.query.status) {
            pipeline.push({ $match: { status: req.query.status, isDel: false } })
        } else pipeline.push({ $match: { status: "Active", isDel: false } });
        pipeline.push({
            $project: {
                label: "$title",
                value: "$_id",
            }
        })

        console.log(JSON.stringify(pipeline, null, 2))
        let result = await db.aggregate({
            collection: models.Course,
            pipeline: pipeline,
            options: { sort: { order_no: 1 } }
        })
        res.send(HelperUtils.success("Successfully get category", result));
        return
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
    }
}

exports.getcourselistbycategoryid = async (req, res) => {
    try {
        let query = { isDel: false }
        if (req.body.categoryid) query.course_category = req.body.categoryid
        let courselist = await db.find({
            collection: models.Course,
            query: query,
            populate: [{
                path: "image"
            }],
            sort: { order_no: 1 },
        })
        res.send(HelperUtils.success("Successfully get course list", courselist))
    } catch (error) {
        HelperUtils.errorRes(res, "Internal server error", {})
    }
}

exports.coursecsv = async (req, res) => {
    try {
        let query = { isDel: false }
        if (req.body.search) query.title = new RegExp(req.body.search, 'i')
        let pipeline = [
            {
                $match: query
            },
            {
                $lookup: {
                    from: 'coursecategories',
                    localField: 'course_category',
                    foreignField: '_id',
                    as: 'course_category',
                }
            },
            {
                $unwind: "$course_category"
            },
            {
                $project: {
                    title: 1,
                    category: "$course_category.name",
                    remark: 1,
                    status: 1,
                    seo_url: 1,
                    order_no: 1,
                    popular: 1
                }
            }
        ]
        let data = await db.aggregate({
            collection: models.Course,
            pipeline: pipeline,
            options:
            {
                sort: { order_no: 1 }
            }
        })
        let page = 1, limit = 10;
        if (req.body.page) page = req.body.page;
        if (req.body.limit) limit = req.body.limit;
        data = data.slice((page - 1) * limit, page * limit);
        let keys = ["Title", "Seo Url", "Category", "Sort", "Popular", "Remark", "Status"]
        let filename = `course${Date.now()}.csv`
        let filepath = await HelperUtils.generatecsv(filename, keys, data)
        let s3url = await HelperUtils.uploadfileToS3(filepath, "course.csv")
        return res.send(HelperUtils.success("Successsfully get course list", s3url))
    } catch (error) {
        HelperUtils.errorRes(res, "Internal server error", error.message)
    }
}