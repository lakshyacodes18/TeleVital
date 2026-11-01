const express = require("express");
const patientController = require("../controllers/patient.controller");
const protect = require("../middlewares/auth.middleware");
const authorizeRoles  = require("../middlewares/role.middleware");


const router = express.Router();


router.post("/", protect, authorizeRoles("doctor", "paramedic"),patientController.createPatient);
router.get("/", protect, authorizeRoles("doctor", "paramedic"),patientController.getPatients);
router.get("/:id",protect, authorizeRoles("doctor","paramedic"),patientController.getPatientById);
router.put("/:id",protect,authorizeRoles("doctor","paramedic"),patientController.updatePatient)
module.exports = router;