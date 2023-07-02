const router = require("express").Router();

const driveController = require("../controllers/placement/drive.controller");
/**
 * @typedef drivecreatemodel
 * @property {string} _id
 * @property {string} name
 * @property {string} start_date
 * @property {string} time
 * @property {string} technology
 * @property {string} company
 * @property {string} profile
 * @property {string} experience
 * @property {string} qualification
 * @property {string} contact_person
 * @property {string} location
 * @property {string} skills
 * @property {string} venue
 * @property {string} contact_no
 * @property {string} remark
 * @property {string} status
 * 
 */
/**
 * create and edit drive
 * @route POST /drive
 * @param {drivecreatemodel.model} data.body.required
 * @group Drive
 */
router.post("/drive",
    driveController.driveCreateEdit)

/**
 * Get drive details
 * @route GET /drive/byid/{id}
 * @param {string} id.path.required - userId
 * @group Drive - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.get("/byid/:id", driveController.driveById);






/**
 * delete Drive
 * @route DELETE /drive/{id}
 * @param {string} id.path.required - userId
 * @group Drive - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.delete("/:id", driveController.driveDelete);


/**
 * Get the list of drive with pagination
 * @route POST /drive/list
 * @param {CoursePaginationModel.model} data.body.required - Edit User Object
 * @group Drive - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/list", driveController.driveList);
module.exports = router;