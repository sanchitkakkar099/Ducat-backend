const router = require("express").Router();
const GalleryController = require("../controllers/gallery.controller");

const validator = require("../middleware/validator")



/**
 * @typedef GalleryCreateEditModel
 * @property {string} _id
 * @property {string} name
 * @property {string} image
 * @property {string} remark
 * @property {string} order_no
 * @property {string} status
 */

/**
 * create and edit gallery
 * @route POST /gallery
 * @param {GalleryCreateEditModel.model} data.body.required - Edit User Object
 * @group Gallery - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/",
    GalleryController.GalleryCreateAndEdit);
/**
 * get gallery detail by id
 * @route GET /gallery/byid/{id}
 * @param {string} id.path.required - userId
 * @group Gallery - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.get("/byid/:id", GalleryController.GalleryById);

/**
 * DELETE gallery by Id
 * @route DELETE /gallery/{id}
 * @param {string} id.path.required - userId
 * @group Gallery - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.delete("/:id", GalleryController.GallleryDelete);

/**
 * @typedef galleryAllModel
 * @property {string} search
 * @property {string} status
 */

/**
 * get all gallery
 * @route POST /gallery/all
 * @param {galleryAllModel.model} data.body.required - Edit User Object
 * @group Gallery - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/all", GalleryController.GalleryAll);


/**
 * @typedef galleryPaginationModel
 * @property {number} page
 * @property {number} limit
 * @property {string} search
 * @property {string} status
 */

/**
 * get all gallery with pagination
 * @route POST /gallery/list
 * @param {galleryPaginationModel.model} data.body.required - Edit User Object
 * @group Gallery - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/list", GalleryController.GalleryList)


module.exports = router;