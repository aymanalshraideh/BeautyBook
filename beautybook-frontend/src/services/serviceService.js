import api from './api';


export const getServices = (page = 1, limit = 10, search = "") =>
  api.get(`/services?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
export const createService = (data) => api.post("/services", data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);
