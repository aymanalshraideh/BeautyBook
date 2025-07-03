const userService = require('../services/user.service');

class UserController {
  async register(req, res) {
    try {
      const user = await userService.register(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await userService.login(email, password);
      res.json(result);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }

  async getAll(req, res) {
    const users = await userService.getAll();
    res.json(users);
  }

// async getById(req, res) {
//   const user = await userService.getById(+req.params.id); 
//   res.json(user);
// }


  async update(req, res) {
    const updated = await userService.update(+req.params.id, req.body);
    res.json(updated);
  }

  async delete(req, res) {
    await userService.delete(+req.params.id);
    res.status(204).send();
  }
}

module.exports = new UserController();
