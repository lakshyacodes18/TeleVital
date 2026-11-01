const patientModel = require('../models/patient.model')
const { createAuditLog } = require("../services/audit.service");

async function createPatient(req,res){
    try{
        const{
            name,
            age,
            gender,
            phone,
            address,
            bloodGroup,
            medicalHistory
        } = req.body;

        const patient = await patientModel.create({
            name,
            age,
            gender,
            phone,
            address,
            bloodGroup,
            medicalHistory,
            createdBy: req.user._id
        })

        await createAuditLog({
            user: req.user._id,
            patient: patient._id,
            action: "PATIENT_CREATED",
            description: `Created patient ${patient.name}`
        });


        return res.status(201).json({message:"Patient created successfully",patient})
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

async function getPatients(req,res){
    try{
        const patients = await patientModel.find({
            createdBy: req.user._id
        }).sort({createdAt:-1})
        return res.status(200).json({
        count: patients.length,
        patients})
    }catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

async function getPatientById(req,res){
    try{
        const patient = await patientModel.findOne({
            _id: req.params.id,
            createdBy: req.user._id
        })

        if(!patient){
            return res.status(404).json({
                message: "Patient not found"
            })
        }
        return res.status(200).json({
            patient
        })
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }

}

async function updatePatient(req,res){
    try{
        const patient = await patientModel.findOne({
            _id: req.params.id,
            createdBy: req.user.id
        })
        if(!patient){
            return res.status(404).json({
                message: "Patient not found"
            })
        }
        const {
            name,
            age,
            gender,
            phone,
            address,
            bloodGroup,
            medicalHistory
        } = req.body

        patient.name = name ?? patient.name;
        patient.age = age ?? patient.age;
        patient.gender = gender ?? patient.gender;
        patient.phone = phone ?? patient.phone;
        patient.address = address ?? patient.address;
        patient.bloodGroup = bloodGroup ?? patient.bloodGroup;
        patient.medicalHistory = medicalHistory ?? patient.medicalHistory;

        await patient.save();

        return res.status(200).json({
            message: "Patient updated successfully",
            patient
        })
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }

}




module.exports = {
    createPatient,
    getPatients,
    getPatientById,
    updatePatient
}