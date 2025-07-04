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
  async findAllStaff() {
  return prisma.user.findMany({
    where: { role: 'staff' },
    select: {
      id: true,
      name: true,
      email: true,
      specialization: true,
      createdAt: true,
    },
  });
}

async findStaffById(id) {
  return prisma.user.findFirst({
    where: { id: Number(id), role: 'staff' },
  });
}
async findAllCustomers() {
  return prisma.user.findMany({
    where: { role: 'customer' },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true
    }
  });
}

}

module.exports = new UserRepository();
