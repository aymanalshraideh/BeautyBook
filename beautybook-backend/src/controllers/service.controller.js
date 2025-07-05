const serviceService = require("../services/service.service");

class ServiceController {
  async create(req, res) {
    try {
      const service = await serviceService.createService(req.body);
      res.status(201).json(service);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAll(req, res) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    try {
      const result = await serviceService.getAllPaginated(page, limit);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    const service = await serviceService.getServiceById(req.params.id);
    res.json(service);
  }

  async update(req, res) {
    try {
      const service = await serviceService.getById(req.params.id);

      if (!service) return res.status(404).json({ error: "Service not found" });

      const currentUser = req.user;
      if (
        service.userId !== currentUser.userId &&
        currentUser.role !== "admin"
      ) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const updated = await serviceService.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const service = await serviceService.getById(req.params.id);

      if (!service) return res.status(404).json({ error: "Service not found" });

      const currentUser = req.user;
      if (
        service.userId !== currentUser.userId &&
        currentUser.role !== "admin"
      ) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      await serviceService.deleteService(req.params.id);
      res.status(200).json({ message: "Service deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new ServiceController();
