const express = require("express");
const { userController } = require("../controllers");
const { checkToken } = require("../helper/jwt");
const routers = express.Router();
const { auth } = require("../helper/authToken");

// register
routers.post("/register", userController.registerUser);
routers.get("/checkemail", userController.checkEmail);
// verif
routers.patch("/verified", auth, userController.verification);
// login
routers.get("/checkuser", userController.checkUser);
routers.post("/login", userController.loginUser);
// keep logged in
routers.post("/keeploggedin", checkToken, userController.keepLoggedIn);

// PORTFOLIO
routers.post("/portofolio", userController);

module.exports = routers;
