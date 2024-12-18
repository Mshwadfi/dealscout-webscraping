"use client"
import Image from "next/image"
import React, { useState } from "react";


interface ImageProps{
    src:string;
    alt:string;
    width:number;
    height:number;
}
const ZoomImage: React.FC<ImageProps> = ({src,alt,width,height}) => {
    const [zoomStyle, setZoomStyle] = useState({});
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>)=>{
        const { left, top, width: imgWidth, height: imgHeight } =
        e.currentTarget.getBoundingClientRect();
      const x = ((e.pageX - left) / imgWidth) * 100;
      const y = ((e.pageY - top) / imgHeight) * 100;

      setZoomStyle({
        transformOrigin: `${x}% ${y}%`,
        transform: 'scale(2)', // Adjust the zoom level
      });
    }

    const handleMouseLeave = () => {
        setZoomStyle({});
      };
  return (
    <div
    className="relative overflow-hidden mx-auto"
    style={{ width, height }}
    onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave}
  >
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{ transition: 'transform 0.3s ease', ...zoomStyle }}
      className="absolute inset-0"
    />
  </div>
  )
}

export default ZoomImage