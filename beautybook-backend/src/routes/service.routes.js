const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
const { authenticate } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { serviceSchema } = require('../validators/service.validator');

// Public route
router.get('/', serviceController.getAll);
router.get('/:id', serviceController.getById);

// Protected routes
router.post('/', authenticate, validate(serviceSchema), serviceController.create);
router.put('/:id', authenticate, validate(serviceSchema), serviceController.update);
router.delete('/:id', authenticate, serviceController.delete);

module.exports = router;
