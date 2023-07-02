const router = require("express").Router();

const studentRegController = require("../controllers/placement/studentregisterartion.controller");
/**
 * @typedef studentRegModel
 * @property {string} _id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} course
 * @property {string} center
 * @property {string} per_10th
 * @property {string} per_12th
 * @property {string} per_grad
 * @property {string} per_postgrad
 * @property {string} ducat_id
 * @property {string} qualification
 * @property {string} passout_year
 * @property {string} trainer
 * @property {string} complete_year
 * @property {string} complete_month
 * @property {string} college
 * @property {string} isabove_60
 * @property {string} status
 * @property {string} remark
 * 
 */
/**
 * create and edit student registration data
 * @route POST /student/registration
 * @param {studentRegModel.model} data.body.required
 * @group Student Registration - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/",
    studentRegController.studenCreateEdit)

/**
 * Get student registration details by id
 * @route GET /student/registration/byid/{id}
 * @param {string} id.path.required - userId
 * @group Student Registration - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.get("/byid/:id",
    studentRegController.studentRegistrationById);






/**
 * delete Student Registration data
 * @route DELETE /student/registration/{id}
 * @param {string} id.path.required - userId
 * @group Student Registration - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.delete("/:id",
    studentRegController.studentRegDelete);


/**
 * Get the list of Student Registration with pagination
 * @route POST /student/registration/list
 * @param {CoursePaginationModel.model} data.body.required - Edit User Object
 * @group Student Registration - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/list",
    studentRegController.studentRegList);


module.exports = router