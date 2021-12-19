const jwt = require("jsonwebtoken");

const createJWTToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "12h",
  });
};
const checkToken = (req, res, next) => {
  var token = req.headers.authorization.split(" ")[1];

  if (req.method !== "OPTIONS") {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: err.message,
          status: "Unauthorized",
        });
      }

      req.user = decoded;
      next();
    });
  }
};

module.exports = {
  createJWTToken,
  checkToken,
};
