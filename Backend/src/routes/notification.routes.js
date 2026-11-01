const express = require("express");
const notificationController = require("../controllers/notification.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/",authMiddleware,notificationController.getNotificationsController);
router.patch("/:notificationId/read",authMiddleware,notificationController.markAsReadController);

module.exports = router;