const router = require("express").Router();
const CourseController = require("../controllers/course/course.controller");
const CourseShema = require("../validators/courseSchema");
const validator = require("../middleware/validator");
const CourseCategoryController = require("../controllers/course/course_category");

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
 * @property {string} meta_keyword
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
router.post(
  "/",
  // validator("body", CourseShema.createCourse),
  CourseController.crouseCreateAndUpdate
);

/**
 * get Course detail by course id
 * @route GET /course/byid/{id}
 * @param {string} id.path.required - userId
 * @group Course - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.get("/byid/:id", CourseController.getCourseById);

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

/**
 * get  course list fro drown down purpose
 * @route GET /course/dropdown
 * @param {string} status
 * @group Course - File Upload operation
 * @returns {object} 200 - file path object
 * @returns {Error}  Error - Unexpected error
 */
router.get("/dropdown", CourseController.CourseForDropDown);

/**
 * @typedef relatedcoursebycategory
 * @property {string} categoryid
 */
/**
 * POST  course list from category id
 * @route POST /course/list/relatedcategory
 * @param {relatedcoursebycategory.model} data.body.required - Edit User Object
 * @group Course - File Upload operation
 * @returns {object} 200 - file path object
 * @returns {Error}  Error - Unexpected error
 */
router.post(
  "/list/relatedcategory",
  CourseController.getcourselistbycategoryid
);

/**
 * Get the list fo course with pagination
 * @route POST /course/csv
 * @param {CoursePaginationModel.model} data.body.required - Edit User Object
 * @group Course - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/csv", CourseController.coursecsv);
/**
 * **************************************************************************************************************************
 *                                      Course Category
 */

/**
 * @typedef CourseCategoryModel
 * @property {string} _id
 * @property {string} name
 * @property {string} logo
 * @property {string} remark -
 * @property {string} status
 */
/**
 * cerate the course category
 * @route POST /course/category
 * @param {CourseCategoryModel.model} data.body.required - Edit User Object
 * @group Course Category- operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/category", CourseCategoryController.createCategory);

/**
 * @typedef categoryAllModel
 * @property {string} search
 */
/**
 * cerate the course category
 * @route POST /course/category/all
 * @param {categoryAllModel.model} data.body.required - Edit User Object
 * @group Course Category- operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/category/all", CourseCategoryController.CategoryAll);

/**
 * GEt Course Category
 * @route GET /course/category/byid/{id}
 * @param {string} id.path.required - userId
 * @group Course Category - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.get("/category/byid/:id", CourseCategoryController.CategoryById);

/**
 * DELETE Course Category
 * @route DELETE /course/category/{id}
 * @param {string} id.path.required - userId
 * @group Course Category - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.delete("/category/:id", CourseCategoryController.CategoryDelete);

/**
 * @typedef categoryPaginationModel
 * @property {number} page
 * @property {number} limit
 * @property {number} search
 * @property {number} status
 */

/**
 * getCourse Category with pagination
 * @route POST /course/category/list
 * @param {categoryPaginationModel.model} data.body.required - Edit User Object
 * @group Course Category - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/category/list", CourseCategoryController.CategoryList);

/**
 * get  course list fro drown down purpose
 * @route GET /course/category/dropdown
 * @param {string} status
 * @group Course Category - File Upload operation
 * @returns {object} 200 - file path object
 * @returns {Error}  Error - Unexpected error
 */
router.get("/category/dropdown", CourseCategoryController.CategoryForDropDown);

/**
 * get  course list fro drown down purpose
 * @route GET /course/category/home/list
 * @group Course Category - File Upload operation
 * @returns {object} 200 - file path object
 * @returns {Error}  Error - Unexpected error
 */
router.get(
  "/category/home/list",
  CourseCategoryController.getcoursescategories
);

/**
 * POST  course list fro drown down purpose
 * @route POST /course/category/drop/down/list
 * @group Course Category - File Upload operation
 * @returns {object} 200 - file path object
 * @returns {Error}  Error - Unexpected error
 */
router.post(
  "/category/drop/down/list",
  CourseCategoryController.categorycourseslistwithpagination
);

/**
 * POST  course list fro drown down purpose
 * @route POST /course/category/csv
 * @group Course Category - File Upload operation
 * @returns {object} 200 - file path object
 * @returns {Error}  Error - Unexpected error
 */
router.post(
  "/category/csv",
  CourseCategoryController.coursescategoriescsv
);
module.exports = router;
