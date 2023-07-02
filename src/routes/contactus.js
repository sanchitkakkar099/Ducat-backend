const router = require("express").Router();

const contactusController = require("../controllers/contactus.controller");
/**
 * @typedef contactuscreatemodel
 * @property {string} _id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} subject
 * @property {string} message
 * @property {string} course
 * @property {string} center
 * @property {string} status
 * @property {string} remark
 * 
 */
/**
 * create and edit ContactUs data
 * @route POST /contactus
 * @param {contactuscreatemodel.model} data.body.required
 * @group ContactUs - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/",
    contactusController.constusCreateEdit)

/**
 * Get ContactUs details by id
 * @route GET /contactus/byid/{id}
 * @param {string} id.path.required - userId
 * @group ContactUs - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.get("/byid/:id",
    contactusController.conatctusById);






/**
 * delete ContactUs data
 * @route DELETE /contactus/{id}
 * @param {string} id.path.required - userId
 * @group ContactUs - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.delete("/:id",
    contactusController.contactusDelete);


/**
 * Get the list of ContactUs with pagination
 * @route POST /contactus/list
 * @param {CoursePaginationModel.model} data.body.required - Edit User Object
 * @group ContactUs - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/list",
    contactusController.contactUslist);


module.exports = router