const router = require("express").Router();
const RegisterController = require("../controllers/registration.controller");
const validator = require("../middleware/validator")



/**
 * @typedef RegisterCreateEditModel
 * @property {string} name
 * @property {string} phone
 * @property {string} email
 * @property {string} zipcode
 * @property {string} city
 * @property {string} country
 * @property {number} amount
 * @property {string} transaction_id
 * @property {string} transaction_status
 * @property {string} course
 * @property {string} center
 * @property {string} remark
 * @property {string} status
 */

/**
 * create or edit registration data
 * @route POST /registeration
 * @param {RegisterCreateEditModel.model} data.body.required - Edit User Object
 * @group Registration - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/",
    RegisterController.RegistrationCreateAndEdit);

/**
 * get Registration data by Id
 * @route GET /registeration/byid/{id}
 * @param {string} id.path.required - userId
 * @group Registration - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.get("/byid/:id", RegisterController.RegisterById);

/**
 * DELETE Register by Id
 * @route DELETE /registeration/{id}
 * @param {string} id.path.required - userId
 * @group Registration - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.delete("/:id", RegisterController.RegisterDelete);

/**
 * @typedef RegisterAllModel
 * @property {number} search
 * @property {number} status
 */

/**
 * get all register data
 * @route POST /registeration/all
 * @param {RegisterAllModel.model} data.body.required - Edit User Object
 * @group Registration - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/all", RegisterController.RegisterAll);


/**
 * @typedef RegisterPaginationModel
 * @property {number} page
 * @property {number} limit
 * @property {number} search
 * @property {number} status
 */

/**
 * get all registration with pagination
 * @route POST /registeration/list
 * @param {RegisterPaginationModel.model} data.body.required - Edit User Object
 * @group Registration - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/list", RegisterController.RegisterList)


module.exports = router;