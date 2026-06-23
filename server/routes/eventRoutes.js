const express = require("express");
const route = express.Router();

const { trackEvent,getHeatmapData, getPages } = require("../controller/eventController");

route.post('/events',trackEvent);
route.get("/heatmap",getHeatmapData)
route.get("/pages",getPages)
module.exports = route; 
