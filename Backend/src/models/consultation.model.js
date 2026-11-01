const mongoose = require('mongoose')

const consultationSchema = new mongoose.Schema({
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient",
        required: true,
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default:null
    },
    paramedic:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    symptoms:{
        type: String,
        required: true
    },
    vitals:{
        bloodPressure: String,
        heartRate: Number,
        oxygenLevel: Number,
        temperature: Number,
        weight: Number
    },
    priority:{
        type: String,
        enum:[
            "Low",
            "Medium",
            "High",
            "Critical"
        ],
        default: "Medium"
    },
    status: {
        type: String,
        enum: [
            "Waiting",
            "Accepted",
            "Completed",
            "Cancelled"
        ],
        default: "Waiting"
    },
    isActive: {
    type: Boolean,
    default: true
    },
    diagnosis:{
        type: String,
    },
    prescription:{
        type: String,
    },
    doctorNotes:{
        type: String
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    assignedAt:{
        type: Date
    },
    startedAt:{
        type: Date
    },
    completedAt:{
        type: Date
    }
},{
    timestamps: true
})

const consultationModel = mongoose.model("consultation",consultationSchema)

module.exports = consultationModel