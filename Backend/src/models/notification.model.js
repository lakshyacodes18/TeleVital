const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },

        consultation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "consultation"
        },

        type: {
            type: String,
            enum: [
                "CONSULTATION_CREATED",
                "CONSULTATION_ACCEPTED",
                "CONSULTATION_COMPLETED",
                "CRITICAL_ALERT"
            ],
            required: true
        },

        message: {
            type: String,
            required: true,
            trim: true
        },

        isRead: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const notificationModel = mongoose.model("notification",notificationSchema);
module.exports = notificationModel;