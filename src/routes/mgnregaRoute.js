const express = require("express");
const { getPerformanceData } = require("../controllers/mgnregaController");

const router = express.Router();

// GET /api/mgnrega/performance
router.get("/performance", getPerformanceData);

module.exports = router;
