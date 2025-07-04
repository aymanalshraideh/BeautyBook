const bcrypt = require('bcrypt');
const userRepository = require('../repositories/user.repository');

class StaffService {
  async createStaff(data) {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) throw new Error('Email already exists');

    data.password = await bcrypt.hash(data.password, 10);
    data.role = 'staff'; 
    return userRepository.create(data);
  }

  async getAllStaff() {
    return userRepository.findAllStaff();
  }

  async getStaffById(id) {
    return userRepository.findStaffById(id);
  }

  async updateStaff(id, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return userRepository.update(id, data);
  }

  async deleteStaff(id) {
    return userRepository.delete(id);
  }


}

module.exports = new StaffService();
