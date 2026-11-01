const express = require("express");
const protect = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const { getAuditLogs } = require("../controllers/audit.controller");

const router = express.Router();



router.get("/",protect,authorizeRoles("doctor"),getAuditLogs)

module.exports = router;