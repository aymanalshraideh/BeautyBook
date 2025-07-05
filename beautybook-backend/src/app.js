const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const serviceRoutes = require('./routes/service.routes');
const staffRoutes = require('./routes/staff.routes');
const customerRoutes = require('./routes/customer.routes');
const appointmentRoutes = require('./routes/appointment.routes');




app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/appointments', appointmentRoutes);

module.exports = app;
