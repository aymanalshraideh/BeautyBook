const prisma = require('../config/prisma');

class AppointmentRepository {
async create(data) {
  console.log(data);
  

  return prisma.appointment.create({
    data: {
      date: data.date,
      notes: data.notes,
      status: data.status || "pending",
      service: {
        connect: { id: data.serviceId },
      },

      staff: data.staffId ? { connect: { id: data.staffId } } : undefined,

      customer: data.customerId ? { connect: { id: data.customerId } } : undefined,
    },
  });
}


async findAllPaginated({
  page = 1,
  limit = 10,
  search = '',
  status,
  dateFrom,
  dateTo,
  serviceId,
}) {
  const skip = (page - 1) * limit;
  const searchTerm = search.trim();
  const isDateSearch = !isNaN(Date.parse(searchTerm));

  const where = {
    AND: [],
  };

  
  if (searchTerm) {
    const orConditions = [
      {
        customer: {
          name: {
            contains: searchTerm,
          },
        },
      },
      {
        customer: {
          email: {
            contains: searchTerm,
          },
        },
      },
    ];

    if (isDateSearch) {
      orConditions.push({
        date: {
          gte: new Date(new Date(searchTerm).setHours(0, 0, 0, 0)),
          lt: new Date(new Date(searchTerm).setHours(24, 0, 0, 0)),
        },
      });
    }

    where.AND.push({ OR: orConditions });
  }

 
  if (status) {
    where.AND.push({ status });
  }

 
  if (serviceId) {
    where.AND.push({ serviceId: Number(serviceId) });
  }

 
  if (dateFrom || dateTo) {
    const dateFilter = {};
    if (dateFrom) dateFilter.gte = new Date(dateFrom);
    if (dateTo) dateFilter.lte = new Date(dateTo);
    where.AND.push({ date: dateFilter });
  }

  const [data, total] = await Promise.all([
    prisma.appointment.findMany({
      skip,
      take: Number(limit),
      where,
      orderBy: {
        date: 'desc',
      },
      include: {
        service: true,
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        staff: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),
    prisma.appointment.count({ where }),
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
    return prisma.appointment.findUnique({
      where: { id: Number(id) },
    });
  }

async update(id, data) {
  return prisma.appointment.update({
    where: { id: Number(id) },
    data: {
      date: data.date,
      notes: data.notes,
      status: data.status,
      service: {
        connect: { id: data.serviceId },
      },
      staff: data.staffId
        ? { connect: { id: data.staffId } }
        : { disconnect: true },
      customer: data.customerId
        ? { connect: { id: data.customerId } }
        : { disconnect: true },
    },
  });
}


  async delete(id) {
    return prisma.appointment.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new AppointmentRepository();
