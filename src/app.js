const express = require("express");
const cors = require("cors");

// correct routes
const apiRoutes = require("./routes/api");
const wagesRoute = require("./routes/wagesRoute");
const mgnregaRoutes = require("./routes/mgnregaRoute");
const mgnregaPerformanceRoute = require("./routes/mgnregaPerformanceRoute");
const performanceRoutes = require('./routes/performanceRoutes');




console.log("apiRoutes:", typeof apiRoutes);
console.log("wagesRoute:", typeof wagesRoute);
console.log("mgnregaRoutes:", typeof mgnregaRoutes);
console.log("mgnregaPerformanceRoute:", typeof mgnregaPerformanceRoute);


const app = express();

app.use(cors());
app.use(express.json());

// register all routers
app.use("/api", apiRoutes);
app.use("/api/wages", wagesRoute);
app.use("/api/mgnrega", mgnregaRoutes);
app.use("/api/mgnrega", mgnregaPerformanceRoute);
app.use("/api/mgnrega", performanceRoutes);

app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

module.exports = app;
