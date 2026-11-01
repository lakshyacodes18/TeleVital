const consultationModel = require("../models/consultation.model");
const patientModel = require("../models/patient.model");

async function getDoctorAnalytics() {
    try {

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [
            patientsToday,
            pendingCases,
            assignedCases,
            resolvedCases,
            criticalCases,
            completedConsultations
        ] = await Promise.all([

            patientModel.countDocuments({
                createdAt: { $gte: today }
            }),

            consultationModel.countDocuments({
                status: "Waiting"
            }),

            consultationModel.countDocuments({
                status: "Accepted"
            }),

            consultationModel.countDocuments({
                status: "Completed"
            }),

            consultationModel.countDocuments({
                priority: "Critical"
            }),

            consultationModel.find({
                status: "Completed",
                assignedAt: { $ne: null }
            })
        ]);

        let averageResponseTime = 0;

        if (completedConsultations.length > 0) {

            const totalMinutes = completedConsultations.reduce(
                (total, consultation) => {

                    const responseTime =
                        consultation.assignedAt - consultation.createdAt;

                    return total + responseTime / (1000 * 60);

                },
                0
            );

            averageResponseTime = Math.round(
                totalMinutes / completedConsultations.length
            );
        }

        return {
            patientsToday,
            pendingCases,
            assignedCases,
            resolvedCases,
            criticalCases,
            averageResponseTime
        };

    } catch (err) {
        console.error("Analytics Service Error:", err);
        throw err;
    }
}

module.exports = {
    getDoctorAnalytics
};