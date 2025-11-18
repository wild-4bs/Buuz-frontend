// Dot Loader Component - minimal and elegant
import React from "react";

const DotLoader = ({ color = "white" }) => {
  const dotStyle = {
    width: "6px",
    height: "6px",
    backgroundColor: color,
    borderRadius: "50%",
    margin: "0 2px",
    display: "inline-block",
  };

  return (
    <div className="flex items-center justify-center space-x-1">
      <div style={dotStyle} className="animate-pulse" />
      <div
        className="animate-pulse"
        style={{
          ...dotStyle,
          animationDelay: "0.2s",
        }}
      />
      <div
        className="animate-pulse"
        style={{
          ...dotStyle,
          animationDelay: "0.4s",
        }}
      />
    </div>
  );
};

export default DotLoader;
