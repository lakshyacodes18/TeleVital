const patientModel = require("../models/patient.model");
const consultationModel = require("../models/consultation.model");

async function globalSearch(query) {
    try {

        query = query.trim();

        if (!query) {
            return {
                query: "",
                totalResults: 0,
                patients: [],
                consultations: []
            };
        }

        const searchRegex = new RegExp(query, "i");

        const [patients, consultations] = await Promise.all([

            patientModel.find({
                $or: [
                    { name: searchRegex },
                    { phone: searchRegex },
                    { bloodGroup: searchRegex }
                ]
            })
            .limit(10),

            consultationModel.find({
                $or: [
                    { status: searchRegex },
                    { priority: searchRegex }
                ]
            })
            .populate("patient", "name age gender bloodGroup")
            .populate("doctor", "name")
            .populate("paramedic", "name")
            .limit(10)
        ]);

        return {

            query,

            totalResults:
                patients.length + consultations.length,

            patients,
            consultations
        };

    } catch (err) {
        console.error("Search Service Error:", err);
        throw err;
    }

}

module.exports = {
    globalSearch
};