const express = require("express");
const router = express.Router();
const { getDistrictPerformance } = require("../controllers/performanceController");

router.get("/performance", getDistrictPerformance);

module.exports = router;
