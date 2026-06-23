const express = require('express');
const route = express.Router();
const{ getSessions, getSessionEvents } = require("../controller/sessionController");
route.get("/sessions",getSessions);
route.get("/session/:sessionId",getSessionEvents);

module.exports= route; 