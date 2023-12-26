const { Router } = require("express");
const CreditCard = require("../models/CreditCard");
const checkAuth = require("../middlewares/checkAuth");
const isAdmin = require("../middlewares/isAdmin");
const router = new Router();

// CreditCard 

router.get("/creditcards", checkAuth, isAdmin, async (req, res, next) => {
  res.json(await CreditCard.findAll());
});

router.get("/creditcards/:id", async (req, res, next) => {
  const creditCard = await CreditCard.findByPk(parseInt(req.params.id));
  if (creditCard) {
    res.json(creditCard);
  } else {
    res.sendStatus(404);
  }
});


router.post("/creditcards", async (req, res, next) => {
  try {
    res.status(201).json(await CreditCard.create(req.body));
  } catch (err) {
    res.status(422).json({
      error: err.message,
    });
  }
});

router.delete("/creditcards/:id", checkAuth, isAdmin, async (req, res, next) => {
  const result = await CreditCard.destroy({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.sendStatus(result === 0 ? 404 : 204);
});


module.exports = router;
