const { Router } = require("express");
const User = require("../models/User");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get("/users", checkAuth, async (req, res, next) => {
  //res.status(200).send(JSON.stringify(users));
  if (req.userId) {
    req.query.id = req.userId;
  }
  res.json(
    await User.findAll({
      where: req.query,
    })
  );
});

router.post("/users", async (req, res, next) => {
  try {
    res.status(201).json(await User.create(req.body));
  } catch (err) {
    res.status(422).json({
      email: err.message,
    });
  }
});

router.get("/users/:id", async (req, res, next) => {
  const user = await User.findByPk(parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    //res.status(404).end();
    res.sendStatus(404);
  }
});

router.patch("/users/:id", checkAuth, async (req, res, next) => {
  if (req.userId !== parseInt(req.params.id)) res.sendStatus(403);
  try {
    const result = await User.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      individualHooks: true,
    });
    if (result[0] === 0) {
      res.sendStatus(404);
    } else {
      res.json(await User.findByPk(parseInt(req.params.id)));
    }
  } catch (err) {
    res.status(422).json({
      email: err.message,
    });
  }
});

router.delete("/users/:id", checkAuth, async (req, res, next) => {
  const result = await User.destroy({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.sendStatus(result === 0 ? 404 : 204);
});

router.put("/users/:id", async (req, res, next) => {
  try {
    const result = await User.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res
      .status(result === 1 ? 200 : 201)
      .json(await User.create({ ...req.body, id: parseInt(req.params.id) }));
  } catch (err) {
    res.status(422).json({
      email: err.message,
    });
  }
});

module.exports = router;
