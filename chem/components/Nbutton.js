import React from "react";
import "./Nbutton.css";

const Nbutton = ({ children, width, height, ...props }) => {
  const buttonStyle = {
    width: width,
    height: height,
  };

  return (
    <button className="button-neutral" style={buttonStyle} {...props}>
      {children}
    </button>
  );
};

export default Nbutton;
