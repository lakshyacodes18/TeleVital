const auditModel = require("../models/audit.model");

async function createAuditLog({
    user,
    consultation = null,
    patient = null,
    action,
    description,
    metadata = {}
}) {
    
    try {

        const audit = await auditModel.create({
            user,
            consultation,
            patient,
            action,
            description,
            metadata
        });

        return audit;

    } catch (err) {

        console.error("Audit Log Error:", err.message);

        return null;

    }
}

module.exports = {
    createAuditLog
};