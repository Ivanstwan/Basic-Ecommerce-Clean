import React, { useEffect, useState } from "react";
import "./lesserCategory.css";
import Axios from "axios";
import { URL_API } from "../helper";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

function LesserCategory(props) {
  const [cardProduct, setCardProduct] = useState();

  // single lesser
  const [singleLesser, setSingleLesser] = useState("");
  // card render
  const [cardRender, setCardRender] = useState("");

  const history = useHistory();

  useEffect(() => {
    getSingleLesser();
    getLesserProduct();
  }, [props.location]);

  // 1. for title 'Apple' (lesser category, not the product)
  const getSingleLesser = () => {
    Axios.get(
      `${URL_API}/product/getsinglelesser?lesser=${props.match.params.productId}`
    ).then((res) => {
      setSingleLesser(res.data[0]);
    });
  };

  // 2. for lesser product
  const getLesserProduct = () => {
    Axios.get(
      `${URL_API}/product/getmanylesser?category=${props.match.params.productId}`
    )
      .then((res) => {
        const renderLesserCategory = res.data.map((data) => {
          return (
            <Link
              className="lesser-product-card"
              to={`/product/${props.match.params.catId}/${
                props.match.params.productId
              }/${data.product_name.split(" ").join("+").toLowerCase()}`}
            >
              <div className="lesser-product-image-container">
                <img
                  className="lesser-product-image"
                  src={data.product_image_url}
                />
              </div>
              <div className="lesser-product-name">{data.product_name}</div>
              <div className="lesser-product-desc">
                {data.product_description_1}
              </div>
            </Link>
          );
        });

        setCardRender(renderLesserCategory);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkState = () => {
    console.log(singleLesser);
    console.log(cardRender);
  };

  return (
    <div className="main-category">
      <div className="lesser-product">
        <div className="lesser-product-container">
          <div className="lesser-product-title-container">
            <div className="lesser-product-title-image-container">
              <img
                src={singleLesser.image_url}
                className="lesser-product-title-image"
              />
            </div>
            <div className="lesser-product-title">
              {/* <button
                onClick={() => {
                  checkState();
                }}
              >
                checks tate
              </button> */}
              <div className="lesser-product-title-text">
                {singleLesser.lesser_name}
              </div>
              <div className="lesser-product-title-desc">
                {singleLesser.lesser_description}
              </div>
            </div>
          </div>
        </div>
        <div className="lesser-product-card-container">{cardRender}</div>
      </div>
    </div>
  );
}

export default LesserCategory;
