const express = require('express')
const consultationController = require('../controllers/consultation.controller')
const protect = require('../middlewares/auth.middleware')
const authorizeRoles = require("../middlewares/role.middleware");


const router = express.Router()

router.post('/',protect,authorizeRoles("paramedic"), consultationController.createConsultation)
router.get('/waiting',protect, authorizeRoles("doctor"),consultationController.getWaitingConsultations)
router.get('/my',protect,authorizeRoles("doctor"),consultationController.getMyActiveConsultations)
router.get('/completed',protect,authorizeRoles("doctor"),consultationController.getMyCompletedConsultations)
router.get('/my-created',protect,authorizeRoles("paramedic"),consultationController.getMyCreatedConsultations)

router.patch('/:id/accept',protect,authorizeRoles("doctor"),consultationController.acceptConsultation)
router.get('/:id',protect, authorizeRoles("doctor","paramedic"),consultationController.getConsultationById)
router.patch('/:id/complete',protect,authorizeRoles("doctor"),consultationController.completeConsultation)

module.exports = router