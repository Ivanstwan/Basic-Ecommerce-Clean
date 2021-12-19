import React from "react";
import HomePage from "./HomePage";
import LandingPage from "./LandingPage";

function CombineLandingHome() {
  return (
    <div>
      <LandingPage />
      <HomePage />
    </div>
  );
}

export default CombineLandingHome;
