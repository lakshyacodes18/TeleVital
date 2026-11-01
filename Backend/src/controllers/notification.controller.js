const notificationService = require("../services/notification.service");


async function getNotificationsController(req, res) {

    try {

        const { notifications, unreadCount } =
            await notificationService.getNotifications(
                req.user._id
            );

        return res.status(200).json({
            success: true,
            notifications,
            unreadCount
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

async function markAsReadController(req, res){
    try {

        const notification =
            await notificationService.markAsRead(
                req.params.notificationId,
                req.user._id
            );

        if (!notification) {

            return res.status(404).json({
                success: false,
                message: "Notification not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Notification marked as read.",
            notification
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = {
    getNotificationsController,
    markAsReadController
};