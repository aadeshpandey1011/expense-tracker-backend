const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({ fullName, email, password: hashed });
    await newUser.save();

    const token = jwt.sign(
      { user: { _id: newUser._id, fullName, email } },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );


    res.json({ token, user: { id: newUser._id, fullName, email } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign(
      { user: { _id: user._id, fullName: user.fullName, email: user.email } },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );


    res.json({ token, user: { id: user._id, fullName: user.fullName, email } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
