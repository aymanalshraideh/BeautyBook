const { z } = require('zod');

const serviceSchema = z.object({
  name: z.string().min(2, 'Service name is too short'),
  price: z.number().min(0, 'Price must be positive'),

  userId: z.number().optional(),
 
});

module.exports = {
  serviceSchema,
};
