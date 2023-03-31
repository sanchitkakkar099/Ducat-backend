const router = require("express").Router();
const ServiceController = require("../controllers/service.controller");

const validator = require("../middleware/validator")



/**
 * @typedef ServiceCreateEditModel
 * @property {string} _id
 * @property {string} name
 * @property {string} decsription
 * @property {string} image
 * @property {string} remark
 * @property {string} order_no
 * @property {string} status
 */

/**
 * create and edit service
 * @route POST /service
 * @param {ServiceCreateEditModel.model} data.body.required - Edit User Object
 * @group Service - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/",
    ServiceController.ServiceCreateAndEdit);
/**
 * get service detail by id
 * @route GET /service/byid/{id}
 * @param {string} id.path.required - userId
 * @group Service - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.get("/byid/:id", ServiceController.ServiceById);

/**
 * DELETE service by Id
 * @route DELETE /service/{id}
 * @param {string} id.path.required - userId
 * @group Service - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.delete("/:id", ServiceController.ServiceDelete);

/**
 * @typedef ServiceAllModel
 * @property {string} search
 * @property {string} status
 */

/**
 * get all service
 * @route POST /service/all
 * @param {ServiceAllModel.model} data.body.required - Edit User Object
 * @group Service - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/all", ServiceController.ServiceAll);


/**
 * @typedef ServicePaginationModel
 * @property {number} page
 * @property {number} limit
 * @property {string} search
 * @property {string} status
 */

/**
 * get all service with pagination
 * @route POST /service/list
 * @param {ServicePaginationModel.model} data.body.required - Edit User Object
 * @group Service - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/list", ServiceController.ServiceList)


module.exports = router;