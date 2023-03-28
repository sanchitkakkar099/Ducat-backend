const router = require("express").Router();

const appsettingRoutes = require("./appsetting");
const courseRoutes = require("./course")
const centerRoutes = require("./center");
const EnquiryRoutes = require("./enquiry");
const BatchRoutes = require("./batch")
const fileuplaodsRoutes = require("./fileuploads")


router.use("/appsetting", appsettingRoutes);
router.use("/course", courseRoutes);
router.use("/center", centerRoutes);
router.use("/batch", BatchRoutes);
router.use("/enquiry", EnquiryRoutes);
router.use("/uploads", fileuplaodsRoutes);

module.exports = router;