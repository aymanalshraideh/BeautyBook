const userRepository = require("../repositories/user.repository");

class CustomerService {
  async getPaginatedCustomers(page, limit) {
    return userRepository.findAllCustomersPaginated(page, limit);
  }

  async deleteCustomer(id) {
    return userRepository.delete(id);
  }

  async updateCustomer(id, data) {
    return userRepository.update(id, data);
  }
}

module.exports = new CustomerService();
