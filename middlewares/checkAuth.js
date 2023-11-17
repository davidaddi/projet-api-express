const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.Authorization ?? req.headers.authorization;
  if (!authHeader) res.sendStatus(401);
  const [type, token] = authHeader.split(/\s+/);
  if (type !== "Bearer") res.sendStatus(401);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.sub;
    next();
  } catch (e) {
    res.sendStatus(401);
    console.error(e);
  }
};
