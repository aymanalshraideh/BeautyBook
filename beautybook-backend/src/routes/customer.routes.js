const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customer.controller');
const { authenticate, authorizeAdmin } = require('../middlewares/auth');

router.use(authenticate);
router.use(authorizeAdmin);


router.get('/', customerController.getAll);
router.put('/:id', customerController.update);
router.delete('/:id', customerController.delete);

module.exports = router;
