const express = require('express');
const router = express.Router();
const { addExpense, getExpense, deleteExpense } = require('../controllers/expenseController');
const auth = require('../middleware/auth');

router.post('/', auth, addExpense);
router.get('/', auth, getExpense);
router.delete('/:id', auth, deleteExpense);

module.exports = router;
