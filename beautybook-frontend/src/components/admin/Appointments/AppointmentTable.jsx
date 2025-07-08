import React from 'react';

function AppointmentTable({ appointments, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>Customer Name</th>
            <th>Service</th>
            <th>Appointment Date</th>
            <th>Status</th>
            <th style={{ minWidth: "150px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No appointments found</td>
            </tr>
          ) : (
            appointments.map((appointment) => (
              <tr key={appointment.id}>
               
                <td>{appointment?.customer?.name ? appointment.customer.name : "This appointment was added by our staff"}</td>

                <td>{appointment.service.name}</td>
                <td>{new Date(appointment.date).toLocaleString()}</td>

                <td>{appointment.status}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(appointment)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => onDelete(appointment.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentTable;
