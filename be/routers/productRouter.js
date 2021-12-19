const express = require("express");
const productController = require("../controllers/productController");
const routers = express.Router();
const cloudinary = require("../helper/cloudinary");
const upload = require("../helper/multer");
const { db } = require("../database");

// post LESSER CATEGORY
routers.post("/postcloud", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    // INPUT LESSER CATEGORY TO DB
    const queryInputLesser = `INSERT INTO lesser_category (category_id, lesser_name, lesser_description, image_url, image_id) values 
    (${db.escape(req.query.main)}, ${db.escape(req.query.lesser)}, ${db.escape(
      req.query.desc
    )}, ${db.escape(result.secure_url)}, ${db.escape(result.public_id)});`;
    db.query(queryInputLesser, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  } catch (error) {
    console.log(error);
  }
});

// POST LESSER PRODUCT
// (1.lesserproductimagepost = just image), get response to client image_url and id
// (2.lesserproductpost = then sent all data to db)
routers.post(
  "/lesserproductimagepost",
  upload.single("image"),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);

      console.log({
        url: result.secure_url,
        id: result.public_id,
      });

      const imageURL = result.secure_url;
      const imageID = result.public_id;

      res.status(200).send({ imageURL, imageID });
    } catch (error) {
      console.log(error);
    }
  }
);
routers.post("/lesserproductpost", (req, res) => {
  const {
    selectedLesser,
    selectedProductName,
    selectedDesc,
    stock,
    oriPrice,
    sellPrice,
    selectedDesc2,
    selectedDesc3,
    imageURL,
    imageID,
  } = req.body;

  const queryInputProduct = `INSERT INTO product values (null, ${db.escape(
    selectedLesser
  )}, ${db.escape(selectedProductName)}, ${db.escape(
    selectedDesc
  )}, ${db.escape(selectedDesc2)}, ${db.escape(selectedDesc3)}, ${db.escape(
    imageURL
  )}, ${db.escape(imageID)}, ${db.escape(oriPrice)}, ${db.escape(
    sellPrice
  )}, ${db.escape(stock)}, null);`;

  db.query(queryInputProduct, (err, results) => {
    if (err) res.status(500).send(err);
    res.status(200).send(results);
  });
});

// get main category (fruit, plant, flower, etc)
routers.get("/getmaincategory", productController.getMainCategory);

// for navbar menu (fruit, and the child avocado lemon etc)
routers.get("/getlessercategory", productController.getLesserCategory);
routers.get("/getlesserparams", productController.getLesserParams);

