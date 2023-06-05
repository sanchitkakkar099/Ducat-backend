const router = require("express").Router();
const BatchController = require("../controllers/batch.controller");

const validator = require("../middleware/validator")
const auth = require("../middleware/auth").auth



/**
 * @typedef BatchCreateEditModel
 * @property {string} course
 * @property {string} center
 * @property {string} trainer
 * @property {string} star_date
 * @property {string} timing
 * @property {string} remark
 * @property {string} status
 */

/**
 * get all centers with pagination
 * @route POST /batch
 * @param {BatchCreateEditModel.model} data.body.required - Edit User Object
 * @group Batch - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/",
    BatchController.BacthCreateAndEdit);

/**
 * get Batch by Id
 * @route GET /batch/byid/{id}
 * @param {string} id.path.required - userId
 * @group Batch - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.get("/byid/:id", BatchController.BatchById);

/**
 * DELETE Batch by Id
 * @route DELETE /batch/{id}
 * @param {string} id.path.required - userId
 * @group Batch - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.delete("/:id", BatchController.BatchDelete);

/**
 * @typedef BatchAllModel
 * @property {string} search
 * @property {string} status
 */

/**
 * get all enquiries with pagination
 * @route POST /batch/all
 * @param {BatchAllModel.model} data.body.required - Edit User Object
 * @group Batch - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/all", BatchController.BatchAll);


/**
 * @typedef BatchPaginationModel
 * @property {number} page
 * @property {number} limit
 * @property {string} search
 * @property {string} status
 */

/**
 * get all enquiries with pagination
 * @route POST /batch/list
 * @param {BatchPaginationModel.model} data.body.required - Edit User Object
 * @group Batch - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/list", BatchController.BatchList)


module.exports = router


module.exports = router;