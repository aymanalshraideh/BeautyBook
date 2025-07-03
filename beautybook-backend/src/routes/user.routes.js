const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const validate = require('../middlewares/validate');
const { registerSchema, loginSchema } = require('../validators/user.validator');

router.post('/register', validate(registerSchema), userController.register);
router.post('/login', validate(loginSchema), userController.login);
router.get('/', userController.getAll);
// router.get('/:id', userController.getById);
router.put('/:id', userController.update); 
router.delete('/:id', userController.delete);

module.exports = router;
