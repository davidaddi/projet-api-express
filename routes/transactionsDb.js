const { Router } = require("express");
const Transaction = require("../models/Transaction");
const BankAccount = require("../models/BankAccount");
const checkAuth = require("../middlewares/checkAuth");
const isAdmin = require("../middlewares/isAdmin");
const router = new Router();

//Transaction 

router.get("/transactions", checkAuth, isAdmin, async (req, res, next) => {
  res.json(await Transaction.findAll());
});

router.get("/transactions/:id", async (req, res, next) => {
  const transaction = await Transaction.findByPk(parseInt(req.params.id));
  if (transaction) {
    res.json(transaction);
  } else {
    res.sendStatus(404);
  }
});

router.post("/transactions", async (req, res, next) => {
  try {
    const { senderAccountNumber, receiverAccountNumber, amount } = req.body;

    const senderAccount = await BankAccount.findOne({
      where: { accountNumber: senderAccountNumber },
    });

    const receiverAccount = await BankAccount.findOne({
      where: { accountNumber: receiverAccountNumber },
    });

    if (!senderAccount || !receiverAccount) {
      return res.status(422).json({
        error: "Un ou plusieurs comptes n'existent pas.",
      });
    }

    await senderAccount.update({ 
        balance: senderAccount.balance - amount 
      });
    
    await receiverAccount.update({ 
        balance: receiverAccount.balance + amount 
      }
    );

    const newTransaction = await Transaction.create({
      senderAccountNumber,
      receiverAccountNumber,
      amount,
      date: new Date(), 
    });

    res.status(201).json({
      senderAccount,
      receiverAccount,
      transaction: newTransaction, 
    });
  } catch (err) {
    res.status(422).json({
      error: err.message,
    });
  }
});


module.exports = router;
