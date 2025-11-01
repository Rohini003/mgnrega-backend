// backend/src/services/mgnregaClient.js
const axios = require("axios");
require("dotenv").config();

async function fetchMgnregaData(limit = 1000) {
  try {
    const apiUrl = `https://api.data.gov.in/resource/${process.env.RESOURCE_ID}?api-key=${process.env.API_KEY}&format=json&limit=${limit}`;
    const response = await axios.get(apiUrl);
    if (response.data && response.data.records) {
      console.log("Fetched live MGNREGA data from government API");
      return response.data.records;
    }
    console.warn("⚠️ API returned no records.");
    return [];
  } catch (error) {
    console.error("❌ Error fetching from government API:", error.message);
    return []; // fail gracefully
  }
}

module.exports = { fetchMgnregaData };
