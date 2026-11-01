const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['paramedic' , 'doctor'],
        required: true,
    },
    hospital: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    resetPasswordToken: {
        type: String,
        default: null,
    },
    resetPasswordExpire: {
        type: Date,
        default: null,
    },
},
{
    timestamps: true,
});

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;