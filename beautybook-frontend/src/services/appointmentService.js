import api from "./api";

export const getAppointments = (
  page = 1,
  limit = 10,
  search = "",
  status = "",
  dateFrom = "",
  dateTo = "",
  serviceId = ""
) => {
  return api.get("/appointments", {
    params: {
      page,
      limit,
      search,
      status,
      dateFrom,
      dateTo,
      serviceId,
    },
  });
};

export const getAppointmentById = (id) => api.get(`/appointments/${id}`);

export const createAppointment = (data) => {
  return api.post("/appointments", data);
};

export const updateAppointment = (id, data) =>
  api.put(`/appointments/${id}`, data);

export const deleteAppointment = (id) => api.delete(`/appointments/${id}`);
