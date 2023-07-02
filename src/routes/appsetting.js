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


module.exports = router