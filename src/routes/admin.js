const router = require("express").Router();
const adminController = require("../controllers/admin.controller");


router.post("/", adminController.createAdmin)

router.post("/login", adminController.adminlogin)



module.exports = router