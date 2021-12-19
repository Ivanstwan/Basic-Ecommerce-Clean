import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";
import cardPict from "../assets/images/plant.png";
import cardPictIndo from "../assets/images/indonesia.png";
import cardPictFarmer from "../assets/images/farmer.png";
import cardPictTruck from "../assets/images/truck.png";
import HomePage from "./HomePage";

function LandingPage() {
  // data product category
  const prodCategory = ["1 cat", "2 dog", "3 something"];

  const generateRouteProduct = () => {
    const test = prodCategory.map((e) => {
      return (
        <div>
          <Link to="/">a</Link>
          <Link to="/">b</Link>
          <Link to="/">c</Link>
          <Link to="/">d</Link>
        </div>
      );
    });
    return test;
  };

  return (
    <div className="landingPage">
      <div className="landing-container">
        <div className="landing-section--1">
          <div className="landing-section--1-title">
            Plant Gonna Make You Happy... Maybe..
          </div>
          <div className="landing-section--1-title">Plant Lives Matter.</div>
          <div className="landing-section--1-desc">
            Transform and give life into your indoor or outdoor home.
          </div>
        </div>
        <div className="landing-section--button-container">
          <a className="landing-section--button" href="#home-page">
            SHOP NOW
          </a>
        </div>
        <div className="landing-section--card">
          <div className="landing-section--card-container">
            <div className="landing--card">
              <img src={cardPict} className="landing--card-pict" />
              <div className="landing--card-text-container">
                <div className="landing--card-text-bold">TOP QUALITY</div>
                <div className="landing--card-text">
                  We provide more than 100 different variaties.
                </div>
              </div>
            </div>
            <div className="landing--card">
              <img src={cardPictIndo} className="landing--card-pict" />
              <div className="landing--card-text-container">
                <div className="landing--card-text-bold">INDONESIA</div>
                <div className="landing--card-text">
                  We supply gardener and individual in any region within
                  Indonesia.
                </div>
              </div>
            </div>
            <div className="landing--card">
              <img src={cardPictFarmer} className="landing--card-pict" />
              <div className="landing--card-text-container">
                <div className="landing--card-text-bold">LOCAL FARMER</div>
                <div className="landing--card-text">
                  Every transaction will help strong and sustainable local
                  economy.
                </div>
              </div>
            </div>
            <div className="landing--card">
              <img src={cardPictTruck} className="landing--card-pict" />
              <div className="landing--card-text-container">
                <div className="landing--card-text-bold">FREE SHIPPING</div>
                <div className="landing--card-text">
                  Free shipping on order above $50!
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Link to="/login">to login</Link>
        <Link to="/register">to register</Link> */}
        <div className="bg-white" id="home-page">
          <HomePage />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
