import React from "react";
import "./Gbutton.css"; // Make sure to import your CSS file

const Gbutton = ({ children, width, height, ...props }) => {
  const buttonStyle = {
    width: width,
    height: height,
  };

  return (
    <button className="button1" style={buttonStyle} {...props}>
      {children}
    </button>
  );
};

export default Gbutton;
