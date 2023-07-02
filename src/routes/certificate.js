const router = require("express").Router();

const CertificateController = require("../controllers/certificate.controller");
/**
 * @typedef certificatemodel
 * @property {string} _id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} course
 * @property {string} center
 * @property {string} facililty
 * @property {string} ducat_id
 * @property {string} start_date
 * @property {string} end_date
 * @property {string} remark
 * @property {string} status
 * 
 */
/**
 * create and edit Certificate data
 * @route POST /certificate
 * @param {certificatemodel.model} data.body.required
 * @group Certificate - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/",
    CertificateController.certificateCreateEdit)

/**
 * Get Certificate details by id
 * @route GET /certificate/byid/{id}
 * @param {string} id.path.required - userId
 * @group Certificate - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.get("/byid/:id",
    CertificateController.certificateById);






/**
 * delete Certificate data
 * @route DELETE /certificate/{id}
 * @param {string} id.path.required - userId
 * @group Certificate - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.delete("/:id",
    CertificateController.certificateDelete);


/**
 * Get the list of Certificate with pagination
 * @route POST /certificate/list
 * @param {CoursePaginationModel.model} data.body.required - Edit User Object
 * @group Certificate - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/list",
    CertificateController.certificatelist);


module.exports = router