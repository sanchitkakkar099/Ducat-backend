const helperUtils = require("../../utils/helper");
const db = require("../../utils/mongooseMethods")
const models = require("../../utils/modelName")
const { ERROR_MSG } = require("../../utils/const")

exports.blogCreateEdit = async (req, res) => {
    try {
        if (!req.body._id) {
            //check same blog available
            let blog = await db.findOne({ collection: models.Blog, query: { title: req.body.title } })
            if (blog) {
                res.send(helperUtils.error("Already Blog available", {}));
                return
            }
            //create new blog
            let input = {
                collection: models.Blog,
                document: req.body
            }
            let newBlog = await db.insertOne(input)
            res.send(helperUtils.success("Successfully blog created", newBlog))
            return
        } else {
            //first Blog available in system
            let blog = await db.findOne({
                collection: models.Blog,
                query: { _id: req.body._id }
            });
            if (!blog) {
                res.send(helperUtils.error("Blog Not Found", {}));
                return;
            }
            let updateBlog = await db.findOneAndUpdate({
                collection: models.Blog,
                query: { _id: req.body._id },
                update: req.body,
                options: { new: true }
            })
            res.send(helperUtils.success("Successfully updated", updateBlog));
        }

    } catch (error) {
        res.send(helperUtils.error(ERROR_MSG, error.message))
    }
}


exports.getBlogById = async (req, res) => {
    try {
        console.log(req.params.id)
        let blogObj = await db.findOne({
            collection: models.Blog,
            query: { _id: req.params.id },
            populate: [
                { path: 'blog_category' },
                { path: 'image', select: "filepath" },
                { path: 'feature_image', select: 'filepath' },
            ]
        })
        if (blogObj && blogObj.blog_category) blogObj.blog_category = {
            label: blogObj.blog_category.title,
            value: blogObj.blog_category._id
        }

        if (blogObj && blogObj.status) blogObj.status = {
            label: blogObj.status,
            value: blogObj.status
        }

        res.send(helperUtils.success("Successfully get Course", blogObj));
        return
    } catch (error) {
        return res.send(helperUtils.error(ERROR_MSG, error.message));
    }
}


exports.deleteBlog = async (req, res) => {
    try {
        //first blog available in system
        let blog = await db.findOne({
            collection: models.Blog,
            query: { _id: req.params.id }
        });
        if (!blog) {
            res.send(HelperUtils.error("Blog Not Found", {}));
            return;
        }
        await db.updateOne({
            collection: models.Blog,
            query: { _id: req.params.id },
            update: { isDel: true, status: "Inactive" }
        })
        res.send(HelperUtils.success("Successfully deleted blog", {}));
        return
    } catch (error) {
        return res.send(HelperUtils.error(ERROR_MSG, error.message));

    }
}




exports.blogList = async (req, res) => {
    try {
        let query = { isDel: false }

        if (req.body.status) query.status = req.body.status;
        if (req.body.blog_category) query.blog_category = req.body.blog_category;

        if (req.body.search) query.title = new RegExp(req.body.search, 'i')

        let result = await db.paginate({
            collection: models.Blog,
            query: query,
            options: {
                populate: [
                    { path: 'blog_category' },
                    { path: "image", select: "filepath path fieldname originalname mimetype" },
                    { path: "feature_image", select: "filepath path fieldname originalname mimetype" }
                ],
                page: (req.body.page) ? req.body.page : 1,
                limit: (req.body.limit) ? req.body.limit : 10,
                sort: { order_no: 1 }
            }
        })
        res.send(helperUtils.success("Successfully get list", result));
        return
    } catch (error) {
        res.send(helperUtils.error(ERROR_MSG), error.message);
        return;
    }
}