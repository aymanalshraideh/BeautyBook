const appointmentRepository = require("../repositories/appointment.repository");

class AppointmentService {
  async createAppointment(data, user) {
    console.log("rr", data);

    if (user.role === "customer") {
      data.customerId = user.userId;
      data.staffId = null;
    } else if (data.staffId == null || data.staffId === "undefined") {
      data.staffId = user.userId;
    }

    return appointmentRepository.create(data);
  }

  async getAllAppointmentsPaginated(page, limit , search) {
    return appointmentRepository.findAllPaginated(page, limit , search);
  }

  async getAppointmentById(id) {
    return appointmentRepository.findById(id);
  }

  async updateAppointment(id, data, user) {
    const appointment = await appointmentRepository.findById(id);
    if (!appointment) throw new Error("Appointment not found");

    const isOwner =
      user.userId === appointment.staffId ||
      user.userId === appointment.customerId;

    if (user.role !== "admin" && !isOwner) {
      throw new Error("Unauthorized to update this appointment");
    }

    return appointmentRepository.update(id, data);
  }

  async deleteAppointment(id, user) {
    const appointment = await appointmentRepository.findById(id);
    if (!appointment) throw new Error("Appointment not found");

    const isOwner =
      user.userId === appointment.staffId ||
      user.userId === appointment.customerId;

    if (user.role !== "admin" && !isOwner) {
      throw new Error("Unauthorized to delete this appointment");
    }

    return appointmentRepository.delete(id);
  }
}

module.exports = new AppointmentService();
