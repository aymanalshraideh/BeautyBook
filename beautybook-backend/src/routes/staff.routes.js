const express = require('express');
const router = express.Router();

const staffController = require('../controllers/staff.controller');
const { authenticate, authorizeAdmin } = require('../middlewares/auth');

router.use(authenticate);
router.use(authorizeAdmin);

router.post('/', staffController.create);
router.get('/', staffController.getAll);
router.get('/:id', staffController.getById);
router.put('/:id', staffController.update);
router.delete('/:id', staffController.delete);

module.exports = router;
