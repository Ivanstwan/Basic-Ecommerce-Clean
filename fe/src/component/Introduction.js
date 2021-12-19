import React from "react";
import "./introduction.css";

function Introduction() {
  return (
    <div className="introduction">
      <div className="introduction-container">
        <div></div>
        <div className="intro-text">
          <div className="intro-text--left">
            Hi. I'm Ivan, nice to meet you.
          </div>
          <div className="intro-text--right">
            {/* I am passionate about building excellent software that improves the
            lives of those around me. I specialize in creating software for
            clients ranging from individuals and small-businesses all the way to
            large enterprise corporations. What would you do if you had a
            software expert available at your fingertips? */}
            I am a Full Stack Web Developer in Bandung. My programming language
            is Javascript. I am proficient in NERD (Node.js, Express, React.js,
            Database (MySQL)). I am a civil major, joining Web Development
            bootcamp, now web developer. I am passionate about buiding website
            for clients from individual to small-business.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
