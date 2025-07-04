const staffService = require('../services/staff.service');

class StaffController {
  async create(req, res) {
    try {
      const staff = await staffService.createStaff(req.body);
      res.status(201).json(staff);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAll(req, res) {
    const staff = await staffService.getAllStaff();
    res.json(staff);
  }

  async getById(req, res) {
    const staff = await staffService.getStaffById(req.params.id);
    if (!staff) return res.status(404).json({ error: 'Staff not found' });
    res.json(staff);
  }

  async update(req, res) {
    try {
      const updated = await staffService.updateStaff(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await staffService.deleteStaff(req.params.id);
      res.status(200).json({ message: 'Staff deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new StaffController();
