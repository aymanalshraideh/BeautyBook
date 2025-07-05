const prisma = require('../config/prisma');

class AppointmentRepository {
  async create(data) {
    return prisma.appointment.create({ data });
  }

async findAllPaginated(page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.appointment.findMany({
      skip,
      take: Number(limit),
      include: {
        service: true,
        customer: { select: { id: true, name: true } },
        staff: { select: { id: true, name: true } },
      },
    }),
    prisma.appointment.count()
  ]);

  return {
    data,
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / limit)
  };
}


  async findById(id) {
    return prisma.appointment.findUnique({
      where: { id: Number(id) },
    });
  }

  async update(id, data) {
    return prisma.appointment.update({
      where: { id: Number(id) },
      data,
    });
  }

  async delete(id) {
    return prisma.appointment.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new AppointmentRepository();
