"use client"; // 👈 Required because react-slick needs client-side rendering

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";

interface CarouselProps {
  imagesWithText: { image: string }[];
  interval?: number;
  style?: React.CSSProperties;
}

const Carousel: React.FC<CarouselProps> = ({ imagesWithText, interval = 3000 }) => {
  const settings = {
    autoplay: true,
    autoplaySpeed: interval,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    arrows: false,
    dots: false,
    fade: true,
  };

  return (
    <div className="sliderss-container">
      <Slider {...settings}>
        {imagesWithText.map((item, index) => (
          <div key={index} className="images-slide">
            <img
              src={item.image}
              alt={`Slide ${index + 1}`}
              className="slides-image"
            />
            <div className="simages-overlay" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
