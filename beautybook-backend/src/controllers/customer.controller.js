const customerService = require("../services/customer.service");

class CustomerController {
  async getAll(req, res) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const result = await customerService.getPaginatedCustomers(page, limit);
    res.json(result);
  }

  async update(req, res) {
    try {
      const updated = await customerService.updateCustomer(
        req.params.id,
        req.body
      );
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await customerService.deleteCustomer(req.params.id);
      res.status(200).json({ message: "Customer deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new CustomerController();
