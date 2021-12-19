import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import "./userOrderDetails.css";
import Axios from "axios";
import { URL_API } from "../helper";
import { useEffect } from "react";

function UserOrderDetails(props) {
  const [userTransaction, setUserTransaction] = useState();

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // render card
  const [renderCard, setRenderCard] = useState();

  useEffect(() => {
    getUserTransaction();
  }, []);

  const checkState = () => {
    console.log(userTransaction);
    console.log(renderCard);
  };

  const getUserTransaction = () => {
    console.log(props.user, "[props user]");
    Axios.get(`${URL_API}/product/getusertransaction?userid=${props.user.id}`)
      .then((res) => {
        console.log("test");
        console.log(res, "[res get user transaction[");
        setUserTransaction(res.data);

        var orderDetailID = [];
        var renderOrder = [];

        for (let i = 0; i < res.data.length; i++) {
          if (!orderDetailID.includes(res.data[i].order_detail_id)) {
            orderDetailID.push(res.data[i].order_detail_id);

            renderOrder.push(
              <div className="ut-card">
                <div className="ut-card-title">
                  <div className="ut-card-title-date">
                    {res.data[i].created_at.substr(8, 2) +
                      " " +
                      month[res.data[i].created_at.substr(5, 2) - 1] +
                      " " +
                      res.data[i].created_at.substr(0, 4) +
                      " - " +
                      res.data[i].created_at.substr(11, 8)}
                  </div>
                  <div
                    className={
                      "ut-card-title-status stat" + "-" + res.data[i].status
                    }
                  >
                    {res.data[i].status}
                  </div>
                </div>
                <div className="ut-card-content">
                  <div className="ut-card-image-container">
                    <img
                      src={res.data[i].product_image_url}
                      className="ut-card-image"
                    />
                  </div>
                  <div className="ut-card-name">
                    <div className="ut-card-name-product">
                      {res.data[i].product_name}
                    </div>
                    <div className="ut-card-name-product-price">
                      {res.data[i].quantity} x Rp.{" "}
                      {res.data[i].current_price / res.data[i].quantity}
                    </div>
                    <div className="ut-card-name-product-other">
                      + other product
                    </div>
                  </div>
                  <div className="ut-card-total">
                    <div className="ut-card-total-text">Total Price</div>
                    <div className="ut-card-total-price">
                      Rp. {res.data[i].order_total}
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            console.log("lol");
          }
          // console.log(orderDetailID.includes(res.data[i].order_detail_id));
          console.log(orderDetailID);
        }

        setRenderCard(renderOrder);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const patchOrderTotal = () => {
    console.log("patch order total");
  };

  return (
    <div className="user-transaction">
      <div className="user-transaction-container">
        <div className="ut-title">User Transaction</div>
        {/* <button
          onClick={() => {
            checkState();
          }}
        >
          checkState
        </button>
        <button
          onClick={() => {
            getUserTransaction();
          }}
        >
          checkState
        </button> */}
        <div className="ut-card-container">
          {renderCard}
          {/* <div className="ut-card">
            <div className="ut-card-title">
              <div className="ut-card-title-date">10 Nov 2021</div>
              <div className="ut-card-title-status stat-pending">Pending</div>
            </div>
            <div className="ut-card-content">
              <div className="ut-card-image-container">
                <img
                  src="https://res.cloudinary.com/basicecommerce/image/upload/v1637914824/z2mpodhlxovdhzsfeyvb.jpg"
                  className="ut-card-image"
                />
              </div>
              <div className="ut-card-name">
                <div className="ut-card-name-product">Lemon Citrus</div>
                <div className="ut-card-name-product-price">10 x Rp. 2000</div>
                <div className="ut-card-name-product-other">
                  +1 other product
                </div>
              </div>
              <div className="ut-card-total">
                <div className="ut-card-total-text">Total Price</div>
                <div className="ut-card-total-price">Rp. 20000</div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  console.log("[mapState1 userFULL]", user);
  console.log("[mapState1 loading]", user.loading);
  console.log("[mapState1 role]", user.role);
  console.log("[mapState1 email]", user.email);
  return {
    user,
  };
};

export default connect(mapStateToProps)(UserOrderDetails);
