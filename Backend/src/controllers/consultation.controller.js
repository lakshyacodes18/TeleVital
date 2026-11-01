const consultationModel = require('../models/consultation.model')
const patientModel = require('../models/patient.model')
const { createAuditLog } = require("../services/audit.service");
const notificationService = require("../services/notification.service");

async function createConsultation(req,res){
    try{
        const { patient, symptoms, vitals, priority} = req.body;

        const patientAlreadyExists = await patientModel.findById(patient)

        if(!patientAlreadyExists){
            return res.status(404).json({
                message: "Patient not found"
            })
        }

        const consultationAlreadyExists = await consultationModel.findOne({
            patient,
            isActive: true
        })

        if(consultationAlreadyExists){
            return res.status(400).json({
                message: "Patient already has an active consultation"
            })
        }

        const consultation = await consultationModel.create({
            patient,
            doctor: null,
            paramedic: req.user._id,
            createdBy: req.user._id,
            symptoms,
            vitals,
            priority,
            status: "Waiting",
            isActive: true,
        });

        await createAuditLog({
            user: req.user._id,
            patient: patientAlreadyExists._id,
            action: "CONSULTATION_CREATED",
            description: `Submitted consultation for ${patientAlreadyExists.name}.`
});

        return res.status(201).json({
            message: "Consultation created successfully",
            consultation
        })

        }catch(err){
            return res.status(500).json({
            message: err.message
        });
}
}

async function getWaitingConsultations(req,res){
    try{
        const waitingConsultations = await consultationModel.find({
                isActive: true,
                status: "Waiting",
                doctor: null
            })
            .populate(
                "patient",
                "name age gender bloodGroup"
            )
            .populate(
                "paramedic",
                "name hospital"
            )
            .sort({
                createdAt: 1
            });

        return res.status(200).json({
            message: "Waiting consultations fetched successfully",
            count: waitingConsultations.length,
            waitingConsultations
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });

    }
}

