import React, { useEffect, useState } from "react";
import { URL_API } from "../helper";
import "./categoryProduct.css";
import Axios from "axios";

function CategoryProduct(props, { match }) {
  const [cardCategory, setCardCategory] = useState("");
  // DYNAMIC ROUTE - PRODUCT
  // 1.1 data category
  const category = [
    { category: "plant", sub: "ts" },
    { category: "fruit", sub: "tsasas" },
  ];

  // 1.2 Render function
  const Category = () => {
    const categories = category.find((cat) => {
      return props.match.params.catId === cat.category;
    });
  };

  const getAxiosLesser = () => {
    Axios.get(`${URL_API}/product/getlessercategory`)
      .then((res) => {
        const renderCard = res.data.map((data) => {
          return <div>{data.lesser_name}</div>;
        });
        setCardCategory(renderCard);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    Category();
  }, []);

  return (
    <>
      <div className="lesser-cat">
        <button
          onClick={() => {
            getAxiosLesser();
          }}
        >
          Click lesser cat
        </button>
        <div>{cardCategory}</div>
      </div>
      <div>Category Product</div>;
    </>
  );
}

export default CategoryProduct;
