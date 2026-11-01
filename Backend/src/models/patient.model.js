const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    bloodGroup: {
        type: String
    },

    medicalHistory: {
        type: String
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    timestamps: true
});

const patientModel = mongoose.model("patient", patientSchema);
module.exports = patientModel;