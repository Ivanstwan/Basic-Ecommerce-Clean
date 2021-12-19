import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { URL_API } from "../helper";
import Axios from "axios";
import "./adminManageTrans.css";

function AdminManageTrans(props) {
  let history = useHistory();

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // order render
  const [renderData, setRenderData] = useState("");

  const [generateMonth, setGenerateMonth] = useState([<option>None</option>]);
  const [generateYear, setGenerateYear] = useState([<option>None</option>]);
  // get current month and year value
  const [selectPeriod, setSelectPeriod] = useState({
    month: "12",
    year: "2021",
  });

  useEffect(() => {
    if (props.user.role !== 99) {
      history.push("/");
    } else if (props.user.role === 99) {
      getUserOrder();
      generateOption();
    }
  }, []);

  const monthReference = [
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

  const generateOption = () => {
    let dateToday = new Date();
    let todayMonth = dateToday.getMonth() + 1;
    let todayYear = dateToday.getFullYear();

    if (dateToday.getFullYear()) {
    }

    var monthArr = [];
    var yearArr = [];

    var monthList = [
      "Januari",
      "Febuari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    var initialYear = 2021;

    var selisihTahun = todayYear - initialYear;

    for (let i = 0; i < 12; i++) {
      monthArr.push(<option value={i + 1}>{monthList[i]}</option>);
    }

    for (let i = initialYear; i <= todayYear; i++) {
      yearArr.push(<option value={i}>{i}</option>);
    }

    setGenerateMonth(monthArr);
    setGenerateYear(yearArr);
  };

  const checkState = () => {
    console.log(renderData);
  };

  const getUserOrder = () => {
    if (!selectedMonth) {
      const date = new Date();
      // const month = date.getMonth() + 1;
      const year = date.getFullYear();
      setSelectedMonth(1);
      setSelectedYear(year);

      Axios.get(`${URL_API}/product/admingetuserorddet?month=${1}&year=${year}`)
        .then((res) => {
          var renderUserTrans = [];
          var fromNumToNum = [];

          // 1.1 fill array with 'order_detail_id' and 'slice number'
          for (let i = 0; i < res.data.length; i++) {
            // COND 1. IF data.length only 1 data
            if (res.data.length === 1) {
              renderUserTrans.push(res.data[i].order_detail_id);
              fromNumToNum.push(0);
              fromNumToNum.push(1);
            }
            // COND 2. IF data.length more than 1 (2 or more)
            else if (res.data.length > 1) {
              // cond 2.1 initial cond
              if (!renderUserTrans[0]) {
                renderUserTrans.push(res.data[i].order_detail_id);
                fromNumToNum.push(0);
              }
              // cond 2.2 last data && order detail sama dengan yg sebelumnya
              else if (
                !res.data[i + 1] &&
                res.data[i].order_detail_id === res.data[i - 1].order_detail_id
              ) {
                fromNumToNum.push(i + 1);
              }
              // cond 2.3 last data && order detail tidak sama dengan yg sebelumnya
              else if (
                !res.data[i + 1] &&
                res.data[i].order_detail_id !== res.data[i - 1].order_detail_id
              ) {
                renderUserTrans.push(res.data[i].order_detail_id);
                fromNumToNum.push(i);
                fromNumToNum.push(i + 1);
              }
              // cond 2.4 not last data && order detail sama dengan sebelumnya
              else if (
                res.data[i].order_detail_id === res.data[i - 1].order_detail_id
              ) {
                console.log("order detail " + i + " sama");
              }
              // cond 2.5 not last data && order detail tidak sama dengan sebelumnya
              else if (
                res.data[i].order_detail_id !== res.data[i - 1].order_detail_id
              ) {
                console.log("order detail " + i + " tidak sama");
                renderUserTrans.push(res.data[i].order_detail_id);
                fromNumToNum.push(i);
              }
            }
          }

          // 1.2 var for data ordered (1 obj have 2 orderdetail)
          var orderedData = [];

          for (let i = 0; i < fromNumToNum.length; i++) {
            if (!fromNumToNum[i + 1]) {
              console.log("done");
            } else {
              orderedData.push(
                res.data.slice(fromNumToNum[i], fromNumToNum[i + 1])
              );
            }
          }

          // !!! RENDER FOR ORDER DETAIL + ORDER ITEM
          // for ORDER DETAIL = only the first child is rendered (order item no 1 if there is more than 1 order item)
          // for ORDER ITEM = render ALL but visible only when PARENT COMPONENT IS HOVERED
          var renderOrderedData = orderedData.map((data) => {
            // A. for order item (right)
            var dataMap = data.map((dat) => {
              return (
                <div className="adm-manage-item">
                  <div className="adm-manage-item-picture-container">
                    <img
                      src={dat.product_image_url}
                      className="adm-manage-item-picture"
                    />
                  </div>
                  <div className="adm-manage-item-text-container">
                    <div className="adm-manage-item-name">
                      {dat.product_name}
                    </div>
                    <div className="adm-manage-item-quantity-price">
                      {dat.quantity} x {dat.selling_price}
                    </div>
                    <div className="adm-manage-item-total-current">
                      {dat.current_price}
                    </div>
                  </div>
                </div>
              );
            });

            // B. for order detail (left)

            var orderDetailLeft = (
              <div className="am-orderdetail-left">
                <div className="am-orderdetail-left-image-container">
                  <img
                    src={data[0].product_image_url}
                    className="am-orderdetail-left-image"
                  />
                </div>
                <div className="am-orderdetail-left-text">
                  <div className="am-orderdetail-left-date">
                    {data[0].created_at.substr(8, 2) +
                      " " +
                      monthReference[data[0].created_at.substr(5, 2) - 1] +
                      " " +
                      data[0].created_at.substr(0, 4) +
                      " - " +
                      data[0].created_at.substr(11, 8)}
                  </div>
                  <div className="am-orderdetail-left-total">
                    Rp. {data[0].order_total}
                  </div>
                  <div className="am-orderdetail-left-status">
                    Status :
                    <div
                      className={`am-orderdetail-left-status-${data[0].status}`}
                    >
                      {data[0].status}
                    </div>
                  </div>
                </div>
                <div className="am-orderdetail-left-button">
                  {data[0].status === "pending" ? (
                    <>
                      <button
                        onClick={() => {
                          Axios.patch(
                            `${URL_API}/product/adminorderaccept?order_detail_id=${data[0].order_detail_id}`
                          );
                          getUserOrder();
                          getUserOrder();
                        }}
                        className="am-orderdetail-left-button-accept"
                      >
                        Accept Order
                      </button>
                      <button
                        onClick={() => {
                          Axios.patch(
                            `${URL_API}/product/adminorderreject?order_detail_id=${data[0].order_detail_id}`
                          );
                          getUserOrder();
                          getUserOrder();
                        }}
                        className="am-orderdetail-left-button-reject"
                      >
                        Reject Order
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            );

            return (
              <div className="adm-manage-lil">
                <div className="adm-manage-orderdetail">
                  {/* ini order detail */}
                  {orderDetailLeft}
                </div>
                <div className="adm-manage-item-container">{dataMap}</div>
              </div>
            );
          });

          setRenderData(renderOrderedData);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (selectedMonth) {
      Axios.get(
        `${URL_API}/product/admingetuserorddet?month=${selectedMonth}&year=${selectedYear}`
      )
        .then((res) => {
          var renderUserTrans = [];
          var fromNumToNum = [];

          // 1.1 fill array with 'order_detail_id' and 'slice number'
          for (let i = 0; i < res.data.length; i++) {
            // COND 1. IF data.length only 1 data
            if (res.data.length === 1) {
              renderUserTrans.push(res.data[i].order_detail_id);
              fromNumToNum.push(0);
              fromNumToNum.push(1);
            }
            // COND 2. IF data.length more than 1 (2 or more)
            else if (res.data.length > 1) {
              // cond 2.1 initial cond
              if (!renderUserTrans[0]) {
                renderUserTrans.push(res.data[i].order_detail_id);
                fromNumToNum.push(0);
              }
              // cond 2.2 last data && order detail sama dengan yg sebelumnya
              else if (
                !res.data[i + 1] &&
                res.data[i].order_detail_id === res.data[i - 1].order_detail_id
              ) {
                fromNumToNum.push(i + 1);
              }
              // cond 2.3 last data && order detail tidak sama dengan yg sebelumnya
              else if (
                !res.data[i + 1] &&
                res.data[i].order_detail_id !== res.data[i - 1].order_detail_id
              ) {
                renderUserTrans.push(res.data[i].order_detail_id);
                fromNumToNum.push(i);
                fromNumToNum.push(i + 1);
              }
              // cond 2.4 not last data && order detail sama dengan sebelumnya
              else if (
                res.data[i].order_detail_id === res.data[i - 1].order_detail_id
              ) {
                console.log("order detail " + i + " sama");
              }
              // cond 2.5 not last data && order detail tidak sama dengan sebelumnya
              else if (
                res.data[i].order_detail_id !== res.data[i - 1].order_detail_id
              ) {
                console.log("order detail " + i + " tidak sama");
                renderUserTrans.push(res.data[i].order_detail_id);
                fromNumToNum.push(i);
              }
            }
          }

          // 1.2 var for data ordered (1 obj have 2 orderdetail)
          var orderedData = [];

          for (let i = 0; i < fromNumToNum.length; i++) {
            if (!fromNumToNum[i + 1]) {
              console.log("done");
            } else {
              orderedData.push(
                res.data.slice(fromNumToNum[i], fromNumToNum[i + 1])
              );
            }
          }

          // !!! RENDER FOR ORDER DETAIL + ORDER ITEM
          // for ORDER DETAIL = only the first child is rendered (order item no 1 if there is more than 1 order item)
          // for ORDER ITEM = render ALL but visible only when PARENT COMPONENT IS HOVERED
          var renderOrderedData = orderedData.map((data) => {
            // A. for order item (right)
            var dataMap = data.map((dat) => {
              return (
                <div className="adm-manage-item">
                  <div className="adm-manage-item-picture-container">
                    <img
                      src={dat.product_image_url}
                      className="adm-manage-item-picture"
                    />
                  </div>
                  <div className="adm-manage-item-text-container">
                    <div className="adm-manage-item-name">
                      {dat.product_name}
                    </div>
                    <div className="adm-manage-item-quantity-price">
                      {dat.quantity} x {dat.selling_price}
                    </div>
                    <div className="adm-manage-item-total-current">
                      {dat.current_price}
                    </div>
                  </div>
                </div>
              );
            });

            // B. for order detail (left)

            var orderDetailLeft = (
              <div className="am-orderdetail-left">
                <div className="am-orderdetail-left-image-container">
                  <img
                    src={data[0].product_image_url}
                    className="am-orderdetail-left-image"
                  />
                </div>
                <div className="am-orderdetail-left-text">
                  <div className="am-orderdetail-left-date">
                    {data[0].created_at.substr(8, 2) +
                      " " +
                      monthReference[data[0].created_at.substr(5, 2) - 1] +
                      " " +
                      data[0].created_at.substr(0, 4) +
                      " - " +
                      data[0].created_at.substr(11, 8)}
                  </div>
                  <div className="am-orderdetail-left-total">
                    Rp. {data[0].order_total}
                  </div>
                  <div className="am-orderdetail-left-status">
                    Status :
                    <div
                      className={`am-orderdetail-left-status-${data[0].status}`}
                    >
                      {data[0].status}
                    </div>
                  </div>
                </div>
                <div className="am-orderdetail-left-button">
                  {data[0].status === "pending" ? (
                    <>
                      <button
                        onClick={() => {
                          Axios.patch(
                            `${URL_API}/product/adminorderaccept?order_detail_id=${data[0].order_detail_id}`
                          );
                          getUserOrder();
                          getUserOrder();
                        }}
                        className="am-orderdetail-left-button-accept"
                      >
                        Accept Order
                      </button>
                      <button
                        onClick={() => {
                          Axios.patch(
                            `${URL_API}/product/adminorderreject?order_detail_id=${data[0].order_detail_id}`
                          );
                          getUserOrder();
                          getUserOrder();
                        }}
                        className="am-orderdetail-left-button-reject"
                      >
                        Reject Order
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            );

            return (
              <div className="adm-manage-lil">
                <div className="adm-manage-orderdetail">{orderDetailLeft}</div>
                <div className="adm-manage-item-container">{dataMap}</div>
              </div>
            );
          });

          setRenderData(renderOrderedData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="adm-manage">
      <div className="adm-manage-select-container">
        <select
          onChange={(e) => {
            setSelectedMonth(e.target.value);
            getUserOrder();
            getUserOrder();
          }}
          className="adm-manage-select-1"
        >
          {/* <option>option 1</option> */}
          {generateMonth}
        </select>
        <select
          onChange={(e) => {
            setSelectedYear(e.target.value);
            getUserOrder();
            getUserOrder();
          }}
          className="adm-manage-select-2"
        >
          {generateYear}
        </select>
        <button
          onClick={() => {
            getUserOrder();
          }}
          className="adm-manage-select-btn"
        >
          Generate User Transactions
        </button>
      </div>
      {/* <button
        onClick={() => {
          getUserOrder();
        }}
      >
        get user order
      </button>
      <button
        onClick={() => {
          checkState();
        }}
      >
        checkState
      </button>
      <div>admin</div> */}
      {renderData}
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

export default connect(mapStateToProps)(AdminManageTrans);
