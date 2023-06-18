import React, { useEffect, useState } from "react";
import "./slider.scss";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { sliderData } from "./slider-data";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const prevHandler = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };
  const nextHandler = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);
  const auto = () => {
    slideInterval = setInterval(nextHandler, intervalTime);
  };
  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextHandler, intervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval)
  }, [currentSlide, slideInterval, autoScroll]);

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevHandler} />
      <AiOutlineArrowRight className="arrow next" onClick={nextHandler} />

      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <>
                <img src={image} alt="slide" />
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <a href="#" className="--btn --btn-primary">
                    Shop Now
                  </a>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
