const Income = require('../models/Income');

exports.addIncome = async (req, res) => {
  try {
    const newIncome = new Income({ ...req.body, user: req.user._id });
    await newIncome.save();
    res.json(newIncome);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getIncome = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user._id }).sort({ date: -1 });
    // const incomes = await Income.find({ user: req.user._id }).populate('user', 'fullName email');


    res.json(incomes);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    await Income.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ msg: 'Income deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
