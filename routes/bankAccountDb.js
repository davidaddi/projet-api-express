const { Router } = require("express");
const BankAccount = require("../models/BankAccount");
const checkAuth = require("../middlewares/checkAuth");
const isAdmin = require("../middlewares/isAdmin");
const router = new Router();

// BankAccount 

router.get("/bankaccounts", checkAuth, isAdmin, async (req, res, next) => {
  res.json(await BankAccount.findAll());
});

router.get("/bankaccounts/:id", async (req, res, next) => {
  const bankAccount = await BankAccount.findByPk(parseInt(req.params.id));
  if (bankAccount) {
    res.json(bankAccount);
  } else {
    res.sendStatus(404);
  }
});


router.post("/bankaccounts", async (req, res, next) => {
  try {
    res.status(201).json(await BankAccount.create(req.body));
  } catch (err) {
    res.status(422).json({
      error: err.message,
    });
  }
});

router.patch("/bankaccounts/:id", checkAuth, isAdmin, async (req, res, next) => {
  try {
    const result = await BankAccount.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (result[0] === 0) {
      res.sendStatus(404);
    } else {
      res.json(await BankAccount.findByPk(parseInt(req.params.id)));
    }
  } catch (err) {
    res.status(422).json({
      error: err.message,
    });
  }
});

router.delete("/bankaccounts/:id", checkAuth, isAdmin, async (req, res, next) => {
  const result = await BankAccount.destroy({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.sendStatus(result === 0 ? 404 : 204);
});

module.exports = router;