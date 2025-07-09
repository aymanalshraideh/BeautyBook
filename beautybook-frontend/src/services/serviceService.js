import api from './api';


export const getServices = (page = 1, limit = 10, search = "", minPrice = "", maxPrice = "") =>
  api.get(`/services`, {
    params: {
      page,
      limit,
      search: encodeURIComponent(search),
      minPrice, 
      maxPrice,  
    },
  });
export const createService = (data) => api.post("/services", data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);
