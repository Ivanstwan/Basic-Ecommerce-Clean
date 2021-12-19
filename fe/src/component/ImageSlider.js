import React, { useState } from "react";
import "./imageSlider.css";

function ImageSlider() {
  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== dataImage.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === dataImage.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(dataImage.length);
    }
  };

  const dataImage = [
    {
      imgSrc:
        "https://images.unsplash.com/photo-1635475129225-4fc53b81b5c6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=875&q=80",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1635449586099-3ecb7ef8374d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1635321510046-b2ef9b0e5eca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  return (
    <div className="image-slider">
      <div className="image-slider-slider">
        {dataImage.map((obj, index) => {
          return (
            <div
              className={
                slideIndex === index + 1
                  ? "image-slider-slide--active"
                  : "image-slider-slide"
              }
            >
              <img src={obj.imgSrc} className="image-slider-content--image" />
            </div>
          );
        })}
      </div>
      <div className="image-slider-slider-button">
        <i
          className="fas fa-arrow-left"
          onClick={() => {
            prevSlide();
          }}
        />
        <i
          className="fas fa-arrow-right"
          onClick={() => {
            nextSlide();
          }}
        />
      </div>
    </div>
  );
}

export default ImageSlider;
