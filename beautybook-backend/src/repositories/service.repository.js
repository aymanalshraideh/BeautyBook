const prisma = require("../config/prisma");

class ServiceRepository {
  async create(data) {
    return prisma.service.create({ data });
  }

  async findAllPaginated(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.service.findMany({
        skip,
        take: Number(limit),
        include: {
          user: { select: { id: true, name: true, role: true } },
        },
      }),
      prisma.service.count(),
    ]);

    return {
      data,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id) {
    return prisma.service.findUnique({ where: { id: Number(id) } });
  }

  async update(id, data) {
    return prisma.service.update({
      where: { id: Number(id) },
      data,
    });
  }

  async delete(id) {
    return prisma.service.delete({ where: { id: Number(id) } });
  }
}

module.exports = new ServiceRepository();
