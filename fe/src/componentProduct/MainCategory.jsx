import React, { useEffect, useState } from "react";
import "./mainCategory.css";
import Axios from "axios";
import { URL_API } from "../helper";
import { Link } from "react-router-dom";

function MainCategory(props) {
  const [cardProduct, setCardProduct] = useState();

  useEffect(() => {
    getAxiosMainCategory();
  }, []);

  const getAxiosMainCategory = () => {
    Axios.get(
      `${URL_API}/product/getlesserparams?category=${props.match.params.catId}`
    )
      .then((res) => {
        const renderLesserCategory = [];

        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i + 2]) {
            renderLesserCategory.push(
              <div className="mc--lesser-product-card-container">
                <Link
                  className="mc--lesser-product-card"
                  to={`/product/${props.match.params.catId}/${res.data[
                    i
                  ].lesser_name.toLowerCase()}`}
                >
                  <div className="mc--product-card-image-container">
                    <img
                      src={res.data[i].image_url}
                      className="mc--product-card-image"
                    />
                  </div>
                  <div className="mc--product-card-title">
                    {res.data[i].lesser_name}
                  </div>
                  <div className="mc--product-card-desc">
                    {res.data[i].lesser_description}
                  </div>
                </Link>
                <Link
                  className="mc--lesser-product-card"
                  to={`/product/${props.match.params.catId}/${res.data[
                    i + 1
                  ].lesser_name.toLowerCase()}`}
                >
                  <div className="mc--product-card-image-container">
                    <img
                      src={res.data[i + 1].image_url}
                      className="mc--product-card-image"
                    />
                  </div>
                  <div className="mc--product-card-title">
                    {res.data[i + 1].lesser_name}
                  </div>
                  <div className="mc--product-card-desc">
                    {res.data[i + 1].lesser_description}
                  </div>
                </Link>
                <Link
                  className="mc--lesser-product-card"
                  to={`/product/${props.match.params.catId}/${res.data[
                    i + 2
                  ].lesser_name.toLowerCase()}`}
                >
                  <div className="mc--product-card-image-container">
                    <img
                      src={res.data[i + 2].image_url}
                      className="mc--product-card-image"
                    />
                  </div>
                  <div className="mc--product-card-title">
                    {res.data[i + 2].lesser_name}
                  </div>
                  <div className="mc--product-card-desc">
                    {res.data[i + 2].lesser_description}
                  </div>
                </Link>
              </div>
            );

            i += 2;
          } else if (res.data[i + 1]) {
            renderLesserCategory.push(
              <div className="mc--lesser-product-card-container">
                <Link
                  className="mc--lesser-product-card"
                  to={`/product/${props.match.params.catId}/${res.data[
                    i
                  ].lesser_name.toLowerCase()}`}
                >
                  <div className="mc--product-card-image-container">
                    <img
                      src={res.data[i].image_url}
                      className="mc--product-card-image"
                    />
                  </div>
                  <div className="mc--product-card-title">
                    {res.data[i].lesser_name}
                  </div>
                  <div className="mc--product-card-desc">
                    {res.data[i].lesser_description}
                  </div>
                </Link>
                <Link
                  className="mc--lesser-product-card"
                  to={`/product/${props.match.params.catId}/${res.data[
                    i + 1
                  ].lesser_name.toLowerCase()}`}
                >
                  <div className="mc--product-card-image-container">
                    <img
                      src={res.data[i + 1].image_url}
                      className="mc--product-card-image"
                    />
                  </div>
                  <div className="mc--product-card-title">
                    {res.data[i + 1].lesser_name}
                  </div>
                  <div className="mc--product-card-desc">
                    {res.data[i + 1].lesser_description}
                  </div>
                </Link>
              </div>
            );

            i += 1;
          } else {
            renderLesserCategory.push(
              <div className="mc--lesser-product-card-container">
                <Link
                  className="mc--lesser-product-card"
                  to={`/product/${props.match.params.catId}/${res.data[
                    i
                  ].lesser_name.toLowerCase()}`}
                >
                  <div className="mc--product-card-image-container">
                    <img
                      src={res.data[i].image_url}
                      className="mc--product-card-image"
                    />
                  </div>
                  <div className="mc--product-card-title">
                    {res.data[i].lesser_name}
                  </div>
                  <div className="mc--product-card-desc">
                    {res.data[i].lesser_description}
                  </div>
                </Link>
              </div>
            );
          }
        }
        setCardProduct(renderLesserCategory);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="main-category">
      <div className="main-category-container">
        <div className="mc--title">
          <div className="mc--title-main">{props.match.params.catId} List</div>
          {/* <div className="mc--title-desc"></div> */}
          <div></div>
        </div>
        <div className="mc--lesser-product">{cardProduct}</div>
      </div>
    </div>
  );
}

export default MainCategory;
