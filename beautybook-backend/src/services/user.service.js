const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");

class UserService {
  async register(userData) {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    userData.role = "customer";
    return userRepository.create(userData);
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("Invalid email or password");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid email or password");

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return { token, user };
  }

  async getAll() {
    return userRepository.findAll();
  }

  //  async getById(id) {
  //   return userRepository.findById(Number(id));
  // }

  async update(id, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return userRepository.update(id, data);
  }

  async delete(id) {
    return userRepository.delete(id);
  }
}

module.exports = new UserService();
