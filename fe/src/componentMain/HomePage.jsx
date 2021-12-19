import React from "react";
import { Link } from "react-router-dom";
import "./homePage.css";

function HomePage() {
  return (
    <div className="home">
      <div className="home-container">
        <div className="home--title">
          <div className="home--title-main">What Plant You Want To Pick?</div>
          <div className="home--title-desc">
            Each plant has its own uniqeness.
          </div>
        </div>
        <div className="home--main-tile">
          <Link className="home--main-tile-1" to="/product/flower">
            <img
              src="https://res.cloudinary.com/basicecommerce/image/upload/v1636919385/flower1_okovmf.jpg"
              className="home--main-tile-image"
            />
          </Link>
          <Link className="home--main-tile-2" to="/product/fruit">
            <img
              src="https://res.cloudinary.com/basicecommerce/image/upload/v1636919824/fruit1_lq1rnx.jpg"
              className="home--main-tile-image"
            />
          </Link>
          <Link className="home--main-tile-3" to="/product/plant">
            <img
              src="https://res.cloudinary.com/basicecommerce/image/upload/v1636920452/photo-1597305877032-0668b3c6413a_hsi9hz.jpg"
              className="home--main-tile-image"
            />
          </Link>
        </div>
        <div className="home--main-tile-text">
          <Link className="home--main-tile-text-container" to="/product/flower">
            <div className="home--main-tile-text">Flower</div>
          </Link>
          <Link className="home--main-tile-text-container" to="/product/fruit">
            <div className="home--main-tile-text">Fruit</div>
          </Link>
          <Link className="home--main-tile-text-container" to="/product/plant">
            <div className="home--main-tile-text">Plant</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
