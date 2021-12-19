import React, { useEffect } from "react";
import "./newDesign.css";
import CityImage from "../assets/images/business-city.png";

function NewDesign() {
  return (
    <div className="newDesign">
      <div className="newDesign-content-container">
        <img src={CityImage} className="newDesign-content-image" />
        <div className="newDesign-content-text-position">
          <p className="newDesign-content-text">DESIGN</p>
        </div>
      </div>
    </div>
  );
}

export default NewDesign;
