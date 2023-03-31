const router = require("express").Router();

const appsettingRoutes = require("./appsetting");
const courseRoutes = require("./course")
const centerRoutes = require("./center");
const EnquiryRoutes = require("./enquiry");
const BatchRoutes = require("./batch")
const fileuplaodsRoutes = require("./fileuploads")
const clientRoutes = require("./client")
const testimonialRoutes = require("./testimonial")
const serviceRoutes = require("./service")


router.use("/appsetting", appsettingRoutes);
router.use("/course", courseRoutes);
router.use("/center", centerRoutes);
router.use("/batch", BatchRoutes);
router.use("/enquiry", EnquiryRoutes);
router.use("/uploads", fileuplaodsRoutes);
router.use("/client", clientRoutes)
router.use("/testimonial", testimonialRoutes);
router.use("/service", serviceRoutes);

module.exports = router;