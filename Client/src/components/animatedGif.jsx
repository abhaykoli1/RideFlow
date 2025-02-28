import React from "react";

const AnimatedGif = ({ src, alt, className, title }) => {
  return <img src={src} alt={alt} title={title} className={className} />;
};

export default AnimatedGif;
