const router = require("express").Router();

const appSettingController = require("../controllers/appsetting")

//create header api
router.post("/formheader", appSettingController.formHeadersCreate)

router.post("/formfield", appSettingController.createFormFeild)


module.exports = router