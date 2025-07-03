const prisma = require("../config/prisma");

class UserRepository {
  async create(data) {
    return prisma.user.create({ data });
  }

  async findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findAll() {
    return prisma.user.findMany();
  }

  async findById(id) {
    return prisma.user.findUnique({
   where: { id: Number(id) }

    });
  }

  async update(id, data) {
    return prisma.user.update({ where: { id: Number(id) }
, data });
  }

  async delete(id) {
    return prisma.user.delete({ where: { id: Number(id) }
 });
  }
}

module.exports = new UserRepository();
