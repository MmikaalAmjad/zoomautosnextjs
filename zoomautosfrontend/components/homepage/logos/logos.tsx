"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider, { Settings } from "react-slick";

interface LogoData {
  Image: string[];
}

interface ImageSize {
  width: number;
  height: number;
}

const LogoSlideshow: React.FC = () => {
  const [logos, setLogos] = useState<LogoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [smallestSize, setSmallestSize] = useState<ImageSize>({ width: 100, height: 100 });

  useEffect(() => {
    const fetchLogos = async () => {
      try {
const res = await fetch("/api/logos?_t=" + new Date().getTime());

if (!res.ok) {
  const errorText = await res.text(); // read body only on error
  throw new Error(errorText || "Failed to fetch logos");
}

const data: LogoData[] = await res.json(); // safe to parse JSON now
setLogos(data);

        // Calculate smallest image dimensions
        const sizePromises = data.flatMap((logo) =>
          logo.Image.map(
            (img) =>
              new Promise<ImageSize>((resolve) => {
                const image = new Image();
                image.src = img;
                image.onload = () => resolve({ width: image.width, height: image.height });
                image.onerror = () => resolve({ width: 100, height: 100 });
              })
          )
        );

        const sizes = await Promise.all(sizePromises);
        const minWidth = Math.min(...sizes.map((s) => s.width));
        const minHeight = Math.min(...sizes.map((s) => s.height));
        setSmallestSize({ width: minWidth, height: minHeight });
      } catch (err) {
        console.error("Error fetching logos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, []);


  // ✅ Typed Slider settings
  const sliderSettings: Settings = {
    dots: false,
    infinite: true,
    speed: 6000,
    slidesToShow: Math.min(logos.length, 10),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: Math.min(logos.length, 6),
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: Math.min(logos.length, 4),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(logos.length, 2),
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  if (loading) {
    return <h2 style={{ marginBottom: "10px" }} className="about-us-title">
        Our Clients
      </h2>;
  }

  return (
    <div style={{ width: "80%", margin: "0 auto", textAlign: "center" }}>
      <h2 style={{ marginBottom: "10px" }} className="about-us-title">
        Our Clients
      </h2>
      <Slider {...sliderSettings}>
        {logos.map((logo, index) => (
          <div key={index} className="slide">
            {logo.Image.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Client logo ${index + 1}`}
                
                width={smallestSize.width}
                height={smallestSize.height}
                style={{ width: "100%", height: "300px", objectFit: "contain" }}
              />
            ))}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LogoSlideshow;
