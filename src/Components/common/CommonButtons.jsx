// CommonButtons.js
import React from "react";

const CommonButtons = ({
  handleAddOne,
  handleSaveOrUpdate,
  handleEdit,
  handleDelete,
  handleCancel,
  handleBack,
  addOneButtonEnabled,
  saveButtonEnabled,
  editButtonEnabled,
  deleteButtonEnabled,
  cancelButtonEnabled,
  backButtonEnabled,
  isEditMode,
}) => {
  return (
    <div style={buttonContainerStyle}>
      <button
        onClick={handleAddOne}
        disabled={!addOneButtonEnabled}
        style={buttonStyle}
      >
        Add New
      </button>
      {isEditMode ? (
        <button onClick={handleSaveOrUpdate} style={updateButtonStyle}>
          Update
        </button>
      ) : (
        <button
          onClick={handleSaveOrUpdate}
          disabled={!saveButtonEnabled}
          style={buttonStyle}
        >
          Save
        </button>
      )}
      <button
        onClick={handleEdit}
        disabled={!editButtonEnabled}
        style={buttonStyle}
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        disabled={!deleteButtonEnabled}
        style={buttonStyle}
      >
        Delete
      </button>
      <button
        onClick={handleCancel}
        disabled={!cancelButtonEnabled}
        style={buttonStyle}
      >
        Cancel
      </button>
      <button
        onClick={handleBack}
        disabled={!backButtonEnabled}
        style={buttonStyle}
      >
        Back
      </button>
    </div>
  );
};

const buttonContainerStyle = {
  marginTop: "10px",
  marginBottom: "10px",
  display: "flex",
  gap: "10px",
};

const buttonStyle = {
  backgroundColor: "blue",
  color: "white",
  border: "1px solid #ccc",
  cursor: "pointer",
  width: "50%",
  height: "35px",
  fontSize: "12px",
};

const updateButtonStyle = {
  backgroundColor: "blue",
  color: "white",
  border: "1px solid #ccc",
  cursor: "pointer",
  width: "4%",
  height: "35px",
  fontSize: "12px",
};

export default CommonButtons;
