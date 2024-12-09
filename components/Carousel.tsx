"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const carouselImages = [
  { src: "/assets/images/hero-1.svg", alt: "carousel image 1" },
  { src: "/assets/images/hero-2.svg", alt: "carousel image 2" },
  { src: "/assets/images/hero-3.svg", alt: "carousel image 3" },
  { src: "/assets/images/hero-4.svg", alt: "carousel image 4" },
  { src: "/assets/images/hero-5.svg", alt: "carousel image 5" },
];

const Carousel = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setActiveImageIndex((prevIndex) =>(prevIndex + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (index:number)=>{
        setActiveImageIndex(index);
  }
  
  if(!isClient) return null;
  return (
    <div className="hero-carousel relative overflow-hidden w-full h-[484px]">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${activeImageIndex * 100}%)`,
          width: `${carouselImages.length * 100}%`,
        }}
      >
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0"
            style={{ flexBasis: "100%" }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={484}
              height={484}
              className="object-contain"
              priority
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={()=>handleDotClick(index)}
            className={`w-3 h-3 rounded-full ${
              activeImageIndex === index ? "bg-blue-500" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
