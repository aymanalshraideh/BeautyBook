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
      where: { id: Number(id) },
    });
  }

  async update(id, data) {
    return prisma.user.update({ where: { id: Number(id) }, data });
  }

  async delete(id) {
    return prisma.user.delete({ where: { id: Number(id) } });
  }
  async findAllStaffPaginated(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.user.findMany({
        where: { role: "staff" },
        skip,
        take: Number(limit),
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      }),
      prisma.user.count({ where: { role: "staff" } }),
    ]);

    return {
      data,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    };
  }

  async findStaffById(id) {
    return prisma.user.findFirst({
      where: { id: Number(id), role: "staff" },
    });
  }
  async findAllCustomersPaginated(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.user.findMany({
        where: { role: "customer" },
        skip,
        take: Number(limit),
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      }),
      prisma.user.count({ where: { role: "customer" } }),
    ]);

    return {
      data,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    };
  }
}

module.exports = new UserRepository();
