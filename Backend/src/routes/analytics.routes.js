const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { doctorAnalytics } = require("../controllers/analytics.controller");


const analyticsRouter = express.Router();


analyticsRouter.get("/doctor",authMiddleware,doctorAnalytics)

module.exports = analyticsRouter;