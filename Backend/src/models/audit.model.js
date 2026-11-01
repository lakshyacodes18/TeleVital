const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },

        consultation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "consultation"
        },

        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "patient"
        },

        action: {
            type: String,
            enum: [
                "PATIENT_CREATED",
                "CONSULTATION_CREATED",
                "CONSULTATION_ACCEPTED",
                "CONSULTATION_COMPLETED",
                "AI_SUMMARY_GENERATED"
            ],
            required: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        }
    },
    {
        timestamps: true
    }
);

auditSchema.index({ createdAt: -1 });
auditSchema.index({ action: 1 });
auditSchema.index({ consultation: 1 });
auditSchema.index({ patient: 1 });
auditSchema.index({ user: 1 });

const auditModel = mongoose.model("audit", auditSchema);

module.exports = auditModel;