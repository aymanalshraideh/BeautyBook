const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@beautybook.com' },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: 'admin@beautybook.com',
        password: hashedPassword,
        role: 'admin',
      },
    });

    console.log('✅ Admin user created: admin@beautybook.com / admin123');
  } else {
    console.log('⚠️ Admin already exists');
  }


  const existingStaff = await prisma.user.findUnique({
    where: { email: 'staff@beautybook.com' },
  });

  if (!existingStaff) {
    const hashedPassword = await bcrypt.hash('staff123', 10);

    await prisma.user.create({
      data: {
        name: 'Staff Member',
        email: 'staff@beautybook.com',
        password: hashedPassword,
        role: 'staff',
      },
    });

    console.log('✅ Staff user created: staff@beautybook.com / staff123');
  } else {
    console.log('⚠️ Staff already exists');
  }

  // Seed Customer User
  const existingCustomer = await prisma.user.findUnique({
    where: { email: 'customer@beautybook.com' },
  });

  if (!existingCustomer) {
    const hashedPassword = await bcrypt.hash('customer123', 10);

    await prisma.user.create({
      data: {
        name: 'Customer User',
        email: 'customer@beautybook.com',
        password: hashedPassword,
        role: 'customer',
      },
    });

    console.log('✅ Customer user created: customer@beautybook.com / customer123');
  } else {
    console.log('⚠️ Customer already exists');
  }

  // Seed Services for Staff
  const staffUser = await prisma.user.findUnique({
    where: { email: 'staff@beautybook.com' },
  });

  if (staffUser) {
    const services = [
      { name: 'Haircut', price: 30, userId: staffUser.id },
      { name: 'Facial', price: 50, userId: staffUser.id },
      { name: 'Manicure', price: 20, userId: staffUser.id },
      { name: 'Pedicure', price: 25, userId: staffUser.id },
    ];

    for (const service of services) {
      const existingService = await prisma.service.findFirst({
        where: {
          name: service.name,
        },
      });

      if (!existingService) {
        await prisma.service.create({
          data: service,
        });

        console.log(`✅ Service created: ${service.name}`);
      } else {
        console.log(`⚠️ Service already exists: ${service.name}`);
      }
    }
  }


  const customer = await prisma.user.findUnique({
    where: { email: 'customer@beautybook.com' },
  });

  const servicesForAppointment = await prisma.service.findMany();

  if (customer && servicesForAppointment.length > 0) {
    for (const service of servicesForAppointment) {
      const appointmentDate = new Date();
      appointmentDate.setHours(appointmentDate.getHours() + 2); 

      const appointment = await prisma.appointment.create({
        data: {
          date: appointmentDate,
          serviceId: service.id,
          customerId: customer.id,
          status: 'pending',
        },
      });

      console.log(`✅ Appointment created for customer: ${customer.email} for service: ${service.name}`);
    }
  } else {
    console.log('⚠️ No customer or services found for appointments');
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