async function acceptConsultation(req, res) {
    try {

        const { id } = req.params;

        const now = new Date();

        const consultation = await consultationModel.findOneAndUpdate(
            {
                _id: id,
                status: "Waiting",
                doctor: null,
                isActive: true
            },
            {
                doctor: req.user._id,
                status: "Accepted",
                assignedAt: now,
                startedAt: now
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        )
        .populate("patient", "name age gender bloodGroup")
        .populate("paramedic", "name hospital")
        .populate("doctor", "name hospital specialization");

        if (!consultation) {

            const consultationExists = await consultationModel.findById(id);

            if (!consultationExists) {
                return res.status(404).json({
                    message: "Consultation not found"
                });
            }
            return res.status(409).json({
                message: "Consultation has already been accepted or is no longer available"
            });
        }

        await createAuditLog({
            user: req.user._id,
            patient: consultation.patient._id,
            action: "CONSULTATION_ACCEPTED",
            description: `Dr. ${consultation.doctor.name} accepted the consultation for ${consultation.patient.name}.`
        });
    try{

        await notificationService.createNotification({
            recipient: consultation.paramedic._id,
            sender: req.user._id,
            consultation: consultation._id,
            type: "CONSULTATION_ACCEPTED",
            message: `Dr. ${consultation.doctor.name} has accepted the consultation for ${consultation.patient.name}.`
        });
        }catch(err){
        console.error("Notification creation failed:", err.message);
    }

        return res.status(200).json({
            message: "Consultation accepted successfully",
            consultation
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });
    }
}

async function getConsultationById(req, res) {
    try {

        const { id } = req.params;

        const consultation = await consultationModel.findById(id)

            .populate("patient", "name age gender bloodGroup phone address")
            .populate("paramedic", "name hospital phone")
            .populate("doctor", "name hospital specialization phone");


        if (!consultation) {
            return res.status(404).json({
                message: "Consultation not found"
            });
        }

        let hasAccess = false;

        if (
            req.user.role === "doctor" &&
            consultation.doctor &&
            consultation.doctor._id.toString() === req.user._id.toString()
        ) {
            hasAccess = true;
        }

        if (
            req.user.role === "paramedic" &&
            consultation.paramedic &&
            consultation.paramedic._id.toString() === req.user._id.toString()
        ) {
            hasAccess = true;
        }

        if (!hasAccess) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        return res.status(200).json({
            message: "Consultation fetched successfully",
            consultation
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

async function completeConsultation(req, res) {
    try {

        const { id } = req.params;
        const { diagnosis, prescription, doctorNotes } = req.body;

        if (!diagnosis?.trim() || !prescription?.trim()) {
            return res.status(400).json({
                message: "Diagnosis and prescription are required."
            });
        }

        const now = new Date();

        const consultation = await consultationModel.findOneAndUpdate(
            {
                _id: id,
                doctor: req.user._id,
                status: "Accepted",
                isActive: true
            },
            {
                diagnosis,
                prescription,
                doctorNotes,
                status: "Completed",
                isActive: false,
                completedAt: now
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        )
        .populate("patient", "name")
        .populate("doctor", "name")
        .populate("paramedic", "name hospital");

        if (!consultation) {

            const consultationExists = await consultationModel.findById(id);

            if (!consultationExists) {
                return res.status(404).json({
                    message: "Consultation not found."
                });
            }

            if (consultationExists.doctor?.toString() !== req.user._id.toString()) {
                return res.status(403).json({
                    message: "You are not authorized to complete this consultation."
                });
            }
            

            return res.status(409).json({
                message: "Consultation has already been completed or is no longer active."
            });
        }

        await createAuditLog({
            user: req.user._id,
            patient: consultation.patient._id,
            action: "CONSULTATION_COMPLETED",
            description: `Dr. ${consultation.doctor.name} completed the consultation for ${consultation.patient.name}.`
        });
    try{
        await notificationService.createNotification({
            recipient: consultation.paramedic._id,
            sender: req.user._id,
            consultation: consultation._id,
            type: "CONSULTATION_COMPLETED",
            message: `Dr. ${consultation.doctor.name} has completed the consultation for ${consultation.patient.name}.`
        });
    }catch(err){
        console.error("Notification creation failed:", err.message);
    }
        

        return res.status(200).json({
            message: "Consultation completed successfully.",
            consultation: {
                _id: consultation._id,

                patient: {
                    name: consultation.patient.name
                },

                symptoms: consultation.symptoms,

                priority: consultation.priority,

                doctor: {
                    name: consultation.doctor.name
                },

                paramedic: {
                    name: consultation.paramedic.name,
                    hospital: consultation.paramedic.hospital
                },

                status: consultation.status,
                diagnosis: consultation.diagnosis,
                prescription: consultation.prescription,
                doctorNotes: consultation.doctorNotes,
                completedAt: consultation.completedAt
            }
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });

    }
}

async function getMyActiveConsultations(req, res) {
    try {

        const consultations = await consultationModel.find({
                doctor: req.user._id,
                status: "Accepted",
                isActive: true
            })
            .populate("patient", "name")
            .populate("paramedic", "name hospital")
            .sort({ startedAt: -1 });

        const formattedConsultations = consultations.map((consultation) => ({
            _id: consultation._id,

            patient: {
                name: consultation.patient.name
            },

            symptoms: consultation.symptoms,

            priority: consultation.priority,

            paramedic: {
                name: consultation.paramedic.name,
                hospital: consultation.paramedic.hospital
            },

            status: consultation.status,

            startedAt: consultation.startedAt
        }));

        return res.status(200).json({
            totalActiveConsultations: formattedConsultations.length,
            consultations: formattedConsultations
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });

    }
}

async function getMyCompletedConsultations(req, res) {
    try {

        const consultations = await consultationModel.find({
                doctor: req.user._id,
                status: "Completed",
                isActive: false
            })
            .populate("patient", "name")
            .populate("paramedic", "name hospital")
            .sort({ completedAt: -1 });

        const formattedConsultations = consultations.map((consultation) => ({
            _id: consultation._id,

            patient: {
                name: consultation.patient.name
            },

            symptoms: consultation.symptoms,

            priority: consultation.priority,

            diagnosis: consultation.diagnosis,

            prescription: consultation.prescription,

            doctorNotes: consultation.doctorNotes,

            paramedic: {
                name: consultation.paramedic.name,
                hospital: consultation.paramedic.hospital
            },

            status: consultation.status,

            completedAt: consultation.completedAt
        }));

        return res.status(200).json({
            totalCompletedConsultations: formattedConsultations.length,
            consultations: formattedConsultations
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });
    }
}

async function getMyCreatedConsultations(req,res){
    try{
        const consultations = await consultationModel.find({
            paramedic: req.user._id
        })
        .populate("patient", "name age gender phone address bloodGroup")
        .populate("doctor", "name hospital")
        .sort({ createdAt: -1})

        const formattedConsultations = consultations.map((consultation) => ({
            _id: consultation._id,

            patient: consultation.patient,

            symptoms: consultation.symptoms,

            vitals: consultation.vitals,

            priority: consultation.priority,

            doctor: consultation.doctor
                ? {
                    name: consultation.doctor.name,
                    hospital: consultation.doctor.hospital
                }
                : null,

            status: consultation.status,

            diagnosis: consultation.diagnosis || null,
            prescription: consultation.prescription || null,
            doctorNotes: consultation.doctorNotes || null,

            createdAt: consultation.createdAt,

            assignedAt: consultation.assignedAt,

            completedAt: consultation.completedAt
        }));

        return res.status(200).json({
            totalConsultations: formattedConsultations.length,
            consultations: formattedConsultations
        });
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}


module.exports = {
    createConsultation,
    getWaitingConsultations,
    acceptConsultation,
    getConsultationById,
    completeConsultation,
    getMyActiveConsultations,
    getMyCompletedConsultations,
    getMyCreatedConsultations
}