import React from "react";

function AppointmentFilters({ filters, onChange, services }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <div className="row mb-3">
      <div className="col-md-3">
        <label>Status</label>
        <select
          name="status"
          className="form-control"
          value={filters.status}
          onChange={handleInputChange}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>

          <option value="completed">Completed</option>
          <option value="canceled">Cancelled</option>
        </select>
      </div>

      <div className="col-md-3">
        <label>Service</label>
        <select
          name="serviceId"
          className="form-control"
          value={filters.serviceId}
          onChange={handleInputChange}
        >
          <option value="">All</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-3">
        <label>Date From</label>
        <input
          type="date"
          name="dateFrom"
          className="form-control"
          value={filters.dateFrom}
          onChange={handleInputChange}
        />
      </div>

      <div className="col-md-3">
        <label>Date To</label>
        <input
          type="date"
          name="dateTo"
          className="form-control"
          value={filters.dateTo}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default AppointmentFilters;
