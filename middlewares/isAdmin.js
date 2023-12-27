const jwt = require("jsonwebtoken");
const User = require('../models/User');

module.exports = async function checkAdmin(req, res, next) {
  try {
    const userId = req.userId;
    const user = await User.findByPk(userId);

    if (user && user.role === 'admin') {
      next();
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};