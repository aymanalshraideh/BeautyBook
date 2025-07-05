const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');
const { authenticate } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { appointmentSchema } = require('../validators/appointment.validator');


router.use(authenticate);

router.post('/', validate(appointmentSchema), appointmentController.create);
router.get('/', appointmentController.getAll);
router.get('/:id', appointmentController.getById);

router.put('/:id', validate(appointmentSchema), appointmentController.update);
router.delete('/:id', appointmentController.delete);

module.exports = router;
