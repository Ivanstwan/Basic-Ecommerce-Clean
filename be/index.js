const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bearerToken = require("express-bearer-token");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3301;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bearerToken());
// express.json => Biar req.body muncul (ga undefined)

// Middleware
const { userRouter, productRouter } = require("./routers");
app.use("/user", userRouter);
app.use("/product", productRouter);

app.listen(PORT, () => console.log("Api Running : ", PORT));
