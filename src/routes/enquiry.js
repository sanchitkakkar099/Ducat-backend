const router = require("express").Router();
const EnquiryController = require("../controllers/enquiry.controller");
const centerSchema = require("../validators/enquirySchema");
const validator = require("../middleware/validator")



/**
 * @typedef EnquiryCreateEditModel
 * @property {string} name
 * @property {string} phone
 * @property {string} email
 * @property {string} course
 * @property {string} center
 * @property {string} remark
 * @property {string} status
 */

/**
 * get all centers with pagination
 * @route POST /enquiry
 * @param {EnquiryCreateEditModel.model} data.body.required - Edit User Object
 * @group Enquiry - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/",
    EnquiryController.createEnquiryAndEdit);

/**
 * get Enquiry by Id
 * @route GET /enquiry/{id}
 * @param {string} id.path.required - userId
 * @group Enquiry - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.get("/:id", EnquiryController.EnquiryById);

/**
 * DELETE Enquiry by Id
 * @route DELETE /enquiry/{id}
 * @param {string} id.path.required - userId
 * @group Enquiry - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.delete("/:id", EnquiryController.EnquiryDelete);

/**
 * @typedef EnquiryAllModel
 * @property {number} search
 * @property {number} status
 */

/**
 * get all enquiries with pagination
 * @route POST /enquiry/all
 * @param {EnquiryAllModel.model} data.body.required - Edit User Object
 * @group Enquiry - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/all", EnquiryController.CenterAll);


/**
 * @typedef EnquiryPaginationModel
 * @property {number} page
 * @property {number} limit
 * @property {number} search
 * @property {number} status
 */

/**
 * get all enquiries with pagination
 * @route POST /enquiry/list
 * @param {EnquiryPaginationModel.model} data.body.required - Edit User Object
 * @group Enquiry - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/list", EnquiryController.CenterList)


module.exports = router;