const router = require("express").Router();

const blogController = require("../controllers/blog/blog.controller");
const blogCategoryController = require("../controllers/blog/blog_category.controller");


/**
 * @typedef createblogmodel
 * @property {string} _id - Id of existsing course
 * @property {string} title
 * @property {string} blog_category
 * @property {string} image
 * @property {string} feature_image
 * @property {string} short_desc
 * @property {string} long_desc
 * @property {string} seo_url
 * @property {string} seo_title
 * @property {string} meta_keyword
 * @property {string} meta_description
 * @property {string} meta_section
 * @property {string} head_css
 * @property {string} footer_css
 * @property {string} head_js
 * @property {string} footer_js
 * @property {number} order_no
 * @property {string} status
 */

/**
 * create and edit blog
 * @route POST /blog
 * @param {createblogmodel.model} data.body.required - user login object
 * @group Blog - operation
 * @returns {object} 200
 *      Return Object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post(
    "/",
    blogController.blogCreateEdit
);

/**
 * get blog detail by blog id
 * @route GET /blog/byid/{id}
 * @param {string} id.path.required - userId
 * @group Blog - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.get("/byid/:id", blogController.getBlogById);


/**
 * delete Blog
 * @route DELETE /blog/{id}
 * @param {string} id.path.required - userId
 * @group Blog - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.delete("/:id", blogController.deleteBlog);


/**
 * Get the list of blog with pagination
 * @route POST /blog/list
 * @param {CoursePaginationModel.model} data.body.required - Edit User Object
 * @group Blog - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/list", blogController.blogList);


/**
 * **************************************************************************************************************************
 *                                      Blog Category
 */


/**
 * @typedef blogCategorymodel
 * @property {string} _id
 * @property {string} title
 * @property {string} image
 * @property {string} description
 * @property {string} seo_url
 * @property {string} meta_title
 * @property {string} meta_keyword
 * @property {string} meta_description
 * @property {string} head_css
 * @property {string} footer_css
 * @property {string} head_css
 * @property {string} footer_js
 * @property {number} order_no
 * @property {string} status
 * @property {string} remark
 */
/**
 * create and edit blog category
 * @route POST /blog/category
 * @param {blogCategorymodel.model} data.body.required 
 * @group Blog Category - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/category",
    blogCategoryController.createBlogCategory)



/**
* get blog category detail by blog id
* @route GET /blog/category/byid/{id}
* @param {string} id.path.required - userId
* @group Blog Category - operation
* @returns {object} 200
*      Return JSON object
*
* @returns {Error}  Error - Unexpected error
*/
router.get("/category/byid/:id",
    blogCategoryController.getBlogCategoryById);



/** 
 * delete Blog Category
 * @route DELETE /blog/category/{id}
 * @param {string} id.path.required - userId
 * @group Blog Category - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.delete("/category/:id",
    blogCategoryController.deleteBlogCategory);


/**
 * Get the list of blog catgegory with pagination
 * @route POST /blog/category/list
 * @param {CoursePaginationModel.model} data.body.required - Edit User Object
 * @group Blog Category - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/category/list",
    blogCategoryController.blogCategoryList);



/**
* Get the list of blog catgegory
* @route GET /blog/category/dropdown/list
* @group Blog Category - operation
* @returns {object} 200
*      Return JSON object
*
* @returns {Error}  Error - Unexpected error
*/
router.get("/category/dropdown/list",
    blogCategoryController.CategoryForDropDown);



module.exports = router