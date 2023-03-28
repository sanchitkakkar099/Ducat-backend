const router = require("express").Router();

const appsettingRoutes = require("./appsetting");
const courseRoutes = require("./course")
const centerRoutes = require("./center");


router.use("/appsetting", appsettingRoutes);
router.use("/course", courseRoutes);
router.use("/center", centerRoutes);

module.exports = router;