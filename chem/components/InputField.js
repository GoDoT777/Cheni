import React from "react";
import "./InputField.css";

const InputField = ({ placeholder, width, height, ...props }) => {
  return (
    <input
      type="text"
      className="input-field"
      placeholder={placeholder}
      style={{ width, height }}
      {...props}
    />
  );
};

export default InputField;
