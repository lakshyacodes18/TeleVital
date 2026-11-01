const auditModel = require("../models/audit.model");

async function getAuditLogs(req, res) {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const safePage = Math.max(page, 1);
        const safeLimit = Math.min(Math.max(limit, 1), 100);

        const skip = (page - 1) * limit;

        const totalLogs = await auditModel.countDocuments();

        const totalPages = Math.ceil(totalLogs / limit);

        const auditLogs = await auditModel.find()
            .populate("user", "name role")
            .populate("patient", "name")
            .populate("consultation")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            message: "Audit logs fetched successfully",
            currentPage: page,
            totalPages,
            totalLogs,
            count: auditLogs.length,
            auditLogs
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
}

module.exports = {
    getAuditLogs
};