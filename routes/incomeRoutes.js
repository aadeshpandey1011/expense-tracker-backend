const express = require('express');
const router = express.Router();
const { addIncome, getIncome, deleteIncome } = require('../controllers/incomeController');
const auth = require('../middleware/auth');

router.post('/', auth, addIncome);
router.get('/', auth, getIncome);
router.delete('/:id', auth, deleteIncome);

module.exports = router;
