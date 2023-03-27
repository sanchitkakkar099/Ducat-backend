const router = require("express").Router();

const appsettingRoutes = require("./appsetting");
const courseRoutes = require("./course")


router.use("/appsetting", appsettingRoutes);
router.use("/course", courseRoutes);

module.exports = router;