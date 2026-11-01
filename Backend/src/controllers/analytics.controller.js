const { getDoctorAnalytics } = require("../services/analytics.service");

async function doctorAnalytics(req, res) {
    try {

        const analytics = await getDoctorAnalytics();

        return res.status(200).json({
            message: "Analytics fetched successfully",
            analytics
        });

    } catch (err) {

        console.error("Analytics Controller Error:", err);

        return res.status(500).json({
            message: "Failed to fetch analytics"
        });

    }
}

module.exports = {
    doctorAnalytics
};