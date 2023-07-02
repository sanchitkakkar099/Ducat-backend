const router = require("express").Router();

const placedStudentController = require("../controllers/placement/placedstudent.controller");
/**
 * @typedef placedStudentcreatemodel
 * @property {string} _id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} course
 * @property {string} center
 * @property {string} ducat_id
 * @property {string} image
 * @property {string} company
 * @property {string} package
 * @property {string} role
 * @property {string} status
 * @property {string} remark
 * 
 */
/**
 * create and edit placed student data
 * @route POST /placed/student
 * @param {placedStudentcreatemodel.model} data.body.required
 * @group Placed Student - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/",
    placedStudentController.placedStudentCreatenEdit)

/**
 * Get placed student details by id
 * @route GET /placed/student/byid/{id}
 * @param {string} id.path.required - userId
 * @group Placed Student - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.get("/byid/:id",
    placedStudentController.placedStudentById);






/**
 * delete placed student data
 * @route DELETE /placed/student/{id}
 * @param {string} id.path.required - userId
 * @group Placed Student - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.delete("/:id",
    placedStudentController.placedStudentDelete);


/**
 * Get the list of placed student with pagination
 * @route POST /placed/student/list
 * @param {CoursePaginationModel.model} data.body.required - Edit User Object
 * @group Placed Student - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/list",
    placedStudentController.placedStudentList);
module.exports = router;