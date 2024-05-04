const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(403).json({ msg: "Unauthorized!" });
  }

  const token = authHeader.split(" ")[1];
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.secret_key);
    req.user = { userId: decoded.userId, username: decoded.username };
    next();
  } catch (error) {
    res.status(400).json({ msg: "Invalid Token" });
  }
};

module.exports = auth;
