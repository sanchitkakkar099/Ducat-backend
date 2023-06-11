const router = require("express").Router();
const EnquiryController = require("../controllers/enquiry.controller");

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
 * @route GET /enquiry/byid/{id}
 * @param {string} id.path.required - userId
 * @group Enquiry - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.get("/byid/:id", EnquiryController.EnquiryById);

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
 * @property {string} search
 * @property {string} status
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
router.post("/all", EnquiryController.EnquiryAll);


/**
 * @typedef EnquiryPaginationModel
 * @property {number} page
 * @property {number} limit
 * @property {string} search
 * @property {string} status
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
router.post("/list", EnquiryController.EnquiryList)

/**
 * get all enquiries with pagination
 * @route POST /enquiry/csv
 * @param {EnquiryPaginationModel.model} data.body.required - Edit User Object
 * @group Enquiry - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/csv", EnquiryController.enquirycsvdownload)
module.exports = router;