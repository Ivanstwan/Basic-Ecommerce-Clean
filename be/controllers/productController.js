const { db } = require("../database");

// NOTES
// 1. getLesserCategory for Navbar Menu
// 2. getLesserParams for MainCategory with params (/fruit)

module.exports = {
  productImageUpload: (req, res) => {
    console.log(req.file);
  },
  getMainCategory: (req, res) => {
    const queryGetMain = `SELECT * FROM main_category;`;

    db.query(queryGetMain, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  getLesserCategory: (req, res) => {
    const queryGetLesser =
      "SELECT * FROM lesser_category INNER JOIN main_category on lesser_category.category_id = main_category.id order by category_name;";

    db.query(queryGetLesser, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(results);
    });
  },
  getLesserParams: (req, res) => {
    const queryGetLesserParams = `SELECT * FROM lesser_category INNER JOIN main_category on lesser_category.category_id = main_category.id where category_name=${db.escape(
      req.query.category
    )} order by category_name`;

    db.query(queryGetLesserParams, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(results);
    });
  },
};
