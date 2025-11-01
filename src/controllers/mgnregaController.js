const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const getPerformanceData = async (req, res) => {
  try {
    const { API_KEY, RESOURCE_ID } = process.env;

    // Log to confirm environment variables
    console.log("🔑 API_KEY:", API_KEY ? "Loaded ✅" : "Missing ❌");
    console.log("🆔 RESOURCE_ID:", RESOURCE_ID ? "Loaded ✅" : "Missing ❌");

    // Fetch data from Government API
    const response = await axios.get(
      `https://api.data.gov.in/resource/${RESOURCE_ID}`,
      {
        params: {
          "api-key": API_KEY,
          format: "json",
          limit: 10, // fetch 10 records for now
        },
      }
    );

    // Log the response structure
    console.log("📊 API Response Status:", response.status);
    console.log("📄 Number of Records Fetched:", response.data.records?.length || 0);

    // Check if records exist
    if (!response.data.records || response.data.records.length === 0) {
      console.warn("⚠️ No performance data found in API response.");
      return res.status(404).json({ message: "No performance data found." });
    }

    // Send records to frontend
    res.status(200).json(response.data.records);
  } catch (error) {
    console.error("❌ Error fetching performance data:", error.message);
    if (error.response) {
      console.error("🔁 API Response Error:", error.response.status, error.response.data);
    }
    res.status(500).json({ message: "Failed to fetch data from API." });
  }
};

module.exports = { getPerformanceData };
