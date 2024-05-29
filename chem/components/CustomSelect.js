import React from "react";
import "./CustomSelect.css";

function CustomSelect({ id, value, required, onChange, children }) {
  return (
    <div className="custom-select-wrapper">
      <select
        id={id}
        className="custom-select"
        value={value}
        required={required}
        onChange={onChange}
      >
        {children}
      </select>
      <div className="custom-select-arrow">&#9660;</div>
    </div>
  );
}

export default CustomSelect;
