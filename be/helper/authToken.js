//  encoding = buat token
//  decoding = menerjemahkan token

const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, decode) => {
      if (err) {
        return res.status(401).send("User not auth");
      }

      console.log("berhasil auth token");

      req.user = decode;

      next();
    });
  },
};

// Tahapan JWT
// user data object > di encrypt jadi sting panjang > decode menjadi object >
//
