const notificationModel = require("../models/notification.model");
const { getIO, getUserSocket } = require("../socket/socket");


async function createNotification({
    recipient,
    sender,
    consultation,
    type,
    message
}) {

    const notification = await notificationModel.create({
        recipient,
        sender,
        consultation,
        type,
        message
    });

    const populatedNotification = await notification.populate([
        {
            path: "sender",
            select: "name role"
        },
        {
            path: "consultation",
            populate: {
                path: "patient",
                select: "name"
            }
        }
    ]);

    const socketId = getUserSocket(recipient);

    if (socketId) {

        const unreadCount = await notificationModel.countDocuments({
            recipient,
            isRead: false
        });
        const SOCKET_EVENTS = {
            NEW_NOTIFICATION: "newNotification"
        };
        getIO()
            .to(socketId)
            .emit(
            SOCKET_EVENTS.NEW_NOTIFICATION,
        {
            notification: populatedNotification,
            unreadCount
        }
    );
    
        console.log(`Notification sent to socket ${socketId}`);
    }
    return populatedNotification;
}


async function getNotifications(userId) {

    try {
        const [
            notifications,
            unreadCount
        ] = await Promise.all([
            notificationModel.find({
                    recipient: userId
                })
                .populate(
                    "sender",
                    "name role"
                )
                .populate(
                    "consultation",
                    "status priority"
                )
                .sort({
                    createdAt: -1
                })
                .limit(20),
            notificationModel.countDocuments({
                recipient: userId,
                isRead: false
            })
        ]);
        return {
            notifications,
            unreadCount
        };
    }
    catch (err) {
        throw err;
    }
}


async function markAsRead(
    notificationId,
    userId
) {
    try {
        const notification =
            await notificationModel.findOneAndUpdate(
                {
                    _id: notificationId,
                    recipient: userId
                },
                {
                    isRead: true
                },
                {
                    returnDocument: "after"
                }
            );

        if (!notification) {
             return null;
        }
        return notification;
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    createNotification,
    getNotifications,
    markAsRead
};
