const express = require("express");
require("./models/db");
const UsersRouter = require("./routes/usersDb");
const BankAccountRouter = require("./routes/bankAccountDb");
const CreditCardRouter = require("./routes/creditCardsDb");
const TransactionRouter = require("./routes/transactionsDb");
const SecurityRouter = require("./routes/security");

const app = express();

app.use(express.json());
// <=>
// function parseBody(req, res, next) {
//  const bufferList = [];
//  req.on("data", (chunk) => {
//    bufferList.push(chunk);
//  });

//  req.on("end", () => {
//    const body = JSON.parse(Buffer.concat(bufferList).toString//());

//    req.body = body;
//    next();
//  });
// }

app.use(UsersRouter);
app.use(BankAccountRouter);
app.use(CreditCardRouter);
app.use(TransactionRouter);
app.use(SecurityRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
