// components/Button.js
import React from "react";

function Button({ onClick }) {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      Data
    </button>
  );
}

export default Button;