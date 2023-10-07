import React,{useRef} from "react";

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
  highlightedButton,
  handleButtonClick,
}) => {
  const addNewButtonRef = useRef(null);

  return (
    <>
      <div
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          onClick={handleAddOne}
          ref={addNewButtonRef}
          disabled={!addOneButtonEnabled}
          style={{
            backgroundColor: addOneButtonEnabled ? "blue" : "white",
            color: addOneButtonEnabled ? "white" : "black",
            border: "1px solid #ccc",
            cursor: addOneButtonEnabled ? "pointer" : "not-allowed",
            width: "4%",
            height: "35px",
            fontSize: "12px",
          }}
        >
          Add New
        </button>

        {editButtonEnabled && (
          <button
            onClick={handleEdit}
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
            Edit
          </button>
        )}

        <button
          onClick={handleSaveOrUpdate}
          disabled={!saveButtonEnabled}
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
          {editButtonEnabled ? "Update" : "Save"}
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

        <h5 style={{ marginLeft: "300px" }}>Tender Purchase Head</h5>
      </div>

      <div style={{ float: "right", marginTop: "-40px" }}>
        <button
          style={{
            border: "1px solid #ccc",
            backgroundColor: highlightedButton === "first" ? "black" : "blue",
            color: "white",
            width: "100px",
            height: "35px",
          }}
          onClick={() => handleButtonClick("first")}
        >
          &lt;&lt;
        </button>
        <button
          style={{
            border: "1px solid #ccc",
            backgroundColor: highlightedButton === "previous" ? "black" : "blue",
            color: "white",
            width: "100px",
            height: "35px",
          }}
          onClick={() => handleButtonClick("previous")}
        >
          &lt;
        </button>
        <button
          style={{
            border: "1px solid #ccc",
            backgroundColor: highlightedButton === "next" ? "black" : "blue",
            color: "white",
            width: "100px",
            height: "35px",
          }}
          onClick={() => handleButtonClick("next")}
        >
          &gt;
        </button>
        <button
          style={{
            border: "1px solid #ccc",
            backgroundColor: highlightedButton === "last" ? "black" : "blue",
            color: "white",
            width: "100px",
            height: "35px",
          }}
          onClick={() => handleButtonClick("last")}
        >
          &gt;&gt;
        </button>
      </div>
    </>
  );
};

export default CommonButtons;
