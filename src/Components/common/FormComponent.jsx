// components/FormComponent.js
import React from "react";

function FormComponent({ selectedId, selectedTitle }) {
  return (
    <div className="form-container">
      <h2>Selected Record:</h2>
      <div>
        <input type="text" value={selectedId} readOnly />
      </div>
      <div>
        <h6>{selectedTitle}</h6>
      </div>
    </div>
  );
}

export default FormComponent;
