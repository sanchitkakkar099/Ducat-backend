const router = require("express").Router();

const jobapplicationController = require("../controllers/jobapplication.controller");
/**
 * @typedef jobapplicationcreatemodel
 * @property {string} _id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} jobType
 * @property {string} linkedInProfile
 * @property {string} aboutyourSelf
 * @property {string} aboutyourCourse
 * @property {string} resume
 * @property {string} course
 * @property {string} center
 * @property {string} status
 * @property {string} remark
 * 
 */
/**
 * create and edit Job Application data
 * @route POST /jobapplication
 * @param {jobapplicationcreatemodel.model} data.body.required
 * @group Job Application - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/",
    jobapplicationController.jobapplyCreateEdit)

/**
 * Get Job Application details by id
 * @route GET /jobapplication/byid/{id}
 * @param {string} id.path.required - userId
 * @group Job Application - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.get("/byid/:id",
    jobapplicationController.jobapplyById);






/**
 * delete Job Application data
 * @route DELETE /jobapplication/{id}
 * @param {string} id.path.required - userId
 * @group Job Application - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.delete("/:id",
    jobapplicationController.jobapplicationDelete);


/**
 * Get the list of Job Application with pagination
 * @route POST /jobapplication/list
 * @param {CoursePaginationModel.model} data.body.required - Edit User Object
 * @group Job Application - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/list",
    jobapplicationController.jobapplicationlist);


module.exports = router