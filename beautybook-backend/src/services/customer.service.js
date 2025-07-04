const userRepository = require('../repositories/user.repository');

class CustomerService {
  async getAllCustomers() {
    return userRepository.findAllCustomers();
  }

  async deleteCustomer(id) {
    return userRepository.delete(id);
  }

  async updateCustomer(id, data) {
    return userRepository.update(id, data);
  }
}

module.exports = new CustomerService();
