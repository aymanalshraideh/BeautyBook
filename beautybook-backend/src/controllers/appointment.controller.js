const appointmentService = require("../services/appointment.service");

class AppointmentController {
  async create(req, res) {
    try {
      const appointment = await appointmentService.createAppointment(
        req.body,
        req.user
      );
      res.status(201).json(appointment);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAll(req, res) {
    const {
      page = 1,
      limit = 10,
      search = '',
      status,
      dateFrom,
      dateTo,
      serviceId,
    } = req.query;

    try {
      const result = await appointmentService.getAllAppointmentsPaginated({
        page: Number(page),
        limit: Number(limit),
        search,
        status,
        dateFrom,
        dateTo,
        serviceId,
      });

      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    const appointment = await appointmentService.getAppointmentById(
      req.params.id
    );
    if (!appointment)
      return res.status(404).json({ error: "Appointment not found" });
    res.json(appointment);
  }

  async update(req, res) {
    try {
      const updated = await appointmentService.updateAppointment(
        req.params.id,
        req.body,
        req.user
      );
      res.json(updated);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await appointmentService.deleteAppointment(req.params.id, req.user);
      res.json({ message: "Appointment deleted successfully" });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }
}

module.exports = new AppointmentController();
