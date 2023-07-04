const router = require("express").Router();

const appSettingController = require("../controllers/appsetting")

/**
 * get all registration with pagination
 * @route GET /appsetting/configuration/email
 * @group AppSetting - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.get("/configuration/email", appSettingController.ConfigurationsEmail);

/**
 * @typedef configurationemailmodel
 * @property {string} hr_email
 * @property {string} main_email
 * @property {string} certificate_email
 * @property {string} enquiry_email
 * @property {string} placement_email
 * @property {string} schedule_email
 */
/**
 * update the configuration email
 * @route POST /appsetting/configuration/email
 * @param {configurationemailmodel.model} data.body.required - Edit User Object
 * @group AppSetting - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/configuration/email", appSettingController.ConfigurationsEmailUpdate);


/**
 * get setting value
 * @route GET /appsetting/bykey/{key}
 * @param {string} key.path.required - string
 * @group AppSetting - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.get("/bykey/:key", appSettingController.GetSettingValueByKey);


/**
 * update the configuration email
 * @route POST /appsetting/bykey/{key}
 * @param {string} key.param.required - keyname
 * @param {string} settingValue.body.required - Edit User Object
 * @group AppSetting - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/bykey/:key", appSettingController.UpdateSettingByKey);

/**
 * get all registration with pagination
 * @route GET /appsetting/aboutUs
 * @group AppSetting - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.get("/aboutUs", appSettingController.getaboutus);

/**
 * @typedef aboutusmodel
 * @property {string} aboutus_content
 * @property {string} seo_url
 * @property {string} seo_title
 * @property {string} meta_keyword
 * @property {string} meta_description
 * @property {string} meta_section
 * @property {string} head_css
 * @property {string} footer_css
 * @property {string} head_js
 * @property {string} footer_js
 */
/**
 * update the configuration email
 * @route POST /appsetting/aboutUs
 * @param {aboutusmodel.model} data.body.required - Edit User Object
 * @group AppSetting - operation
 * @returns {object} 200
 *      Return JSON object
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/aboutUs", appSettingController.aboutUs);


module.exports = router