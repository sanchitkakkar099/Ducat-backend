const router = require("express").Router();

const db = require("../utils/mongooseMethods");
const dbModels = require("../utils/modelName");
const uploadad = require("../middleware/multer");
const path = require("path")
const HelperUtils = require("../utils/helper")
const { ERROR_MSG } = require("../utils/const")
const s3uploadad = require("../middleware/multers3")



/**
 * Upload Single File for System
 * @route POST /uploads
 * @consumes multipart/form-data
 * @param {file} file.formData
 * @param {number} type.query.required - file type
 *
 *  1:course,
 *  2: client,
 *  3: gallery,
 *  4: blog
 *  5: center
 *  6:course category
 *  99: default
 * @group FileUpload - File Upload operation
 * @returns {object} 200 - file path object
 * @returns {Error}  Error - Unexpected error
 */
router.post("/", s3uploadad.single('file'), async (req, res) => {
    try {
        console.log("-------------", req.file)
        // req.file.filepath = req.file.path.replace(/\\/g, '/')
        // req.file.filepath = path.join(__dirname, "../../", req.file.filepath)
        req.file.filepath = req.file.location
        req.file.originalname = req.file.originalname
        req.file.mimetype = req.file.mimetype
        req.file.size = req.file.size

        let file = await db.insertOne({
            collection: dbModels.FileUpload,
            document: req.file
        })
        res.send(HelperUtils.success("Successfully uploaded file", file));
        return;

    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }

})
/**
 * get the file data by ID
 * @route GET /uploads/{id}
 * @param {string} id.path.required - Admin Id
 * @group FileUpload - File Upload operation
 * @returns {object} 200 - file path object
 * @returns {Error}  Error - Unexpected error
 */
router.get("/:id", async (req, res) => {
    try {
        let file = await db.findOne({
            collection: dbModels.FileUpload,
            query: { _id: req.params.id }
        })
        res.send(HelperUtils.success("Successfully", file));
        return;
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
        return;
    }
})

module.exports = router