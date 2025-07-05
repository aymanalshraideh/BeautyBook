const { z } = require('zod');

const appointmentSchema = z.object({
  date: z.string().datetime().or(z.date()),
  notes: z.string().optional(),
  serviceId: z.number({ required_error: "Service is required" }),
  customerId: z.number().optional(), 
  staffId: z.number().optional(), 
});

module.exports = {
  appointmentSchema,
};
