const express = require("express");
require('./models/db');
const UsersRouter = require("./routes/usersDb");
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

app.get("/", (req, res, next) => {
  res.send("Hello world");
});

app.post("/", (req, res, next) => {
  res.send("Hello world from POST : " + JSON.stringify(req.body));
});

app.put("/", (req, res, next) => {
  res.send("Hello world from PUT : " + JSON.stringify(req.body));
});

app.use(UsersRouter);
app.use(SecurityRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
