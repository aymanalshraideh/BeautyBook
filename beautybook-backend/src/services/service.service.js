const serviceRepository = require("../repositories/service.repository");

class ServiceService {
  async createService(data) {
    return serviceRepository.create(data);
  }

  async getAllPaginated(page, limit ,search ,minPrice, maxPrice ) {
    return serviceRepository.findAllPaginated(page, limit ,search,minPrice, maxPrice);
  }

  async getServiceById(id) {
    return serviceRepository.findById(id);
  }

  async updateService(id, data) {
    const service = await serviceRepository.findById(id);
    if (!service) throw new Error("Service not found");
    return serviceRepository.update(id, data);
  }

  async deleteService(id) {
    const service = await serviceRepository.findById(id);
    if (!service) throw new Error("Service not found");
    return serviceRepository.delete(id);
  }
}

module.exports = new ServiceService();