// get lesser product, for lesser product page
// 1. get one lesser category depends on match params
routers.get("/getsinglelesser", (req, res) => {
  const queryGetSingleLesser = `SELECT * FROM lesser_category where lesser_name = ${db.escape(
    req.query.lesser
  )};`;

  db.query(queryGetSingleLesser, (err, results) => {
    if (err) res.status(500).send(err);
    res.status(200).send(results);
  });
});
// 2. get many product in that lesser category (avocado have 10 other kind)
routers.get("/getmanylesser", (req, res) => {
  const queryGetProduct = `SELECT * FROM product INNER JOIN lesser_category on product.lesser_category_id = lesser_category.id where lesser_name = ${db.escape(
    req.query.category
  )};`;

  db.query(queryGetProduct, (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});

// get specific product (1 product)
routers.get("/getlesserproduct", (req, res) => {
  const productName = req.query.product_name;

  const queryGetProduct = `SELECT * FROM product where product_name = ${db.escape(
    productName
  )}`;

  db.query(queryGetProduct, (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});

// ADMIN
// get many lesser category (to be selected for product)
routers.get("/getlessercat", (req, res) => {
  const queryGetLesser = `SELECT * FROM lesser_category;`;

  db.query(queryGetLesser, (err, results) => {
    if (err) res.status(500).send(err);
    res.status(200).send(results);
  });
});

// GET USER CURRENT CART - for PRODUCT PAGE
// so if product-1 already in cart the 'qty value' will just increase by 1, when click add to cart
routers.get("/getitemcart", (req, res) => {
  const queryCheckItemCart = `SELECT user_cart.id, user.email, user_cart.user_id, user_cart.product_id, user_cart.quantity, user_cart.total_price FROM user_cart INNER JOIN user ON user_cart.user_id = user.id
  where email = ${db.escape(req.query.user_email)} and product_id=${db.escape(
    req.query.item
  )};`;

  db.query(queryCheckItemCart, (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});
// COND 1. item cart detected, PATCH CART
routers.patch("/patchitemcart", (req, res) => {
  const queryPatchItemCart = `UPDATE user_cart SET quantity = ${db.escape(
    req.body.add_qty
  )}, total_price = ${db.escape(req.body.total)} where user_id = ${db.escape(
    req.body.user_id
  )} and product_id = ${req.body.product_id};`;

  db.query(queryPatchItemCart, (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});
// COND 2. item not detected,  USER ADD TO CART
routers.post("/additemtocart", (req, res) => {
  const queryAddItemCart = `INSERT INTO user_cart values (null, ${db.escape(
    req.body.user_id
  )}, ${db.escape(req.body.product_id)}, ${db.escape(
    req.body.qty
  )}, ${db.escape(req.body.total)});`;

  db.query(queryAddItemCart, (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});

// CART PAGE
// 1. get cart user (all not single/specific item `unlike the PRODUCT PAGE`)
routers.get("/getcartitems", (req, res) => {
  const queryGetCartItems = `SELECT user_cart.id, user_cart.user_id, user_cart.product_id, 
  product.product_name, user_cart.quantity, product.product_image_url, 
  product.selling_price, product.stock, user_cart.total_price FROM user_cart INNER JOIN product ON user_cart.product_id = product.id where user_id = ${db.escape(
    req.query.user_id
  )} order by id;`;

  db.query(queryGetCartItems, (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});
// 2. change total price, if product price change (ga guna harusnya)
routers.patch("/synctotalprice", (req, res) => {
  // console.log(req.query);
});
// 3. i dont know man, bingung nambahin qty di cart gmn
routers.patch("/changeqtycart", (req, res) => {
  const queryUpdateQty = `UPDATE user_cart SET quantity = ${db.escape(
    req.query.new_quantity
  )} where user_id = ${db.escape(
    req.query.user_id
  )} and product_id = ${db.escape(req.query.product_id)};`;

  db.query(queryUpdateQty, (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});
// 4. delete item cart
routers.delete("/deleteitemcart", (req, res) => {
  const queryDeleteItemCart = `DELETE FROM user_cart where user_id = ${db.escape(
    req.query.user_id
  )} and product_id = ${db.escape(req.query.product_id)};`;

  db.query(queryDeleteItemCart, (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});

// USER CHECKOUT
// 1. make new order_detail
routers.post("/neworderdetails", (req, res) => {
  const queryAddOrderItem = `INSERT INTO order_detail (status, created_at, user_id) values (${db.escape(
    req.body.order_status
  )}, ${db.escape(req.body.created_at)}, ${db.escape(req.body.userID)});`;

  db.query(queryAddOrderItem, (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});
// 2. add order_item
routers.post("/neworderitem", (req, res) => {
  const queryAddOrderItem = `INSERT INTO order_item (product_id, quantity, current_price, order_detail_id) values (${db.escape(
    req.body.product_id
  )}, ${db.escape(req.body.quantity)}, ${db.escape(
    req.body.quantity * req.body.selling_price
  )}, ${db.escape(req.body.order_detail_id)});`;

  db.query(queryAddOrderItem, (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});
// 3. patch order detail total
routers.patch("/patchordertotal", (req, res) => {
  const queryAddTotal = `UPDATE order_detail SET order_total = ${db.escape(
    req.query.add_total
  )} where id = ${db.escape(req.query.order_detail_id)};`;

  db.query(queryAddTotal, (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});
// 4. get product stock
routers.get("/getstockitem", (req, res) => {
  const queryGetStockItem = `SELECT * FROM product where product_name = ${db.escape(
    req.query.product_name
  )}`;

  db.query(queryGetStockItem, (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});
// 5. change stock after user order
routers.patch("/patchstockitem", (req, res) => {
  const queryPatchStockItem = `UPDATE product SET stock = ${db.escape(
    req.query.stock_change
  )} WHERE id = ${db.escape(req.query.product_id)};`;

  db.query(queryPatchStockItem, (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});

// USER TRANSACTION
// 1. get user transaction (order details w/ order items)
routers.get("/getusertransaction", (req, res) => {
  const queryGetUserTrans = `SELECT * FROM order_detail INNER JOIN 
  (order_item INNER JOIN product on order_item.product_id = product.id) on order_detail.id = order_item.order_detail_id where user_id = ${db.escape(
    req.query.userid
  )} ORDER BY order_item.id DESC;`;

  db.query(queryGetUserTrans, (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});

// ADMIN USER TRANSACTION
// 1. get user order details, order item, and product table (product table needed for product_name)
routers.get("/admingetuserorddet", (req, res) => {
  const queryAdminGetUserOD = `SELECT * FROM order_detail INNER JOIN (order_item INNER JOIN product on order_item.product_id = product.id) ON order_detail.id = order_item.order_detail_id 
  where MONTH(order_detail.created_at) = ${db.escape(
    req.query.month
  )} and YEAR(order_detail.created_at) = ${db.escape(
    req.query.year
  )} order by order_detail.id desc;`;

  db.query(queryAdminGetUserOD, (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});
// 2. button ACCEPT (status from 'pending' => 'completed')
routers.patch("/adminorderaccept", (req, res) => {
  const queryAdminOrderAccept = `UPDATE order_detail SET status = "accepted" where id = ${db.escape(
    req.query.order_detail_id
  )};`;

  db.query(queryAdminOrderAccept, (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});
// 3. button REJECT (status from 'pending' => 'rejected')
routers.patch("/adminorderreject", (req, res) => {
  const queryAdminOrderReject = `UPDATE order_detail SET status = "rejected" where id = ${db.escape(
    req.query.order_detail_id
  )};`;

  db.query(queryAdminOrderReject, (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});
// 4. restock product if REJECTED

// ADMIN RESTOCK
// 1. get product
routers.get("/getforrestock", (req, res) => {
  const queryGetForRestock = `SELECT * FROM product;`;

  db.query(queryGetForRestock, (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});
// 2. single product get stock
routers.get("/singlegetproduct", (req, res) => {
  const queryGetSingleProduct = `SELECT * FROM product where id=${db.escape(
    req.query.product_id
  )};`;

  db.query(queryGetSingleProduct, (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});
// 3. single product add stock (w/ patch)
routers.patch("/patchsingleproduct", (req, res) => {
  const queryPatchSingleProduct = `UPDATE product SET stock = ${db.escape(
    req.query.restock
  )} where id = ${db.escape(req.query.product_id)}`;

  db.query(queryPatchSingleProduct, (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});

module.exports = routers;
