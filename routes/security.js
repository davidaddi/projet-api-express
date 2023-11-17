const { Router } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user)
      res.status(422).json({
        email: "Invalid credentials",
      });
    else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
          {
            sub: user.id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "90 days",
          }
        );
        res.json({
          token,
        });
      } else
        res.status(422).json({
          email: "Invalid credentials",
        });
    }
  } catch (err) {
    res.status(422).json({
      email: err.message,
    });
  }
});

module.exports = router;
