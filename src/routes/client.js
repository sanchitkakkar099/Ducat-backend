const router = require("express").Router();
const ClientController = require("../controllers/client.controller")
const validator = require("../middleware/validator")



/**
 * @typedef ClientCreateEditModel
 * @property {string} _id
 * @property {string} name
 * @property {string} image
 * @property {string} remark
 * @property {string} status
 * @property {number} order_no
 */

/**
 * create or edit client detail
 * @route POST /client
 * @param {ClientCreateEditModel.model} data.body.required - Edit User Object
 * @group Client - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/",
    ClientController.ClientCreateAndEdit);

/**
 * get client by Id
 * @route GET /client/{id}
 * @param {string} id.path.required - userId
 * @group Client - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.get("/:id", ClientController.ClientById);

/**
 * DELETE Client by Id
 * @route DELETE /client/{id}
 * @param {string} id.path.required - userId
 * @group Client - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.delete("/:id", ClientController.ClientDelete);

/**
 * @typedef ClientAllModel
 * @property {number} search
 * @property {number} status
 */

/**
 * get all client
 * @route POST /client/all
 * @param {ClientAllModel.model} data.body.required - Edit User Object
 * @group Client - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/all", ClientController.ClientAll);


/**
 * @typedef ClientPaginationModel
 * @property {number} page
 * @property {number} limit
 * @property {number} search
 * @property {number} status
 */

/**
 * get all Clients with pagination
 * @route POST /client/list
 * @param {ClientPaginationModel.model} data.body.required - Edit User Object
 * @group Client - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/list", ClientController.ClientList)


module.exports = router;