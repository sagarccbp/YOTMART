const jsonWebToken = require("jsonwebtoken");
const role = require("../models/role");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token.split(" ")[1];
  if (authHeader) {
    jsonWebToken.verify(
      authHeader,
      process.env.EVENTUM_SECRATE_KEY,
      (err, user) => {
        if (err) {
          return res.status(403).json({
            message: "Token is not valid",
          });
        } else {
          req.user = user;
          next();
        }
      }
    );
  } else {
    return res.status(401).json({
      message: "Un authorized token",
    });
  }
};

const verifyTokenAndCheckIsAdmin = (req, res, next) => {
  const user = req.user;
  role
    .findById(user.role)
    .then((role) => {
      if (role.name === "Admin") {
        next();
      }
    })
    .catch((err) => {
      return res.status(403).json({
        message: "Un authorized token",
      });
    });
};

module.exports = { verifyToken, verifyTokenAndCheckIsAdmin };
