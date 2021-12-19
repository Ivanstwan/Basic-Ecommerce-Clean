import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { URL_API } from "../helper";
import Axios from "axios";
import "./adminEditProduct.css";

function AdminEditProduct(props) {
  let history = useHistory();

  const [render, setRender] = useState("");

  useEffect(() => {
    if (props.user.role !== 99) {
      history.push("/");
    } else if (props.user.role === 99) {
      getProduct();
    }
  }, []);

  const getProduct = () => {
    Axios.get(`${URL_API}/product/getforrestock`)
      .then((res) => {
        var renderProduct = res.data.map((data) => {
          return (
            <div className="adm-restock-product">
              <div className="adm-restock-image-container">
                <img
                  src={data.product_image_url}
                  className="adm-restock-image"
                />
              </div>
              <div className="adm-restock-text">
                <div className="adm-restock-name">id : {data.id}</div>
                <div className="adm-restock-name">{data.product_name}</div>
                <div className="adm-restock-stock">Stock : {data.stock}</div>
              </div>
              <div className="adm-restock-button">
                <button
                  className="adm-restock-add-50"
                  onClick={() => {
                    Axios.get(
                      `${URL_API}/product/singlegetproduct?product_id=${data.id}`
                    )
                      .then((res) => {
                        Axios.patch(
                          `${URL_API}/product/patchsingleproduct?product_id=${
                            res.data[0].id
                          }&restock=${res.data[0].stock + 50}`
                        ).then((res) => {
                          getProduct();
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  Add 50 stock
                </button>
                <button
                  className="adm-restock-add-100"
                  onClick={() => {
                    Axios.get(
                      `${URL_API}/product/singlegetproduct?product_id=${data.id}`
                    )
                      .then((res) => {
                        Axios.patch(
                          `${URL_API}/product/patchsingleproduct?product_id=${
                            res.data[0].id
                          }&restock=${res.data[0].stock + 100}`
                        ).then((res) => {
                          getProduct();
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  Add 100 stock
                </button>
              </div>
              <div className="adm-restock-button">
                <button
                  className="adm-restock-add-50"
                  onClick={() => {
                    Axios.get(
                      `${URL_API}/product/singlegetproduct?product_id=${data.id}`
                    )
                      .then((res) => {
                        Axios.patch(
                          `${URL_API}/product/patchsingleproduct?product_id=${
                            res.data[0].id
                          }&restock=${res.data[0].stock - 50}`
                        ).then((res) => {
                          getProduct();
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  Remove 50 stock
                </button>
                <button
                  className="adm-restock-add-100"
                  onClick={() => {
                    Axios.get(
                      `${URL_API}/product/singlegetproduct?product_id=${data.id}`
                    )
                      .then((res) => {
                        Axios.patch(
                          `${URL_API}/product/patchsingleproduct?product_id=${
                            res.data[0].id
                          }&restock=${res.data[0].stock - 100}`
                        ).then((res) => {
                          getProduct();
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  Remove 100 stock
                </button>
              </div>
            </div>
          );
        });

        setRender(renderProduct);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="adm-restock">
      <div className="adm-restock-title">Add Product Stock</div>
      <div className="adm-restock-product-container">{render}</div>
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

export default connect(mapStateToProps)(AdminEditProduct);
