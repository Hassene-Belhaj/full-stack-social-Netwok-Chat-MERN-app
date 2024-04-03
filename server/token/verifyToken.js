const jwt = require("jsonwebtoken");
const { createCustomError } = require("../Middlewares/ErrorHandler");

const VerifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next(createCustomError("you are not authenticated", 401));
  jwt.verify(token, process.env.SECRETJWT, (err, user) => {
    if (err) {
      return next(createCustomError("invalid token", 403));
    } else {
      req.user = user;
    }
    next();
  });
};

module.exports = {
  VerifyToken,
};
