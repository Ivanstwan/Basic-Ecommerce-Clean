import React, { useEffect, useRef } from "react";
import "./myWork.css";
import ImageSlider from "./ImageSlider-2";

function MyWork() {
  document.addEventListener("mousemove", (e) => {
    // FOR CURSOR
    const cursors = document.querySelector(".cursor");

    if (cursors === null) {
      return null;
    } else {
      cursors.style.left = e.pageX + "px";
      cursors.style.top = e.clientY + "px";
    }

    // FOR IMAGE MESSAGE
    // const cursorMessage = cursors.querySelector(".cursor span");

    const images = document.querySelectorAll("div[data-hover]");

    // images.forEach((image) => {
    //   image.addEventListener("mouseover", () => {
    //     cursorMessage.innerHTML = image.getAttribute("data-hover");
    //   });
    //   image.addEventListener("mouseout", () => {
    //     cursorMessage.innerHTML = null;
    //   });
    // });

    // FOR IMAGE TEXT (EXPERIMENTAL)
    const cursorText = document.querySelector(".cursor-text");

    // console.log(cursor.style.left);
    cursorText.style.left = e.pageX + "px";
    cursorText.style.top = e.clientY + 30 + "px";

    images.forEach((image) => {
      image.addEventListener("mouseover", () => {
        cursorText.innerHTML = image.getAttribute("data-hover");
      });
      image.addEventListener("mouseout", () => {
        cursorText.innerHTML = null;
      });
    });
  });

  return (
    <div className="work-experience">
      <div className="cursor">{/* <span></span> */}</div>
      <div className="cursor-text"></div>
      <div className="work-container">
        <div className="work-title">Some of My Latest Work</div>
        <div className="work-table">
          <div className="work-graph">
            <div className="work-fe">
              <div className="fe-icon" data-hover="PROJECT NUMERO UNO">
                {/* <i className="fas fa-arrow-down fe-icon-img" /> */}
                <div className="fe-icon-img-container">
                  <img src="https://images.unsplash.com/photo-1635541798333-40ab7ac707ec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80" />
                </div>
                <p>Proj 1</p>
              </div>
              <div className="fe-icon" data-hover="Project 2">
                {/* <i className="fas fa-arrow-down fe-icon-img" /> */}
                <div className="fe-icon-img-container">
                  <img src="https://images.unsplash.com/photo-1635541798333-40ab7ac707ec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80" />
                </div>
                <p>Proj 1</p>
              </div>
              <div className="fe-icon" data-hover="Project 3">
                {/* <i className="fas fa-arrow-down fe-icon-img" /> */}
                <div className="fe-icon-img-container">
                  <img src="https://images.unsplash.com/photo-1635541798333-40ab7ac707ec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80" />
                </div>
                <p>Proj 1</p>
              </div>
            </div>
            <div className="work-be"></div>
            <div className="work-febe"></div>
          </div>
          <div className="work-label">
            <div className="work-label-fe">Front-End</div>
            <div className="work-label-be">Back-End</div>
            <div className="work-label-febe">Full Stack</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyWork;
