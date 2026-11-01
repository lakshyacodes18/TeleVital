const consultationModel = require('../models/consultation.model')
const patientModel = require('../models/patient.model')


async function getDoctorDashboard(req,res){
        try {

        const waitingConsultations = await consultationModel.countDocuments({
            status: "Waiting",
            isActive: true,
            doctor: null
        });

        const activeConsultations = await consultationModel.countDocuments({
            doctor: req.user._id,
            status: "Accepted",
            isActive: true
        });

        const completedConsultations = await consultationModel.countDocuments({
            doctor: req.user._id,
            status: "Completed",
            isActive: false
        });


        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);


        const completedToday = await consultationModel.countDocuments({
            doctor: req.user._id,
            status: "Completed",
            completedAt: {
                $gte: startOfToday
            }
        });

        return res.status(200).json({
            waitingConsultations,
            activeConsultations,
            completedConsultations,
            completedToday
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });

    }
}

async function getParamedicDashboard(req,res){
    try{
         const totalPatients = await patientModel.countDocuments({
            createdBy: req.user._id
        });

        const waitingConsultations = await consultationModel.countDocuments({
            paramedic: req.user._id,
            status: "Waiting",
            isActive: true
        });

        const acceptedConsultations = await consultationModel.countDocuments({
            paramedic: req.user._id,
            status: "Accepted",
            isActive: true
        });

        const completedConsultations = await consultationModel.countDocuments({
            paramedic: req.user._id,
            status: "Completed",
            isActive: false
        });

        return res.status(200).json({
            totalPatients,
            waitingConsultations,
            acceptedConsultations,
            completedConsultations
        });
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}


module.exports = {
    getDoctorDashboard,
    getParamedicDashboard
};
