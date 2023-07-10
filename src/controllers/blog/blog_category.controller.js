const db = require("../../utils/mongooseMethods");
const dbModels = require("../../utils/modelName");
const HelperUtils = require("../../utils/helper");
const { ERROR_MSG } = require("../../utils/const")

exports.createBlogCategory = async (req, res) => {
    try {
        if (!req.body._id) {
            let category = await db.findOne({
                collection: dbModels.BlogCategory,
                query: { title: req.body.title }
            })
            if (category) {
                res.send(HelperUtils.error("Already Exists", {}));
                return;
            }
            let newCategory = await db.insertOne({
                collection: dbModels.BlogCategory,
                document: req.body
            })
            res.send(HelperUtils.success("Successfully created", newCategory));
        } else {
            let id = req.body._id;
            delete req.body._id;
            let updated = await db.findOneAndUpdate({
                collection: dbModels.BlogCategory,
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


exports.getBlogCategoryById = async (req, res) => {
    try {

        let blogCategory = await db.findOne({
            collection: dbModels.BlogCategory,
            query: { _id: req.params.id },
            populate: [{
                path: "image"
            }]
        })
        if (blogCategory && blogCategory.status) blogCategory.status = {
            label: blogCategory.status,
            value: blogCategory.status
        }
        res.send(HelperUtils.success("Successfully get Blog Category list", blogCategory))
    } catch (error) {
        HelperUtils.errorRes(res, "Internal server error", error.message)
    }
}



exports.deleteBlogCategory = async (req, res) => {
    try {
        //first blog category available in system
        let blog = await db.findOne({
            collection: dbModels.BlogCategory,
            query: { _id: req.params.id }
        });
        if (!blog) {
            res.send(HelperUtils.error("Blog Category Not Found", {}));
            return;
        }
        await db.updateOne({
            collection: dbModels.BlogCategory,
            query: { _id: req.params.id },
            update: { isDel: true, status: "Inactive" }
        })
        res.send(HelperUtils.success("Successfully deleted blog category", {}));
        return
    } catch (error) {
        return res.send(HelperUtils.error(ERROR_MSG, error.message));

    }
}



exports.blogCategoryList = async (req, res) => {
    try {
        let query = { isDel: false }

        if (req.body.status) query.status = req.body.status;

        if (req.body.search) query.title = new RegExp(req.body.search, 'i')

        let result = await db.paginate({
            collection: dbModels.BlogCategory,
            query: query,
            options: {
                populate: [
                    { path: "image", select: "filepath path fieldname originalname mimetype" },
                ],
                page: (req.body.page) ? req.body.page : 1,
                limit: (req.body.limit) ? req.body.limit : 10,
                sort: { order_no: 1 }
            }
        })
        res.send(HelperUtils.success("Successfully get list", result));
        return
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
        }
        else pipeline.push({ $match: { status: "Active", isDel: false } })
        pipeline.push({
            $project: {
                label: "$title",
                value: "$_id",
            }
        })

        let result = await db.aggregate({
            collection: dbModels.BlogCategory,
            pipeline: pipeline,
            options: { sort: { order_no: 1 } }
        })
        res.send(HelperUtils.success("Successfully get category", result));
        return
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
    }
}