import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { URL_API } from "../helper";
import "./userCart.css";
import Axios from "axios";
import { useHistory } from "react-router";

function UserCart(props) {
  // render Cart Items (after axios get)
  const [renderCartItems, setRenderCartItems] = useState([]);

  // pure data from db
  const [dbData, setDbData] = useState();

  // state quantity in array [2, 4, 5] => [prod1, prod2, prod3]
  const [harga, setHarga] = useState(0);

  // loading when clicked
  const [submitLoading, setSubmitLoading] = useState(true);
  const [buttonMessage, setButtonMessage] = useState("Checkout");

  const [messageErr, setMessageErr] = useState("");

  let history = useHistory();

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = () => {
    Axios.get(`${URL_API}/product/getcartitems?user_id=${props.user.id}`)
      .then((res) => {
        var totalHarga = 0;

        setDbData(res.data);

        const renderCart = res.data.map((data) => {
          totalHarga += totalHarga + data.quantity * data.selling_price;

          if (data.quantity > data.stock) {
            setMessageErr(
              `Stock ${data.product_name} : ${data.stock}, your quantity : ${data.quantity}`
            );
            setSubmitLoading(false);
          }

          return (
            <div className="shopcart-left-item">
              <div className="shopcart-item-image-container">
                <div className="shopcart-item-image">
                  <img
                    src={data.product_image_url}
                    className="shopcart-item-img"
                  />
                </div>
                <div className="shopcart-item-name">{data.product_name}</div>
              </div>
              <div className="shopcart-item-price">
                Rp. {data.selling_price}
              </div>
              <div className="shopcart-item-qty">
                <div
                  className="fas fa-minus"
                  onClick={() => {
                    Axios.patch(
                      `${URL_API}/product/changeqtycart?user_id=${
                        data.user_id
                      }&product_id=${data.product_id}&new_quantity=${
                        data.quantity - 1
                      }`
                    );
                    setMessageErr(``);
                    getCartItems();
                    setSubmitLoading(true);
                    getCartItems();
                  }}
                ></div>
                <div className="shopcart-item-input-qty">{data.quantity}</div>
                <div
                  className="fas fa-plus"
                  onClick={() => {
                    Axios.patch(
                      `${URL_API}/product/changeqtycart?user_id=${
                        data.user_id
                      }&product_id=${data.product_id}&new_quantity=${
                        data.quantity + 1
                      }`
                    );
                    getCartItems();
                    getCartItems();
                  }}
                ></div>
              </div>
              <div className="shopcart-item-subtotal">
                <div>Rp. {data.quantity * data.selling_price}</div>
                <div
                  className="fas fa-trash"
                  onClick={() => {
                    Axios.delete(
                      `${URL_API}/product/deleteitemcart?user_id=${data.user_id}&product_id=${data.product_id}`
                    );
                    getCartItems();
                    getCartItems();
                  }}
                ></div>
              </div>
            </div>
          );
        });

        setHarga(totalHarga);

        setRenderCartItems(renderCart);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeQty = () => {
    Axios.patch();
  };

  const checkState = () => {
    console.log(renderCartItems);
    console.log(document.getElementById("itemKe1"));
    console.log(harga);
  };

  return (
    <div className="shopping-cart">
      <div className="shopping-cart-left-container">
        {/* <button
          onClick={() => {
            checkState();
          }}
        >
          checkState
        </button>
        <button
          onClick={() => {
            checkTarget();
          }}
        >
          cek
        </button> */}
        <div className="shopcart-left-text">Shopping Cart</div>
        <div className="shopcart-left-title-list">
          <div className="shopcart-left-title">Item</div>
          <div className="shopcart-left-title">Price</div>
          <div className="shopcart-left-title">Qty</div>
          <div className="shopcart-left-title">Subtotal</div>
        </div>
        <div className="shopcart-left-item-container">{renderCartItems}</div>
      </div>
      <div className="shopping-cart-right-container">
        <div className="shopcart-right-box">
          <div className="shopcart-box-title">Order Detail</div>
          <div className="shopcart-box-subtotal">
            <div>Subtotal</div>
            <div>Rp. {harga}</div>
          </div>
          <div className="shopcart-box-shipping">
            <div>Shipping Cost</div>
            <div>Free</div>
          </div>
          <div className="shopcart-box-total">
            <div>Order Total</div>
            <div>{harga}</div>
          </div>
        </div>
        <button
          // className="shopcart-checkout-button"
          className={
            renderCartItems[0] && submitLoading
              ? "shopcart-checkout-button"
              : "shopcart-checkout-button-disabled"
          }
          onClick={() => {
            setSubmitLoading(false);
            setButtonMessage("Loading...");

            // make date format for mysql
            // 1. date format
            const dateToday = new Date();
            let todayDay = dateToday.getDate();
            let todayMonth = dateToday.getMonth() + 1;
            let todayYear = dateToday.getFullYear();

            const dateMysqlFormat = `${todayYear}-${todayMonth}-${todayDay}`;

            // 2. hour format
            let nowHour = dateToday.getHours();
            let nowMinute = dateToday.getMinutes();
            let nowSecond = dateToday.getSeconds();

            const hourMysqlFormat = `${nowHour}:${nowMinute}:${nowSecond}`;

            // 3. combine both
            const dataDateMysql = `${dateMysqlFormat} ${hourMysqlFormat}`;

            Axios.post(`${URL_API}/product/neworderdetails`, {
              order_status: "pending",
              created_at: dataDateMysql,
              userID: props.user.id,
            })
              .then((res) => {

                // total price
                var total_price_db = 0;

                for (let i = 0; i < dbData.length; i++) {
                  total_price_db = total_price_db + dbData[i].total_price;
                  // post order item
                  Axios.post(`${URL_API}/product/neworderitem`, {
                    ...dbData[i],
                    order_detail_id: res.data.insertId,
                  })
                    .then((res) => {
                      // delete item in user cart
                      Axios.delete(
                        `${URL_API}/product/deleteitemcart?user_id=${dbData[i].user_id}&product_id=${dbData[i].product_id}`
                      );
                      // 1.a get product stock
                      Axios.get(
                        `${URL_API}/product/getstockitem?product_name=${dbData[i].product_name}`
                      )
                        .then((res) => {
                          // 1.b change stock after user order
                          Axios.patch(
                            `${URL_API}/product/patchstockitem?product_id=${
                              res.data[0].id
                            }&stock_change=${
                              res.data[0].stock - dbData[i].quantity
                            }`
                          );
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }

                // add total price to order_detail
                Axios.patch(
                  `${URL_API}/product/patchordertotal?order_detail_id=${res.data.insertId}&add_total=${total_price_db}`
                );

                history.push("/orderdetail");
              })
              .catch((err) => {
                console.log(err);
              });
          }}
          disabled={renderCartItems[0] && submitLoading ? false : true}
        >
          {buttonMessage}
        </button>
        <div className="user-cart-err-message">{messageErr}</div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

export default connect(mapStateToProps)(UserCart);
