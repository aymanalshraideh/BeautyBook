import api from "./api";

export const getStaff = (page = 1, limit = 10, search = "") =>
  api.get(
    `/staff?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
  );
export const createStaff = (data) => api.post("/staff", data);
export const updateStaff = (id, data) => api.put(`/staff/${id}`, data);
export const deleteStaff = (id) => api.delete(`/staff/${id}`);
