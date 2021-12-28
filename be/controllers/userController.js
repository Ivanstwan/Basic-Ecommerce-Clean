const { db } = require("../database");
const bcrypt = require("bcryptjs");
const { createJWTToken } = require("../helper/jwt");
const transporter = require("../helper/nodemailer");

module.exports = {
  sendEmailPortfolio: (req, res) => {
    console.log(req.body);

    const mail
  },
  registerUser: async (req, res) => {
    const { password, email } = req.body;

    // BcyptJS HASH PASSWORD
    // const salt = await bcrypt.genSalt(10);
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        // Store hash in your password DB.
        const queryRegister = `INSERT INTO user (email, password, role,verified) values (${db.escape(
          email
        )}, ${db.escape(hash)}, 0, 'no');`;

        db.query(queryRegister, (err, results) => {
          if (err) {
            res.status(500).send(err);
          }

          // nodemailer
          let token = createJWTToken({ email });

          let mail = {
            from: `admin <id.private.bootcamp@gmail.com>`,
            to: `${email}`,
            subject: `Account Verification`,
            html: `<a href="http://localhost:3000/auth/${token}">Click here to verified your account.</a>`,
          };

          transporter.sendMail(mail, (errMail, resMail) => {
            if (errMail) {
              res.status(500).send({
                message: "Registration failed",
                success: false,
                err: errMail,
              });
            }
            res.status(200).send({
              message: "Registration success, check your email",
              success: true,
            });
          });
        });
      });
    });
    // const hash = await bcrypt.hash(password, salt);
  },
  verification: (req, res) => {
    let updateQuery = `UPDATE user set verified = 'yes' where email = ${db.escape(
      req.user.email
    )}`;

    db.query(updateQuery, (err, results) => {
      if (err) {
        res.status(500).send("error");
      }
      res.status(200).send({
        message: "berhasil verifikasi account",
        success: true,
      });
    });
  },
  checkEmail: (req, res) => {
    let scriptQuery = `SELECT * FROM user where email=${db.escape(
      req.query.email
    )};`;
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  checkUser: (req, res) => {
    let queryCheckUser = `SELECT * FROM user where email=${db.escape(
      req.query.email
    )} and verified="yes";`;

    db.query(queryCheckUser, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  loginUser: (req, res) => {
    const getPassDB = `SELECT id,full_name,password,email,role,verified FROM user where email=${db.escape(
      req.body.email
    )};`;

    db.query(getPassDB, (err, results) => {
      // 1.CONDITION if userData FOUND
      if (results[0]) {
        const passUserDB = results[0].password;
        // 2.compare hash userDB vs userINPUT
        const checkHash = bcrypt.compare(
          req.body.password,
          passUserDB,
          (error, result) => {
            if (result) {
              // 3. when HASH userDB vs userINPUT SAME
              // then make JWT TOKEN to be sent to FE
              const responseData = { ...results[0] };
              const token = createJWTToken(responseData);
              responseData.token = token;
              return res.status(200).send(responseData);
            } else {
              return res
                .status(404)
                .send({ message: "USER NOT FOUND", status: "Not Found" });
            }
          }
        );
      } else {
        return res.status(403).send(err);
      }
    });
  },
  keepLoggedIn: (req, res) => {
    const userKeepLogin = `SELECT id,full_name,password,email,role,verified FROM user where email=${db.escape(
      req.user.email
    )};`;

    db.query(userKeepLogin, (err, results) => {
      if (err) {
        return res
          .status(403)
          .send({ message: "USER TOKEN WEIRD", status: "Not Found" });
      }
      const responseData = { ...results[0] };
      const token = createJWTToken(responseData);
      responseData.token = token;
      return res.status(200).send(responseData);
    });
  },
};
