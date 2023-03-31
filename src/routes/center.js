const router = require("express").Router();
const CenterController = require("../controllers/center.controller");
const centerSchema = require("../validators/centerSchema");
const validator = require("../middleware/validator")



/**
 * @typedef CenterCreateEditModel
 * @property {string} title
 * @property {string} address
 * @property {string} phone
 * @property {string} email
 * @property {string} image
 * @property {string} description
 * @property {string} seo_url
 * @property {string} meta_title
 * @property {string} meta_Keyword
 * @property {string} meta_description
 * @property {string} meta_section
 * @property {string} head_css
 * @property {string} footer_css
 * @property {string} head_js
 * @property {string} footer_js
 * @property {number} order_no
 * @property {string} remark
 * @property {string} status
 */

/**
 * get all centers with pagination
 * @route POST /center
 * @param {CenterCreateEditModel.model} data.body.required - Edit User Object
 * @group Center - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/",
    validator('body', centerSchema.createEditCenter)
    , CenterController.CenterCreateAndEdit);

/**
 * get Center by Id
 * @route GET /center/byid/{id}
 * @param {string} id.path.required - userId
 * @group Center - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.get("/byid/:id", CenterController.CenterById);

/**
 * DELETE Center by Id
 * @route DELETE /center/{id}
 * @param {string} id.path.required - userId
 * @group Center - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.delete("/:id", CenterController.CenterDelete);

/**
 * @typedef CenterAllModel
 * @property {number} search
 * @property {number} status
 */

/**
 * get all centers with pagination
 * @route POST /center/all
 * @param {CenterAllModel.model} data.body.required - Edit User Object
 * @group Center - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/all", CenterController.CenterAll);


/**
 * @typedef CenterPaginationModel
 * @property {number} page
 * @property {number} limit
 * @property {number} search
 * @property {number} status
 */

/**
 * get all centers with pagination
 * @route POST /center/list
 * @param {CenterPaginationModel.model} data.body.required - Edit User Object
 * @group Center - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/list", CenterController.CenterList)

/**
 * get center list fro drown down purpose
 * @route GET /center/dropdown
 * @param {string} status
 * @group Center - File Upload operation
 * @returns {object} 200 - file path object
 * @returns {Error}  Error - Unexpected error
 */
router.get("/dropdown", CenterController.CenterForDropDown);

module.exports = router;