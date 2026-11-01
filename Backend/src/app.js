const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes');
const patientRoutes = require('./routes/patient.routes');
const consultationRoutes = require("./routes/consultation.routes");
const dashboardRoutes = require('./routes/dashboard.routes')
const auditRoutes = require("./routes/audit.routes");
const analyticsRouter = require("./routes/analytics.routes");
const searchRouter = require("./routes/search.routes");
const notificationRoutes = require("./routes/notification.routes");




const app = express();


app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/consultation', consultationRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/audit',auditRoutes)
app.use("/api/analytics", analyticsRouter);
app.use("/api/search",searchRouter)
app.use("/api/notifications",notificationRoutes);


module.exports = app;