const router = require("express").Router();
const TestimonialController = require("../controllers/testimonial.controller");

const validator = require("../middleware/validator")



/**
 * @typedef TestimonialCreateEditModel
 * @property {string} _id
 * @property {string} name
 * @property {string} phone
 * @property {string} email
 * @property {string} profile
 * @property {string} country
 * @property {string} type
 * @property {string} message
 * @property {string} image
 * @property {string} course
 * @property {string} remark
 * @property {string} status
 */

/**
 * create and edit testimonial
 * @route POST /testimonial
 * @param {TestimonialCreateEditModel.model} data.body.required - Edit User Object
 * @group Testimonial - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/",
    TestimonialController.TestimonialCreateAndEdit);

/**
 * get testimmonial detail by id
 * @route GET /testimonial/byid/{id}
 * @param {string} id.path.required - userId
 * @group Testimonial - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.get("/byid/:id", TestimonialController.TestimonialById);

/**
 * DELETE testimonial by Id
 * @route DELETE /testimonial/{id}
 * @param {string} id.path.required - userId
 * @group Testimonial - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.delete("/:id", TestimonialController.TestimonialDelete);

/**
 * @typedef TestimonialAllModel
 * @property {string} search
 * @property {string} status
 */

/**
 * get all testimoanils
 * @route POST /testimonial/all
 * @param {TestimonialAllModel.model} data.body.required - Edit User Object
 * @group Testimonial - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/all", TestimonialController.TestimonialAll);


/**
 * @typedef TestimonialPaginationModel
 * @property {number} page
 * @property {number} limit
 * @property {string} search
 * @property {string} status
 */

/**
 * get all tesimonial with pagination
 * @route POST /testimonial/list
 * @param {TestimonialPaginationModel.model} data.body.required - Edit User Object
 * @group Testimonial - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/list", TestimonialController.TestimonialList)


module.exports = router;