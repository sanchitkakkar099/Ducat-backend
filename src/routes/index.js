const router = require("express").Router();

const appsettingRoutes = require("./appsetting");


router.use("/appsetting", appsettingRoutes);

module.exports = router;