import React from "react";
import "./Rbutton.css"; // Make sure to import your CSS file

const Rbutton = ({ children, width, height, ...props }) => {
  const buttonStyle = {
    width: width,
    height: height,
  };

  return (
    <button className="button-delete" style={buttonStyle} {...props}>
      {children}
    </button>
  );
};

export default Rbutton;
