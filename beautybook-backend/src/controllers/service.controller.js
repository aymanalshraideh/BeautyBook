const serviceService = require("../services/service.service");



class ServiceController {
  async create(req, res) {
    // console.log(req.user);
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res
          .status(401)
          .json({ error: "Unauthorized: User not found in token" });
      }
      const { name, price } = req.body;
     
      const service = await serviceService.createService({
        name,
        price,
        
        // userId,
        user: {
          connect: { id: userId },
        },
      });

      res.status(201).json(service);
    } catch (err) {
      console.log(err);

      res.status(400).json({ error: err.message });
    }
  }

  async getAll(req, res) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const search = req.query.search || '';

    try {
      const result = await serviceService.getAllPaginated(page, limit,search);
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
    const service = await serviceService.getServiceById(req.params.id);

    if (!service) return res.status(404).json({ error: "Service not found" });

    const currentUser = req.user; 
    if (service.userId !== currentUser.userId && currentUser.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized" });
    }

   

    
    const updated = await serviceService.updateService(req.params.id, {
      name: req.body.name,
    
      price: req.body.price,
      
    });

    res.json(updated); 
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


  async delete(req, res) {
    try {
      const service = await serviceService.getServiceById(req.params.id);

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
      console.log(err);
      
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new ServiceController();
