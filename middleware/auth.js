// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).json({ msg: 'No token, access denied' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Invalid token' });
//   }
// };



const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token = req.header('x-auth-token');

  // Support Authorization: Bearer <token>
  if (!token && req.header('Authorization')) {
    const parts = req.header('Authorization').split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
  }

  if (!token) return res.status(401).json({ msg: 'No token, access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Matches authController structure
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
