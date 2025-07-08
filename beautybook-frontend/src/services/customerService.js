import api from './api';  // Assuming you have an api.js file for setting up axios


export const getCustomers = (page = 1, limit = 10, search = '') =>
  api.get(`/customers?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);


export const getCustomerById = (id) =>
  api.get(`/customers/${id}`);


export const createCustomer = (data) =>
  api.post('/customers', data);


export const updateCustomer = (id, data) =>
  api.put(`/customers/${id}`, data);


export const deleteCustomer = (id) =>
  api.delete(`/customers/${id}`);
