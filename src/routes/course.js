const router = require("express").Router()
const CourseController = require("../controllers/course/course.controller");
const CourseShema = require("../validators/courseSchema")
const validator = require("../middleware/validator")

/**
 * @typedef subModels
 * @property {string} heading
 * @property {string} value
 */

/**
 * @typedef createCourseModel
 * @property {string} _id - Id of existsing course
 * @property {string} title
 * @property {string} subtitle
 * @property {string} seo_url
 * @property {string} redirect_url 
 * @property {string} course_category
 * @property {string} image
 * @property {string} cover_image
 * @property {string} pdf_file
 * @property {number} order_no
 * @property {string} status 
 * @property {string} popular
 * @property {string} description
 * @property {Array<subModels>} course_content
 * @property {Array<subModels>} course_topic
 * @property {string} seo_title
 * @property {string} meta_Keyword
 * @property {string} meta_description
 * @property {string} meta_section
 * @property {string} head_css
 * @property {string} footer_css
 * @property {string} head_js
 * @property {string} footer_js
 * @property {string} contact_email
 */

/**
 * Create Course api
 * @route POST /course
 * @param {createCourseModel.model} data.body.required - user login object
 * @group Course - operation
 * @returns {object} 200
 *      Return Object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/",
    validator("body", CourseShema.createCourse)
    , CourseController.crouseCreateAndUpdate);



/**
 * get Course detail by course id
 * @route GET /course/{id}
 * @param {string} id.path.required - userId
 * @group Course - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.get("/:id", CourseController.getCourseById);


/**
 * Edit Course
 * @route PUT /course/{id}
 * @param {string} id.path.required - userId
 * @param {createCourseModel.model} data.body.required - Edit User Object
 * @group Course - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.put("/:id");


/**
 * delete Course
 * @route DELETE /course/{id}
 * @param {string} id.path.required - userId
 * @group Course - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.delete("/:id", CourseController.deleteCourse);


/**
 * @typedef CoursePaginationModel
 * @property {string} status
 * @property {string} course_category
 * @property {string} search - name search - title
 */
/**
 * Get the list fo course with pagination
 * @route POST /course/list
 * @param {CoursePaginationModel.model} data.body.required - Edit User Object
 * @group Course - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/list", CourseController.CourseList);

module.exports = router;