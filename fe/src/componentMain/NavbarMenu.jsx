import React, { useEffect, useState } from "react";
import Axios from "axios";
import { URL_API } from "../helper";
import { Link } from "react-router-dom";

function NavbarMenu(props) {
  const [cardCategory, setCardCategory] = useState("");

  useEffect(() => {
    getAxiosLesser();
  }, []);

  const getAxiosLesser = () => {
    Axios.get(`${URL_API}/product/getlessercategory`)
      .then((res) => {
        // 1. sortData to array => [['name product', 'category'], ['name product', 'category']]
        const sortDataCard = [];
        const renderCard = res.data.map((data) => {
          sortDataCard.push([data.lesser_name, data.category_name]);
          // return <div>{data.lesser_name}</div>;
        });

        // 2. data to ul,div
        const renderDivResult = [];
        const renderCategory = [];

        for (let i = 0; i < sortDataCard.length; i++) {
          if (renderDivResult[0] === undefined) {
            renderDivResult.push([<li>{sortDataCard[i][0]}</li>]);
            renderCategory.push(sortDataCard[i][1]);
          } else if (sortDataCard[i - 1][1] === sortDataCard[i][1]) {
            renderDivResult.push([<li>{sortDataCard[i][0]}</li>]);
          } else if (sortDataCard[i - 1][1] !== sortDataCard[i][1]) {
            renderDivResult.push([<li>{sortDataCard[i][0]}</li>]);
            renderCategory.push(sortDataCard[i][1]);
          }
        }

        // 3. combine all div array to div normal
        const renderMenu = renderCategory.map((data) => {
          // render Link
          const renderLi = [];

          for (let i = 0; i < sortDataCard.length; i++) {
            if (sortDataCard[i][1] === data) {
              renderLi.push([
                <Link
                  to={`/product/${data.toLowerCase()}/${sortDataCard[i][0]
                    .replace(/ /g, "")
                    .toLowerCase()}`}
                  className="primary-nav__menu-mini-li"
                >
                  {sortDataCard[i][0]}
                </Link>,
              ]);
            }
          }

          return (
            <li className="primary-nav__menu-item">
              <span className="menu-title">
                {data}
                <i className="fas fa-chevron-down" />
              </span>
              <div className="primary-nav__lil-box"></div>
              <div className="primary-nav__menu-support">
                <ul className="primary-nav__menu-ul">{renderLi}</ul>
              </div>
            </li>
          );
        });

        setCardCategory(renderMenu);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <>{cardCategory}</>;
}

export default NavbarMenu;
