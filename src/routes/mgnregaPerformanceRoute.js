// routes/mgnregaPerformanceRoute.js
const express = require("express");
const router = express.Router();
const { fetchPerformanceData } = require("../services/mgnregaPerformanceClient");
const fs = require("fs");
const path = require("path");

router.get("/performance", async (req, res) => {
  try {
    // 🔹 Try fetching live API data
    const data = await fetchPerformanceData();

    // If the API returns data successfully
    if (data && data.length > 0) {
      return res.json({ source: "Live API", data });
    } else {
      console.warn("API returned empty data, switching to CSV...");
      throw new Error("Empty API response");
    }

  } catch (error) {
    console.warn("⚠️ Live API failed, using CSV backup:", error.message);

    try {
      // 🔹 Fallback to CSV data
      const csvPath = path.join(__dirname, "../data/mgnrega_performance.csv");

      if (!fs.existsSync(csvPath)) {
        console.error("CSV file not found:", csvPath);
        return res.status(404).json({ error: "CSV file not found" });
      }

      const csv = fs.readFileSync(csvPath, "utf8");

      // Split by line, skip header, and filter empty lines
      const rows = csv.split("\n").slice(1).filter(line => line.trim() !== "");

      const fallbackData = rows.map((r) => {
        const cols = r.split("\t");
        return {
          finYear: cols[0]?.trim(),
          month: cols[1]?.trim(),
          state: cols[3]?.trim(),
          district: cols[5]?.trim(),
          totalWorkers: Number(cols[25]) || 0,
          totalJobCards: Number(cols[24]) || 0,
          totalHouseholdsWorked: Number(cols[19]) || 0,
          averageWageRate: Number(cols[7]) || 0,
          totalExp: Number(cols[17]) || 0,
          womenPersondays: Number(cols[29]) || 0,
          totalWorks: Number(cols[27]) || 0,
        };
      });

      return res.json({ source: "CSV Backup", data: fallbackData });

    } catch (csvError) {
      console.error("❌ CSV fallback also failed:", csvError.message);
      return res.status(500).json({ error: "Failed to load performance data" });
    }
  }
});

module.exports = router;
