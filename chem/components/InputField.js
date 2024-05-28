import React from "react";
import "./InputField.css"; // Make sure to import your CSS file

const InputField = ({ placeholder, width, height, ...props }) => {
  return (
    <input
      type="text"
      className="input-field"
      placeholder={placeholder}
      style={{ width, height }} // Set the width and height dynamically using inline style
      {...props} // Spread all other props
    />
  );
};

export default InputField;
