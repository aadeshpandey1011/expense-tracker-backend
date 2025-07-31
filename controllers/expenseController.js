const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  try {
    const newExpense = new Expense({ ...req.body, user: req.user._id });
    await newExpense.save();
    res.json(newExpense);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
    // const expenses = await Expense.find({ user: req.user._id }).populate('user', 'fullName email');

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ msg: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
