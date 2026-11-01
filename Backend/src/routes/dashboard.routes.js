const express = require("express");

const router = express.Router();

const protect = require("../middlewares/auth.middleware");

const authorizeRoles = require("../middlewares/role.middleware");

const { getDoctorDashboard,getParamedicDashboard } = require("../controllers/dashboard.controller");

router.get('/doctor',protect,authorizeRoles("doctor"),getDoctorDashboard)
router.get('/paramedic',protect,authorizeRoles("paramedic"),getParamedicDashboard)

module.exports = router;