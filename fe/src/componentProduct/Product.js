import React, { useEffect, useState } from "react";
import "./product.css";
import Axios from "axios";
import { connect } from "react-redux";
import { URL_API } from "../helper";
import { useHistory } from "react-router";

function Product(props) {
  // UI displayed image (current)
  const [displayImage, setDisplayImage] = useState("image-1");
  const [displayImageURL, setDisplayImageURL] = useState("");

  // UI image slide render
  const [renderImageSlide, setRenderImageSlide] = useState();

  // render UI
  const [title, setTitle] = useState("");
  const [descOne, setDescOne] = useState("");
  const [descTwo, setDescTwo] = useState("");
  const [price, setPrice] = useState(0);
  const [maxStock, setMaxStock] = useState(1);

  const [qty, setQty] = useState(1);
  const [productID, setProductID] = useState("");

  // additional error message
  const [errMessage, setErrMessage] = useState("");
  const [buttonClick, setButtonClick] = useState(false);
  const [buttonLoading, setButtonLoading] = useState("Add to Cart");

  let history = useHistory();

  useEffect(() => {
    getProduct();
  }, [props.location]);

  const getProduct = () => {
    Axios.get(
      `${URL_API}/product/getlesserproduct?product_name=${props.match.params.prodId
        .split("+")
        .join(" ")}`
    )
      .then((res) => {
        const {
          id,
          product_image_url,
          product_name,
          product_description_2,
          product_description_3,
          selling_price,
          stock,
        } = res.data[0];

        setDisplayImageURL(product_image_url);
        setTitle(product_name);
        setDescOne(product_description_2);
        setDescTwo(product_description_3);
        setPrice(selling_price);
        setMaxStock(stock);
        setProductID(id);

        setRenderImageSlide(
          <img
            src={product_image_url}
            className={
              displayImage === "image-1"
                ? "product-image-slide-item-active"
                : "product-image-slide-item"
            }
            onClick={(e) => {
              setDisplayImageURL(e.target.currentSrc);
              setDisplayImage("image-1");
            }}
          />
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkState = () => {
    console.log(title);
    console.log(descOne);
    console.log(descTwo);
    console.log(price);
    console.log(maxStock);
  };

  const addToCart = () => {
    if (qty > maxStock) {
      setErrMessage(`Stock available : ${maxStock}`);
    } else if (qty < 1) {
      setErrMessage(`Please input quantity at least 1`);
    } else if (qty >= 1 && qty <= maxStock) {
      const userEmail = props.user.email;
      setButtonClick(!buttonClick);
      setButtonLoading("Loading...");
      Axios.get(
        `${URL_API}/product/getitemcart?item=${productID}&user_email=${userEmail}`
      )
        .then((res) => {
          if (res.data[0]) {
            Axios.patch(`${URL_API}/product/patchitemcart`, {
              user_id: props.user.id,
              add_qty: qty + res.data[0].quantity,
              total: (qty + res.data[0].quantity) * price,
              product_id: productID,
            });
            setErrMessage("Added to cart");
            setButtonClick(!buttonLoading);
            setButtonLoading("Add to Cart");
          } else if (!res.data[0]) {
            Axios.post(`${URL_API}/product/additemtocart`, {
              user_id: props.user.id,
              qty: qty,
              total: qty * price,
              product_id: productID,
            })
              .then((res) => {
                setButtonClick(!buttonLoading);
                setErrMessage("Added to cart");
                setButtonLoading("Add to Cart");
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="product">
      <div className="product-container">
        <div className="product-image-container">
          {/* <button
            onClick={() => {
              checkState();
            }}
          >
            Check state
          </button> */}
          <div className="product-image-left">{renderImageSlide}</div>
          <div className="product-image-right">
            <img
              src={displayImageURL}
              className="product-image-right-selected"
            />
          </div>
        </div>
        <div className="product-text-container">
          <div className="product-text-title">{title}</div>
          <div className="product-text-desc-1">{descOne}</div>
          <div className="product-text-desc-2">{descTwo}</div>
          <div className="product-text-price">Price - Rp. {price}</div>
          <div className="product-qty-input-container">
            <div className="product-qty-text">Qty</div>
            <input
              className="product-qty-input"
              type="number"
              value={qty}
              min={1}
              max={maxStock}
              onChange={(e) => {
                setQty(e.target.value);
                setErrMessage("");
              }}
            ></input>
          </div>
          <button
            onClick={() => {
              if (props.user.email) {
                addToCart();
              } else {
                history.push("/login");
              }
            }}
            className="product-button-submit"
            disabled={buttonClick}
          >
            {buttonLoading}
          </button>
          <div className="product-err-message">{errMessage}</div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

export default connect(mapStateToProps)(Product);
