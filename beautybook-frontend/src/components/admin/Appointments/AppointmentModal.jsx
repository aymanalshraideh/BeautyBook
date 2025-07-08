import React, { useState, useEffect } from "react";

function AppointmentModal({
  show,
  onClose,
  onSubmit,
  appointment,
  services,
  staff,
  customers,
}) {
  const [formData, setFormData] = useState({
    customerId: "",
    serviceId: "",
    staffId: "",
    date: "",
    notes: "",
    status: "pending",
  });

  useEffect(() => {
    if (appointment) {
      const formattedDate = appointment.date
        ? new Date(appointment.date).toISOString().slice(0, 16) // Format date to "YYYY-MM-DDTHH:MM"
        : "";
      setFormData({
        customerId: appointment.customerId || "",
        serviceId: appointment.serviceId || "",
        staffId: appointment.staffId || "",
        date: formattedDate,
        notes: appointment.notes || "",
        status: appointment.status || "pending",
      });
    } else {
      setFormData({
        customerId: "",
        serviceId: "",
        staffId: "",
        date: "",
        notes: "",
        status: "pending",
      });
    }
  }, [appointment]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formattedDate = formData.date;
    if (formattedDate) {
      formattedDate = new Date(formattedDate).toISOString();
    }

    const updatedData = {
      ...formData,
      date: formattedDate,
      serviceId: Number(formData.serviceId),
      customerId: Number(formData.customerId),
      staffId: Number(formData.staffId),
    };

    onSubmit(updatedData);
  };

  if (!show) return null;

  return (
    <div className="modal show fade d-block" tabIndex="-1">
      <div className="modal-dialog">
        <form onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {appointment ? "Edit Appointment" : "Add Appointment"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Customer</label>
                <select
                  name="customerId"
                  className="form-control"
                  value={formData.customerId}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Customer --</option>
                  {Array.isArray(customers) && customers.length > 0 ? (
                    customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No customers available</option>
                  )}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Service</label>
                <select
                  name="serviceId"
                  className="form-control"
                  value={formData.serviceId}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Service --</option>
                  {Array.isArray(services) && services.length > 0 ? (
                    services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No services available</option>
                  )}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Staff</label>
                <select
                  name="staffId"
                  className="form-control"
                  value={formData.staffId}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Staff --</option>
                  {Array.isArray(staff) && staff.length > 0 ? (
                    staff.map((staffMember) => (
                      <option key={staffMember.id} value={staffMember.id}>
                        {staffMember.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No staff available</option>
                  )}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Appointment Date</label>
                <input
                  name="date"
                  type="datetime-local"
                  className="form-control"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  className="form-control"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="canceled">Canceled</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Notes</label>
                <textarea
                  name="notes"
                  className="form-control"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {appointment ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppointmentModal;
