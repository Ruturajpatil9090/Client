// CommonButtons.js
import React from "react";
import TenderPurchaseHead, { handleKeyDown, isEditMode } from '../../Components/Pages/BusinessRelated/TenderPurchase/TenderPurchaseHead';


export const renderButtons = (
  addOneButtonEnabled,
  saveButtonEnabled,
  editButtonEnabled,
  deleteButtonEnabled,
  cancelButtonEnabled,
  backButtonEnabled,
  handleAddOne,
  handleSaveOrUpdate,
  handleEdit,
  handleDelete,
  handleCancel,
  handleBack
) => {
  return (
    <div>
      <button
        onClick={handleAddOne}
        disabled={!addOneButtonEnabled}
        onKeyDown={(event) => handleKeyDown(event, handleAddOne)}
        tabIndex={0}
        style={{
          backgroundColor: addOneButtonEnabled ? "blue" : "white",
          color: addOneButtonEnabled ? "white" : "black",
          border: "1px solid #ccc",
          cursor: "pointer",
          width: "4%",
          height: "35px",
          fontSize: "12px",
        }}
      >
        Add New
      </button>

      {isEditMode ? (
        <button
          onClick={handleSaveOrUpdate}
          onKeyDown={(event) => handleKeyDown(event, handleSaveOrUpdate)}
          style={{
            backgroundColor: "blue",
            color: "white",
            border: "1px solid #ccc",
            cursor: "pointer",
            width: "4%",
            height: "35px",
            fontSize: "12px",
          }}
        >
          Update
        </button>
      ) : (
        <button
          onClick={handleSaveOrUpdate}
          disabled={!saveButtonEnabled}
          onKeyDown={(event) => handleKeyDown(event, handleSaveOrUpdate)}
          style={{
            backgroundColor: saveButtonEnabled ? "blue" : "white",
            color: saveButtonEnabled ? "white" : "black",
            border: "1px solid #ccc",
            cursor: saveButtonEnabled ? "pointer" : "not-allowed",
            width: "4%",
            height: "35px",
            fontSize: "12px",
          }}
        >
          Save
        </button>
      )}

      <button
        onClick={handleEdit}
        disabled={!editButtonEnabled}
        onKeyDown={(event) => handleKeyDown(event, handleEdit)}
        style={{
          backgroundColor: editButtonEnabled ? "blue" : "white",
          color: editButtonEnabled ? "white" : "black",
          border: "1px solid #ccc",
          cursor: editButtonEnabled ? "pointer" : "not-allowed",
          width: "4%",
          height: "35px",
          fontSize: "12px",
        }}
      >
        Edit
      </button>

      <button
        onClick={handleDelete}
        disabled={!deleteButtonEnabled}
        style={{
          backgroundColor: deleteButtonEnabled ? "blue" : "white",
          color: deleteButtonEnabled ? "white" : "black",
          border: "1px solid #ccc",
          cursor: deleteButtonEnabled ? "pointer" : "not-allowed",
          width: "4%",
          height: "35px",
          fontSize: "12px",
        }}
      >
        Delete
      </button>

      <button
        onClick={handleCancel}
        disabled={!cancelButtonEnabled}
        onKeyDown={(event) => handleKeyDown(event, handleCancel)}
        style={{
          backgroundColor: cancelButtonEnabled ? "blue" : "white",
          color: cancelButtonEnabled ? "white" : "black",
          border: "1px solid #ccc",
          cursor: cancelButtonEnabled ? "pointer" : "not-allowed",
          width: "4%",
          height: "35px",
          fontSize: "12px",
        }}
      >
        Cancel
      </button>

      <button
        onClick={handleBack}
        disabled={!backButtonEnabled}
        onKeyDown={(event) => handleKeyDown(event, handleBack)}
        style={{
          backgroundColor: backButtonEnabled ? "blue" : "white",
          color: backButtonEnabled ? "white" : "black",
          border: "1px solid #ccc",
          cursor: backButtonEnabled ? "pointer" : "not-allowed",
          width: "4%",
          height: "35px",
          fontSize: "12px",
        }}
      >
        Back
      </button>
    </div>
  );
};
